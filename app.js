const express = require ('express');
const mongoose = require ('mongoose');
let bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

const apiRoutes = require ('./src/modules/routes/routes');

app.use(cors());

const uri = process.env.URL;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/', apiRoutes);

app.listen(8080, () => {
    console.log('I am listening')
});