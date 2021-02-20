import mongoose from "mongoose";

const Schema = mongoose.Schema;

let fieldsSchema = new Schema({
    FRQS: {
        type: [String]
    },
    MCQS: {
        type: [[String]]
    },
});

export default fieldsSchema;
