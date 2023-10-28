
const mongoose = require("mongoose");

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
      },
      website:{
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

module.exports = Portfolio;
