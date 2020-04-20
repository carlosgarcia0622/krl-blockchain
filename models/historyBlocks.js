'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence');

let Schema = mongoose.Schema;

let historyBlocksSchema = new Schema({
    numBlocks: { type: Number },
    hash: { type: String, required: [true] },
});

historyBlocksSchema.methods.toJSON = function (){
    let history = this;
    let historyObject = history.toObject();

    return history;
};


module.exports = mongoose.model('HistoryBlocks', historyBlocksSchema);