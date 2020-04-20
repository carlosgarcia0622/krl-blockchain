require('../config/config')
let sha256 = require('sha256')
let blockchain = require('../models/blockchain');
let historyBlocks = require('../models/historyBlocks');


async function createBlockchain(genesisBlock){
    await blockchain.create({blocks: [genesisBlock], difficulty: process.env.DIFFICULTY, id: process.env.ADDRESS_MINA})
};

async function createHistory(){
    blockchain.find({id: process.env.ADDRESS_MINA} ,async function(err, data){
        if(err){
            console.log(err);
            throw new Error(err);
        };

        await historyBlocks.create({numBlocks: data[0].blocks.length, hash : sha256(data[0].blocks)})

    });
}

module.exports = {
    createBlockchain,
    createHistory
}