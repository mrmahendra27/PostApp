const Post = require("../models/Post");

const index = (req, res, next) => {
  Post.find()
    .then((response) => res.json({ response }))
    .catch((error) => res.json({ error }));
};

const store = (req, res, next) => {
  const newPost = new Post({
    title: req.body.title,
    sub_title: req.body.sub_title,
    author: req.body.author,
    summary: req.body.summary,
    description: req.body.description,
  });
  if (req.files) {
    let path = ''
    req.files.forEach((files, index, arr) => {
        path = path + files.path + ','
    });
    path = path.substring(0, path.lastIndexOf(","))
    newPost.image = path;
  }
  newPost
    .save()
    .then((response) =>
      res.json({
        message: "Post has been created.",
        data: response,
      })
    )
    .catch((error) => res.json({ error }));
};

const show = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((response) =>
      response
        ? res.json({ response })
        : res.json({ message: `Post with id '${postId}' does not exists!` })
    )
    .catch((error) => res.json({ error }));
};

const update = (req, res, next) => {
  const postId = req.params.postId;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to cannot be empty!",
    });
  }
  const updatePost = {
    title: req.body.title,
    sub_title: req.body.sub_title,
    author: req.body.author,
    summary: req.body.summary,
    description: req.body.description,
  };
  if (req.files) {
    let path = ''
    req.files.forEach((files, index, arr) => {
        path = path + files.path + ','
    });
    path = path.substring(0, path.lastIndexOf(","))
    updatePost.image = path;
  }
  console.log(updatePost)
  Post.findByIdAndUpdate(postId, updatePost, { useFindAndModify: false })
    .then((response) =>
      res.json({
        message: "Post has been updated.",
        data: response,
      })
    )
    .catch((error) => res.json({ error }));
};

const destroy = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndRemove(postId)
    .then((response) =>
      res.json({
        message: "Post has been deleted.",
      })
    )
    .catch((error) => res.json({ error }));
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
