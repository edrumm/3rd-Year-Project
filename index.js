require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());

const api = require('./routes');
app.use('/api', api);

app.use(express.static(__dirname + '/test'));

app.listen(port, () => console.log(`Port: ${port}`));
