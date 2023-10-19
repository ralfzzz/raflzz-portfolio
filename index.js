const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const _ = require("lodash");

const app = express();
const port = process.env.PORT;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));



mongoose.connect(process.env.URI_MONGODB) // if error it will throw async error
    .then(() => { // if all is ok we will be here
        return app.listen(port,() => {
            console.log(`ralfzz portfolio is running:)`);
        });
    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });