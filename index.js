require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// require('./FrontEnd/picturethat/src/index');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const api = require('./routes');
app.use('/api', api);

// Remove for demo:
app.use(express.static(__dirname + '/test'));

app.listen(port, () => console.log(`Port: ${port}`));
