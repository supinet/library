import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, "The author's name is mandatory"]
    },
    nationality: { type: String }
}, { versionKey: false });

const authors = mongoose.model("authors", authorSchema);

export default authors;