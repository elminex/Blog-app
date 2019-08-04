const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');

router.route('/posts/random/').get(PostController.getRandom);
router.route('/posts/:id').get(PostController.getPost);
router.route('/posts').get(PostController.getPosts);
router.route('/posts/:id').post(PostController.editPost);
router.route('/posts').post(PostController.addPost);
router.route('/posts/range/:startAt/:limit').get(PostController.getPostsByRange);

module.exports = router;
