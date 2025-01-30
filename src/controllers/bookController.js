import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BookController {
    
    //http://localhost:3000/books?authorName=Flandly&sort=title:1&page=2
    static getBooks = async (req, res, next) => {
        try {
            const search = books.find();
            req.result = search;
            next();
        } catch (error) {
            next(error);
        }
    }

    static getBookById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const bookFound = await books.findById(id)
                .populate("author", "name")
                .exec();
            if (bookFound !== null) {
                res.status(200).json(bookFound);
            } else {
                next(new NotFound());
            }
        } catch(error) {
            next(error);
        }
    }

    static updateBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            const bookFound = await books.findByIdAndUpdate(id, req.body);
            if (bookFound != null) {
                res.status(200).json({ message: "book updated" });
            } else {
                next(new NotFound());
            }
        } catch(error) {
            next(error);
        }
    }

    static registerBook = async(req, res, next) => {
        try {
            const newBook = new books(req.body);
            const createdBook = await newBook.save();
            res.status(201).send(createdBook.toJSON());
        } catch (error) {
            next(error);
        }
    }

    static deleteBook = async (req, res, next) => {
        try {
            const id = req.params.id;
            const bookFound = await books.findByIdAndDelete(id);
            if (bookFound !== null) {
                res.status(200).json({ message: 'record removed with success' });
            } else {
                next(new NotFound());
            }
        } catch(error) {
            next(error);
        }
    }

    static getBooksByFilter = async (req, res, next) => {
        try {
            const search = await processSearch(req.query);
            if (search !== null) {
                const booksByEditor = books
                    .find(search)
                    .populate("author");
                    req.result = booksByEditor;
                next();
            } else {
                res.status(200).send([]);
            }
        } catch (error) {
            next(error);
        }
    }
};

async function processSearch(params) {
    const { editor, title, minPages, maxPages, authorName } = params;
    let search = {};
    if (editor) search.editor = editor;
    if (title) search.title = { $regex: title, $options: "i" };
    if (minPages || maxPages) search.pages = {};
    if (minPages) search.pages.$gte = minPages;
    if (maxPages) search.pages.$lte = maxPages;
    if (authorName) {
        const author = await authors.findOne({ name: authorName });
        if (author !== null) {
            search.author = author._id;
        } else {
            search = null;
        }
    }
    return search;
}

export default BookController;
