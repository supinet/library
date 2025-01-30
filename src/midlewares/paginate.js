import BadRequest from "../errors/BadRequest.js";

async function paginate(req, res, next) {
    try {
        let { limit = 3, page = 1, sort = "_id:-1" } = req.query;
        let [sortField, sortValue] = sort.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        sortValue = parseInt(sortValue);

        const result = req.result;

        if (limit > 0 && page > 0) {
            const recordsPaginated = await result.find()
            .sort({ [sortField]: sortValue })
            .skip((page -1) * limit)
            .limit(limit)
            .exec();
            res.status(200).json(recordsPaginated);
        } else {
            next(new BadRequest());
        }
    } catch(error) {
        next(error);
    }
}

export default paginate;