import BadRequest from "./BadRequest.js";

class ErrorValidation extends BadRequest {
    constructor(error) {
        const messsagesErrors = Object.values(error.errors)
        .map(error => error.message)
        .join("; ");
        super(`The following errors were found ${messsagesErrors}`);
    }
}

export default ErrorValidation;