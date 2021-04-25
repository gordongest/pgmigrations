const express = require('express');
const router = express.Router();
const Controllers = require('./controllers');

router.get('/', Controllers.test),

router.get('/posts', Controllers.getPosts),

router.post('/posts', Controllers.addPost)

module.exports = router;