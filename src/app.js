require('dotenv').config({ silent: true });

const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello PauloDev !!!')
})


const telegram = require('./bot');
const watson = require('./watson');

module.exports = app