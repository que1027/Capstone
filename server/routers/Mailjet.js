import { Router } from "express";

const router = Router();

import * as mailjet from "node-mailjet";

// all routes go here 
//create mailjet route
router.post("/", async (request, response) => {
  try {
    // const newEmail = request.body;
    // mailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
    // const mailRequest = mailjet
    //   .post("send", { 'version': 'v3.1' })
    //   .request({
    //     "SandboxMode": "true",
    //     "Messages": [
    //       {
    //         "From": [
    //           {
    //             "Email": "quintontaylor29@gmail.com",
    //             "Name": "Your Mailjet Pilot"
    //           }
    //         ],
    //         "HTMLPart": "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
    //         "Subject": "Your email flight plan!",
    //         "TextPart": "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
    //         "To": [
    //           {
    //             "Email": "quintontaylor29@gmail.com",
    //             "Name": "Passenger 1"
    //           }
    //         ]
    //       }
    //     ]
    //   })
    // mailRequest
    //   .then((result) => {
    //     console.log(result.body)
    //     //sending back to router route
    //     response.send(result.body);
    //   })
    //   .catch((err) => {
    //     console.log(err.statusCode);
    //     response.sendStatus(err.statusCode);
    //   })
  } catch (error) {
    console.log(error);
    response.json(error);
  }

})


export default router;



