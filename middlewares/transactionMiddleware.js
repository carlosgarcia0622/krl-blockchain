const Joi = require('joi');
const Account = require('../models/account');


let  genesisMiddleware = (req,res,next) => {
    const schema = {
        coins: Joi.number().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error === null){
        next();
    }else{
        res.status(401).send({message: `Invalid params: ${result.error}`});
    }

}

let  transferMiddleware = async (req,res,next) => {

    let flag = true;
    await Account.find({address: req.body.from},(err, user) => {
            if (err) throw err;
            if(user.length === 0) {
                flag = false
                return res.status(401).send({message: `Address not found: ${req.body.from}`});
            }
            if(user[0].balance < req.body.amount){
                flag = false;
                return res.status(401).send({message: `Insuficient Balance`});
            }
        req.body.objectFrom = user[0]
        }
    );

    await Account.find({address: req.body.to},(err, user) => {
            if (err) throw err;
            if(user.length === 0) {
                flag = false
                return res.status(401).send({message: `Address not found: ${req.body.to}`});
            }
            req.body.objectTo = user[0]
        }
    );

    if(flag){
        const schema = {
            from: Joi.string().required(),
            to: Joi.string().required(),
            amount: Joi.number().required(),
            objectTo: Joi.object(),
            objectFrom: Joi.object(),
    };
        const result = Joi.validate(req.body, schema);
        if (result.error === null){
            next();
        }else{
            res.status(401).send({message: `Invalid params: ${result.error}`});
        }}


}

module.exports = {
    genesisMiddleware,
    transferMiddleware
}