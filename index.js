import Navigo from "navigo";
import { camelCase } from "lodash";


import { header, main, footer, nav } from "./components";
import * as store from "./store/index.js";
import axios from "axios";

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { preventDefault } from "@fullcalendar/core/internal";


const router = new Navigo("/");


//render header main nav and footer of default view(home)
function render(currentState = store.home) {
    document.querySelector("#root").innerHTML = `
    ${header(currentState)}
    ${main(currentState)}
    ${nav(store.nav)}
    ${footer()}
    `;
    router.updatePageLinks();
    afterRender(currentState);
}

//do things after the home page is rendered
function afterRender(currentState) {
    // add menu toggle to bars icon in nav bar
    //does nothing and can be removed at any time
    document.querySelector(".nav-bars").addEventListener("click", () => {

        document.querySelector("nav > ul").classList.toggle("hidden--mobile");


    });

    //hb Menu open
    document.getElementById("hbMenu").addEventListener("click", event => {

        if (document.getElementById("slide").style.display !== "block") {
            document.getElementById("slide").style = "display: block"
            document.getElementById("hidden--mobile").style = "display: flex;"

        } else {
            document.getElementById("slide").style = "display: none"
            document.getElementById("hidden--mobile").style = "display: none;"
        }
    });

    //listen for the contact me page to open then listen for a email to be sent
    if (currentState.view === "contactMe") {
      console.log("I work")
        document.getElementById("eForm").addEventListener("submit", event => {
            event.preventDefault();
            const subject = document.getElementById("eSubject").value;
            const body = document.getElementById("eBody").value;
            const requestBody = {
                subject: subject,
                body: body
            }
            console.log("requestBody:", requestBody);

            axios
            .get(
                `${process.env.MAIL_API_URL}/mail`
            )
            .then( response =>{
                console.log("mail data: ", response.data);

            }).catch(err=> {
                console.log("it puked", err);
            })



        });
    } else if (currentState.view === "meetMe") {
      console.log("I work")
        let calendarEl = document.getElementById('calendar');
        let calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
            }
      });
      calendar.render();
        let event;
        axios
                //Make a POST request to the API to pull all appointment
                .get(`${process.env.APPOINTMENT_API_URL}/appointments`)
                .then(response => {
                    const responseData = response.data;
                    for(let i=0;i<responseData.length;i++){
                      console.log(responseData[i].appName);

                    //   console.log(responseData[i])
                      event = {
                        title: responseData[i].appName,
                        start: responseData[i].appDate,
                        description: responseData[i].appLength
                    };
                    console.log(event)
                    calendar.render();
                      calendar.addEvent(event);

                    }


    })
        document.getElementById("addEvent").addEventListener("click", event => {
            document.getElementById("hidden--mobile").style = "position:relative; top:-49vw;"
            document.getElementById("flow").style = "display:block;"

        });
        document.getElementById("schedForm").addEventListener("submit", event => {
            event.preventDefault();

            //Get the form element
            const inputs = event.target.elements;
            console.log("Inputs: ", inputs);

            //create a request body
            const requestData = {
                appName: inputs.appName.value,
                appDate: inputs.appDate.value,
                appTime: inputs.appTime.value,
                appLength: inputs.appLength.value,
                //accepted: false
            };

            //log the request
            console.log("Request Body:", requestData);

            axios
                //Make a POST request to the API to schedule an appointment
                .post(`${process.env.APPOINTMENT_API_URL}/appointments`, requestData)
                .then(response => {
                    //alert(response);
                    store.meetMe.appointments.push(response.data);
                    calendar.addEvent(response.data);
                })
                //log errors
                .catch(error => {
                    console.log("you've met with a terrible fate haven't you?", error);
                });
                // router.navigate("/contactMe");
                router.navigate("/meetMe");
        });
    } else if (currentState.view == "home") {
        let myInterval = setInterval(change, 20)
        let fName = document.getElementById("name");
        let lName = document.getElementById("lname");
        const fNameSplit = fName.innerHTML.split("");
        const lNameSplit = lName.innerHTML.split("");
        const hbMenu = document.getElementById("hbMenu");
        const slide = document.getElementById("slide");
        const buttons = document.getElementById("buttons");

        let letters = 0;
        function change() {
            const fNameRand = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            const name2 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];

            fNameSplit[fNameRand[Math.floor(Math.random() * 7)]] = name2[Math.floor(Math.random() * 15)];
            lNameSplit[fNameRand[Math.floor(Math.random() * 6)]] = name2[Math.floor(Math.random() * 15)];
            fName.innerHTML = fNameSplit;
            lName.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + lNameSplit;
            letters++;
            if (letters == 30) {
                clearInterval(myInterval);
                fName.innerHTML = "Quinton";
                lName.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Taylor";
            }
        }


    }
}
router.hooks({
    before: (done, params) => {
        // We need to know what view we are on to know what data to fetch
        const view =
          params && params.data && params.data.view
            ? camelCase(params.data.view)
            : "home";
        // Add a switch case statement to handle multiple routes
        switch (view) {
          // Add a case for each view that needs data from an API
          // New Case for the home View
          case "about":
            axios
            //Get request to retieve the current weather using the open weather map API
            .get(
                `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial&q=st%20louis`
            )
            .then(response =>{
                console.log("Weather Data:", response.data)
                //create an object to be stored in the Home state from response
                store.about.weather = {
                    city: response.data.name,
                    temp: response.data.main.temp
                };
                done();
            })
            .catch(error =>{
                console.log("It puked", error);
                done();
            });
            break;
            case "meetMe":
              let event;
              axios
                      //Make a POST request to the API to pull all appointment
                      .get(`${process.env.APPOINTMENT_API_URL}/appointments`)
                      .then(response => {
                          const responseData = response.data;
                          for(i=0;i<responseData.length;i++){
                            console.log(responseData[i].appName);

                          //   console.log(responseData[i])
                            event = {
                              title: responseData[i].appName,
                              start: responseData[i].appDate,
                              description: responseData[i].appLength
                          };

                          console.log(event)
                          // calendar.render();
                          //   calendar.addEvent(event);

                          }
                          done();

          })  .catch(error =>{
            console.log("It puked", error);
            done();
        });
            break;
            default:
              done();
          }
        },
        already: params => {
          const view =
            params && params.data && params.data.view
              ? camelCase(params.data.view)
              : "home";

          render(store[view]);
        }
      });
//render home as default and listen for view changes and move accordingly
router.on({
    "/": () => render(store.home),
    ":view": ({ data, params }) => {
        //change the :view data element to camel case and remove any dashes(support for multi-woord views)
        const view = data?.view ? camelCase(data.view) : "home"; //help me better understand this line
        if (view in store) {
          console.log(view);
            render(store[view]);
        } else {
            render(store.viewNotFound);
            console.log(`View ${view} not defined`);
        }
    }

})
    .resolve();

