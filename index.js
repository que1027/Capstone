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
    //render data on the specefied view
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

//toggle hamburger menu

const menuButton = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".hidden--mobile");
menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
});


    //listen for the contact me page to open then listen for a email to be sent
    if (currentState.view === "contactMe") {
        document.getElementById("eForm").addEventListener("submit", event => {
            event.preventDefault();
            const subject = document.getElementById("eSubject").value;
            const body = document.getElementById("eBody").value;
            //object holds data to be sent
            const requestBody = {
                subject: subject,
                body: body
            }
            //axios call to get mailjet server
            axios
                .get(
                    `${process.env.MAIL_API_URL}/mail`
                )
                .then(response => {
                    //console.log("mail data: ", response.data);

                }).catch(err => {
                    //console.log("it puked", err);
                })




        });
        //move nav to fit this page
        let nav = document.getElementById("hidden--mobile");
        nav.style = "top:10vw;";
        //listen for the meetMe page to open
    } else if (currentState.view === "meetMe") {
        //create a calendar
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
        //render calendar
        calendar.render();
        let event;
        //axios call to get all appointments
        axios
            .get(`${process.env.APPOINTMENT_API_URL}/appointments`)
            .then(response => {
                const responseData = response.data;
                for (let i = 0; i < responseData.length; i++) {
                    //console.log(responseData[i].appName);

                    //   console.log(responseData[i])
                    event = {
                        title: responseData[i].appName,
                        start: responseData[i].appDate,
                        description: responseData[i].appLength
                    };
                    //render the events on the calendar
                    calendar.render();
                    calendar.addEvent(event);

                }


            })
             //move nav to fit this page
        let nav = document.getElementById("hidden--mobile");
        nav.style = "top:1vw;";
            //listen for if the add event button is clicked
        document.getElementById("addEvent").addEventListener("click", event => {
            document.getElementById("hidden--mobile").style = "position:relative; top:-49vw;"
            document.getElementById("flow").style = "display:block;"

        });
        //listen for an event to be added
        document.getElementById("schedForm").addEventListener("submit", event => {
            event.preventDefault();

            //Get the form element
            const inputs = event.target.elements;

            //create a request body
            const requestData = {
                appName: inputs.appName.value,
                appDate: inputs.appDate.value,
                appTime: inputs.appTime.value,
                appLength: inputs.appLength.value,
                //accepted: false
            };

            //axios call to add an appointment
            axios
                .post(`${process.env.APPOINTMENT_API_URL}/appointments`, requestData)
                .then(response => {
                    store.meetMe.appointments.push(response.data);
                    calendar.addEvent(response.data);
                })
                //log errors
                .catch(error => {
                });
                //reload the page
            router.navigate("/meetMe");
        });
        //listen for the home page to open
    } else if (currentState.view == "home") {
        //start the encrypted name effect
        //run the change function every 20ms
        let myInterval = setInterval(change, 20)
        //split the name
        let fName = document.getElementById("name");
        let lName = document.getElementById("lname");
        const fNameSplit = fName.innerHTML.split("");
        const lNameSplit = lName.innerHTML.split("");

        const slide = document.getElementById("slide");
        const buttons = document.getElementById("buttons");
        //loop through the name and change the letters
        let letters = 0;
        function change() {
            const fNameRand = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            const name2 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];

            //go to the letter of name that is at the random placement of fNameRand and change it to a random letter that is in name2
            fNameSplit[fNameRand[Math.floor(Math.random() * 7)]] = name2[Math.floor(Math.random() * 15)];
            lNameSplit[fNameRand[Math.floor(Math.random() * 6)]] = name2[Math.floor(Math.random() * 15)];
            fName.innerHTML = fNameSplit;
            lName.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + lNameSplit;
            letters++;
            //after going through all 30 letters in my full name set fName and lName back to Quinton and Taylor
            if (letters == 30) {
                clearInterval(myInterval);
                fName.innerHTML = "Quinton";
                lName.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Taylor";
            }
        }


    }else if(currentState.view == "myAwards"){
         //move nav to fit this page
         let nav = document.getElementById("hidden--mobile");
         nav.style = "top:5vw;";


    }else if(currentState.view == "signIn"){
        //move nav to fit this page
        let nav = document.getElementById("hidden--mobile");
        nav.style = "top:10vw;";
   }else if(currentState.view == "weather"){
    //move nav to fit this page
    let nav = document.getElementById("hidden--mobile");
    nav.style = "top:10vw;";
}
}
//set code to run at a time that is in relation to the rout change of the page
router.hooks({
    //run before the view is changed
    before: (done, params) => {
        // We need to know what view we are on to know what data to fetch
        const view =
        //l
            params && params.data && params.data.view
                ? camelCase(params.data.view)
                : "home";
        // Add a switch case statement to handle multiple routes
        switch (view) {
            // Add a case for each view that needs data from an API
            // New Case for the home View
            case "weather":
                axios
                    //Get request to retieve the current weather using the open weather map API
                    .get(
                        `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial&q=st%20louis`
                    )
                    .then(response => {
                        //console.log("Weather Data:", response.data)
                        //create an object to be stored in the Home state from response
                        store.weather.weather = {
                            city: response.data.name,
                            temp: response.data.main.temp
                        };
                        done();
                    })
                    .catch(error => {
                        //console.log("It puked", error);
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
                        for (i = 0; i < responseData.length; i++) {
                            //console.log(responseData[i].appName);

                            //   console.log(responseData[i])
                            event = {
                                title: responseData[i].appName,
                                start: responseData[i].appDate,
                                description: responseData[i].appLength
                            };

                            //console.log(event)
                            // calendar.render();
                            //   calendar.addEvent(event);

                        }
                        done();

                    }).catch(error => {
                        //console.log("It puked", error);
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
        //change the :view data element to camel case and remove any dashes(support for multi-word views)
        const view = data?.view ? camelCase(data.view) : "home";
        if (view in store) {
            //console.log(view);
            render(store[view]);
        } else {
            render(store.viewNotFound);
            //console.log(`View ${view} not defined`);
        }
    }

})
    .resolve();

