import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appName:{
        type:String
    },
    appDate:{
        type:String
    },
    appTime:{
        type:String
    },
    appLength:{
        type: String
    },
    // accepted:{
    //     type:Boolean
    // }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
