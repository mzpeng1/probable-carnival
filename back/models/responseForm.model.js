import mongoose from "mongoose";

const Schema = mongoose.Schema;

let responseForm = new Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String,
    },
    Responses: [String],
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "event"
    },
    eventName: {
        type: String,
    },
    eventPassword: {
        type: String,
    }
});

const Response = mongoose.model("responses", responseForm);

export default Response;