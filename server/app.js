import mongoose from "mongoose";
// 'Import' the Express module instead of http
import express from "express";
import mailjet from "node-mailjet";
import dotenv from "dotenv";
//load enviroment variables from .env file
import appointments from "./routers/appointments.js"
dotenv.config();

//get the PORT from the environment variable OR use 8080 as default
const PORT = process.env.PORT || 8080;
//Initialize the Express application
const app = express();

mongoose.connect(process.env.MONGODB,{
    //Configuration options to remove depreciation warnings, just include them to remove clutter
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

//ask about this code
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
    "open",
    console.log.bind(console, "Successfully opened connection to Mongo!")
);
//init keys for mailjet
const client = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);


//this too
// Logging Middleware
const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};
//CORS Middleware
const cors = (request, response, next) => {
    response.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, Accept,Authorization, Origin"
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    response.setHeader("Access-Control-Allow-Credentials", true);
    next();
};
app.use(cors);
app.use(express.json());
app.use(logging);
app.get("/status", (request, response) => {
    //Create the headers for response by default 200
    //create the response body
    //End and return the response
    response.send(JSON.stringify({ massage: "Service healthy"}));
});


//send mail with mailjet
app.get("/mail", (request, response) => {
  client
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "quintontaylor29@gmail.com",
            Name: "Mailjet Pilot"
          },
          To: [
            {
              Email: "quintontaylor959@gmail.com",
              Name: "passenger 1"
            }
          ],
          Subject: "Your email flight plan!",
          TextPart:
            "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!'
        }
      ]
    })
    .then((result) => {
      console.log(result.body);
      response.json(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
      response.sendStatus(err.statusCode);
    });
});






    
      
app.use("/appointments", appointments);

//Tell the Express app to start listening and log it

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
