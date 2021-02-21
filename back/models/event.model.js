import mongoose from "mongoose";
import responseForm from "./responseForm.model.js";
import fieldsSchema from "./questionForm.model.js";

const Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    fieldQuestions: {
        type: fieldsSchema,
        required: true,
    },
    responses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'response'
        }
    ]

}, {
    timestamps: true,
});

const Event = mongoose.model('event', eventSchema);

export default Event;