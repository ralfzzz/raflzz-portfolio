const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const _ = require("lodash");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT;
app.use(express.static('public'));
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'","cdn.jsdelivr.net", "cdnjs.cloudflare.com", "www.w3.org", "www.google-analytics.com"],
          imgSrc: ["'self'", "www.w3.org", "www.google-analytics.com"],
        },
      },
}));

const d = new Date();
let year = d.getFullYear();


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

app.get('/',(req,res)=>{
    res.render("main/main.ejs",{
        year: year,
        title: "About Me",
        page: '../index.ejs'
    })
})

// MONGODB
const dataSchema = new mongoose.Schema({
    periode: {
        type: String,
      },
      title: {
        type: String,
      },
      position: {
        type: String,
      },
      project: {
        type: String,
      }, 
      topics: {
        type: String,
      },
      skills: {
        type: String,
      },
      activity: {
        type: String,
      },
      link:{
        type: String,
      }
});

const portfolioSchema = new mongoose.Schema({
    category: {
        type: String,
      },
      data: [dataSchema]
});
const Portfolio = mongoose.model('portfolio', portfolioSchema);

app.get('/:tab', async (req,res)=>{
    let tab = req.params.tab;
    let category = _.capitalize(tab);

    const data = await Portfolio.findOne({category: category}).catch(error => {
        console.log(error);
    });
    console.log(data)
    if (data!==null) {
        res.render("main/main.ejs",{
            year: year,
            title: category,
            page: '../content.ejs',
            content: data
        })
    } else {
        res.redirect("/")
    }
})


