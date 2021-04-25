const Controllers = require('../database/controllers');

module.exports = app => {
  app.get('/', Controllers.test),

  app.get('/posts', Controllers.getPosts),

  app.post('/posts', Controllers.addPost)
}