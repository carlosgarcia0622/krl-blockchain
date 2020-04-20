require('../config/config');
const config = require('config');
const sha256 = require('sha256');
const Account = require('../models/account');
const blockchainController = require('../controller/blockchainController');
const accountController = require('../controller/accountController');
const Transaction = require('../models/transaction');
const log4js = require('log4js');
const logger = log4js.getLogger();
const Block = require('../blockchain/Block');
logger.level = 'debug';


async function genesis(req, res) {
    logger.info('::::: Genesis init :::::::');
    try{
        let mina = {address: process.env.ADDRESS_MINA, balance: req.body.coins, type: 'mina', difficulty: req.body.difficulty};
        await Account.create(mina);
        await Transaction.create({transactions:[], id: process.env.ADDRESS_MINA});
        let transaction = {from: process.env.ADDRESS_MINA, to: process.env.ADDRESS_MINA, coins: req.body.coins}
        let block = new Block(transaction);
        block.header.hash = block.getHash(process.env.DIFFICULTY, block);
        await blockchainController.createBlockchain(block);
        await blockchainController.createHistory();
        res.status(200).json({message: 'Successfully block genesis creation', difficulty: req.body.difficulty});
    }catch (error) {
        logger.error(`:::: Genesis error: ${error}`);
        res.status(500).json({error: `${error}`});
    }

}

async function transfer(req, res){
    logger.info('::::: transfer init :::::::');
    try{

        req.body.objectFrom.balance = req.body.objectFrom.balance - req.body.amount;
        req.body.objectTo.balance = parseInt(req.body.objectTo.balance) + parseInt(req.body.amount);
        await accountController.updateDocument(req.body.objectFrom);
        await accountController.updateDocument(req.body.objectTo);
        console.log(JSON.stringify(req.body.objectFrom));
        await Transaction.find({id: process.env.ADDRESS_MINA},(err, transactions) => {
            if (err) throw err;
            transactions[0].transactions.push({from: req.body.from, to: req.body.to, amount: req.body.amount });
            Transaction.findByIdAndUpdate(transactions[0]._id, transactions[0], function(err, model) {
                if (err) {
                    logger.error(err.message);
                    throw new Error(err.message);
                }
            });
        });


        res.status(200).json({message: 'Proposal transaction created'});

    }catch (error) {
        logger.error(`:::: transfer error: ${error}`);
        res.status(500).json({error: `${error}`});

    }

}

module.exports = {
    genesis,
    transfer
}