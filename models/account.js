'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence');

let Schema = mongoose.Schema;

let valid_types = {
    values: ['mina', 'miner', 'user'],
    message: '{VALUE} no es un rol valido'
}

let accountSchema = new Schema({
    address: { type: String, index: true, required:[true], unique : true},
    balance: { type: String, required: [true] },
    type: {type:String, required: [true], enum: valid_types},
    difficulty: {type: Number}
});

accountSchema.plugin(uniqueValidator, { message: ' Debe ser único' });


accountSchema.methods.toJSON = function (){
    let account = this;
    let accountObject = account.toObject();

    return accountObject;
};
module.exports = mongoose.model('Account', accountSchema);