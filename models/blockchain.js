'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

let blockchainSchema = new Schema({
    id: {type:String , unique: true},
    blocks: { type: Object },
    difficulty : {type: Number}
});

blockchainSchema.methods.toJSON = function (){
    let blockchain = this;
    let blockchainObject = blockchain.toObject();
    return blockchainObject;
}

blockchainSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Blockchain', blockchainSchema);