require('dotenv').config();
const express = require('express');

const api = require('./routes');

const app = express();
const port = 3000;

app.use('/api', api);
app.use(express.json({limit: '1mb'}));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Port: ${port}`));
