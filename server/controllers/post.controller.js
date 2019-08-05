const Post = require('../models/post.model');
const uuid = require('uuid');

exports.getPosts = async (req, res) => {
  try {
    res.status(200).json(await Post.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    res.status(200).json(await Post.find({ id: req.params.id }));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {

  try {
    const { title, author, content } = req.body;
    let newPost = new Post();
    newPost.title = title;
    newPost.author = author;
    newPost.content = content;
    newPost.votes = 0;
    newPost.id = uuid();

    postSaved = await newPost.save();
    res.status(200).json(postSaved);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.editPost = async (req, res) => {
  try {
    const { title, author, content, votes } = req.body.post;
    const { id } = req.body;
    postEdit = await Post.updateOne({ id: id }, { title: title, author: author, content: content, votes: votes });
    res.status(200).json(postEdit)
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.editVotes = async (req, res) => {
  try {
    const { votes, id } = req.body;
    voteEdit = await Post.updateOne({ id: id }, {$set: { votes: votes }});
    res.status(200).json(voteEdit)
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getPostsByRange = async function (req, res) {
  try {
    let { startAt, limit } = req.params;
    startAt = parseInt(startAt);
    limit = parseInt(limit);
    const posts = await Post.find().skip(startAt).limit(limit);
    const amount = await Post.countDocuments();
    res.status(200).json({
      posts,
      amount,
    });
  } catch (err) {
    res.status(500).json(err);
  }

};

exports.getRandom = async (req, res) => {
  try {
    const count = await Post.find().countDocuments();
    const random = Math.floor(Math.random() * count);
    res.status(200).json(await Post.findOne().skip(random));
  } catch (err) {
    res.status(500).json(err);
  }
};