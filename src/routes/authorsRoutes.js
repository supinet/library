import express from "express";

import AuthorController from "../controllers/authorController.js";
import paginate from "../midlewares/paginate.js";

const routes = express.Router();
routes
    .get("/authors", AuthorController.get, paginate)
    .get("/authors/:id", AuthorController.getById)
    .post("/authors", AuthorController.register)
    .put("/authors/:id", AuthorController.update)
    .delete("/authors/:id", AuthorController.delete);

export default routes;