require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', api);
app.use(express.json({limit: '1mb'}));
app.use(express.static(__dirname + '/test'));

app.listen(port, () => console.log(`Port: ${port}`));
