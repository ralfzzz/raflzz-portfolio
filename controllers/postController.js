const d = new Date();
let year = d.getFullYear();
const db = require('../models/portfolio');
const _ = require("lodash");

function about (req, res) { 
    res.render("main/main.ejs",{
        year: year,
        title: "About Me",
        page: '../index.ejs'
    })
}

function skills (req,res) {
    res.render("main/main.ejs",{
        year: year,
        title: "Skills",
        page: '../skills.ejs'
    })
}

async function content (req,res) {
    let tab = req.params.tab;
    let category = _.capitalize(tab);

    const data = await db.findOne({category: category}).catch(error => {
        console.log(error);
    });
    // console.log(data)
    if (data!==null) {
        res.render("main/main.ejs",{
            year: year,
            title: category,
            page: '../content.ejs',
            content: data
        })
    } else if(data==null && category=="Skills") {
      res.redirect("/skills");
    } else {
      res.redirect("/");
    }
}

module.exports = {
    about,
    skills,
    content
}
