import express from "express";

import BookController from "../controllers/bookController.js";
import paginate from "../midlewares/paginate.js";

const routes = express.Router();
routes
    .get("/books", BookController.getBooks, paginate)
    .get("/books/search", BookController.getBooksByFilter, paginate)
    .get("/books/:id", BookController.getBookById)
    .post("/books", BookController.registerBook)
    .put("/books/:id", BookController.updateBook)
    .delete("/books/:id", BookController.deleteBook);

export default routes;