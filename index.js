require('dotenv').config();
const express = require('express');

const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/routes', routes);
app.use(express.json({limit: '1mb'}));
app.listen(port, () => console.log(`Port: ${port}`));

// Main app code
// ...
