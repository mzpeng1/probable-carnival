import mongoose from "mongoose";

const Schema = mongoose.Schema;

let FRQResponse = new Schema({
    title: {
        type: String
    },
    response: {
        type: String
    },
});

let MCQResponse = new Schema({
    title: {
        type: String
    },
    response: {
        type: String
    },
});

let responseForm = new Schema({
    FRQResponses: {
        type: [FRQResponse]
    },
    MCQResponses: {
        type: [MCQResponse]
    },
});

const Response = mongoose.model("responses", responseForm);

export default Response;