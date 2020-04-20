const express = require('express');
const controller = require('../controller/transactionController');
const middelware = require('../middlewares/transactionMiddleware');

const router = express.Router();

router.post('/genesis', middelware.genesisMiddleware,  controller.genesis);
router.post('/transfer', middelware.transferMiddleware, controller.transfer);

module.exports = router;