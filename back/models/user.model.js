import mongoose from "mongoose";
import event from "./event.model.js"

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true,
    }, 
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'event'
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

export default User;