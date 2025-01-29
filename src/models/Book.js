import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
        type: String,
        required: [true, "The books's title is required"]
    },
    editor: {
        type: String,
        required: [true, "The editor is required"],
        enum: {
            values: ["House of code", "XPTO"],
            message: "The editor {VALUE} is not valid"
        }
    },
    price: { type: Number },
    pages: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 10 && value <= 5000;
            },
            message: "The page number must between 10 and 5000. Provide value: {VALUE}"
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "The author is required"]
    }
}, { versionKey: false });

const books = mongoose.model("books", bookSchema);

export default books;