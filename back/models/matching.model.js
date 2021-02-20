import mongoose from "mongoose";

const Schema = mongoose.Schema;
let matchingSchema = new Schema({
    matchings: [
        {
            email: String,
            match: {
                name: String,
                email: String
            }
        }
    ]
});

const Matching = mongoose.model('matchings', matchingSchema);

export default Matching;