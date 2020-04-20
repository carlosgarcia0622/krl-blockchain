const express = require('express');
const controller = require('../controller/accountController');
const middleware = require('../middlewares/accountMiddleware')
const router = express.Router();

router.post('/create', middleware.createAccountMiddleware,controller.createAccount);
router.post('/mine', controller.mine);

module.exports = router;