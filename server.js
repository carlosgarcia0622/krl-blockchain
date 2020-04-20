require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';


var app = express();
app.use(cors());

//Connect DB
mongoose.connect(process.env.URIDB, {
    useNewUrlParser: true
})
    .then(() => {
        logger.info('Connected to MongoDB...', process.env.URIDB);
    })
    .catch(err => logger.error('Could not connect to MongoDB...', err));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(routes);

const port = process.env.PORT


if (!port) {
    logger.error('FATAL ERROR: variable PORT is not defined.');
    process.exit(1);
}

app.listen(port, () => {
    logger.info('*** Server is up and running on port number ' + port + '\n');
});