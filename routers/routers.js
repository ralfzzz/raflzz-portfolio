const { Router } = require('express'); 
const app = Router(); 
const { about,skills, content } = require('../controllers/postController');
  
app.get('/', about)
app.get('/skills', skills)
app.get('/:tab', content)

module.exports = app;