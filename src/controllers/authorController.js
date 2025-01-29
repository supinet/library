import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";

class AuthorController {
    
    static get = async (req, res, next) => {
        try {
            const records = await authors.find({});
            res.status(200).json(records);
        } catch (error) {
            next(error);
        }
    }

    static getById = async (req, res, next) =>  {
        try {
            const id = req.params.id;
            const authorFound = await authors.findById(id);
            if (authorFound !== null) {
                res.status(200).json(authorFound);
            } else {
                next(new NotFound("record not found"));
            }
            
        } catch (error) {
            next(error);
        }
    }

    static update = async (req, res, next) =>  {
        try {
            const id = req.params.id;
            await authors.findByIdAndUpdate(id, req.body);
            if (author !== null) {
                res.status(200).json({ message: "record updated" });
            } else {
                next(new NotFound("record not found"));
            }
        } catch(error) {
            next(error);
        }
    }

    static register = async (req, res, next) =>  {
        try {
            const newRecord = await authors.create(req.body);
            res.status(201).json({ message: "created with success", author: newRecord });
        } catch (error) {
            next(error);
        }
    }

    static delete = async (req, res, next) =>  {
        try {
            const id = req.params.id;
            const authorFound = await authors.findByIdAndDelete(id);
            if (authorFound !== null) {
                res.status(200).json({ message: 'record removed with success' });
            } else {
                next(new NotFound("record not found"));
            }
        } catch(error) {
            next(error);
        }
    }
}

export default AuthorController;