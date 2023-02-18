const Joi = require('joi'); 

const ValidateCreateSquadRelationRequest = (req, res, next) => {
   const schema = Joi.object({
        seriesId: Joi.number().integer().required(),
    });
    validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    console.log(req.body);
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

module.exports = ValidateCreateSquadRelationRequest;