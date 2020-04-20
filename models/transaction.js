'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let transactionSchema = new Schema({
    transactions: { type: Object },
    id: {type:String , unique: true},

});

transactionSchema.methods.toJSON = function (){
    let transaction = this;
    let transactionObject = transaction.toObject();
    return transactionObject;
}

module.exports = mongoose.model('Transaction', transactionSchema);