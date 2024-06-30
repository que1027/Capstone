import { Router } from "express";
import Appointment from "../models/appointment.js";

const router = Router();

// all routes go here
//create appointment route

router.post("/", async (request, response) => {
  try {
    const newAppointment = new Appointment(request.body);

    const data = await newAppointment.save();

    response.json(data);
  } catch (error) {
    //console log the error if it fails to send a response
    console.log(error);

    //if error.name exists and it == validation error
    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});
//get all apointments route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JS Object
    const query = request.query; //defaults to an empty object

    const data = await Appointment.find(query);

    response.json(data);
  } catch (error) {
    //Output any errors to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

//get single appointment route by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Appointment.findById(request.params.id);

    response.json(data);
  } catch (error) {
    //output error to the console
    console.log(error);

    return response.status(500).json(error.errors);
  }
});
//delete a appointment by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Appointment.findByIdAndDelete(request.params.id, {}); //why the object

    response.json(data);
  } catch (error) {
    //output error to the console
    console.log(error);

    return response.status(500).json(error.errors);
  }
});
//update appointment by ID

router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Appointment.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          name: body.name,
          date: body.date,
          time: body.time
        }
      },
      {
        new: true
      }
    );

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});
export default router;
