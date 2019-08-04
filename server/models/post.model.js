const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema( {
  id: {type: 'string', required: true},
  title: {type: 'string', required: true},
  author: {type: 'string', required: true},
  content: {type: 'string', required: true},
});

module.exports = mongoose.model('Post', Post)