import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import BadRequest from "../errors/BadRequest.js";
import ErrorValidation from "../errors/ErrorValidation.js";

function errorHandler (error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
      new BadRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
      new ErrorValidation(error).sendResponse(res);
    } else if (error instanceof ErrorBase) {
      error.sendResponse(res);
    } else {
      new ErrorBase().sendResponse(res);
    }
};

export default errorHandler;