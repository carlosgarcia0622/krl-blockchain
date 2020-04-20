const Joi = require('joi');


let  createAccountMiddleware = (req,res,next) => {
    const schema = {
        address: Joi.string().required(),
        type: Joi.string().required(),
        balance: Joi.number().required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error === null){
        next();
    }else{
        res.status(401).send({message: `Invalid params: ${result.error}`});
    }

}

module.exports = {
    createAccountMiddleware
}