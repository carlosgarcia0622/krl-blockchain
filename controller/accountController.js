const Account = require('../models/account')
const sha256 = require('sha256');
const log4js = require('log4js');
const logger = log4js.getLogger();
const Transactions = require('../models/transaction');
const historyBlocks = require('../models/historyBlocks');
const Blockchain = require('../models/blockchain');
const Block = require('../blockchain/Block');
logger.level = 'debug';

async function createAccount(req, res) {
    logger.info(':::::Account create init ::::::')
    try{
        await Account.create(req.body);
        logger.info('Successfully account Create')
        res.status(200).json({message: 'Successfully account Create'})
    }catch(error){
        res.status(500).json({error:`${error}`})
        logger.error(`::::account create error: ${error}`)

    }
};

async function mine(req, res) {
    logger.info(':::::Mine init ::::::')
    try{
        let block;
        let prevHash= '';
        await Transactions.find({id: process.env.ADDRESS_MINA},(err, transactions) => {
                if (err) throw err;
                block = new Block(transactions[0].transactions);
                block.getHash(process.env.DIFFICULTY, block);
                transactions[0].transactions = [];
                Transactions.findByIdAndUpdate(transactions[0]._id, transactions[0], function(err, model) {
                    if (err) {
                        logger.error(err.message);
                        throw new Error(err.message);
                    }
                });
            }
        );

        await Blockchain.find({id: process.env.ADDRESS_MINA},(err, blocks) => {
                if (err) throw err;
                block.header.previousHash = blocks[0].blocks[blocks[0].blocks.length -1 ].header.hash;

                blocks[0].blocks.push(block);
                historyBlocks.create({numBlocks: blocks[0].blocks.length, hash: sha256(blocks[0].blocks)})
                Blockchain.findByIdAndUpdate(blocks[0]._id, blocks[0], function(err, model) {
                    if (err) {
                        logger.error(err.message);
                        throw new Error(err.message);
                    }
                });
            }
        );
        res.status(200).json({message: 'Successfully mined block', block})
    }catch(error){
        res.status(500).json({error:`${error}`})
        logger.error(`::::Mine error: ${error}`)

    }
};

async function updateDocument(document){
    Account.findByIdAndUpdate(document._id, document, function(err, model) {
        if (err) {
            logger.error(err.message);
            throw new Error(err.message);
        }
    });
}


module.exports = {
    createAccount,
    updateDocument,
    mine
}