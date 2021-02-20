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
        type: [Boolean]
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

export default responseForm;