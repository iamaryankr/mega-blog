const Post = require('../models/Post');

// GET /api/posts
exports.getAll = async (req, res) => {
  const posts = await Post.find({ status: 'published' }).populate('author','name');
  res.json(posts);
};

// GET /api/posts/:slug
exports.getOne = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author','name');
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
};

// POST /api/posts
exports.create = async (req, res) => {
  const { title, content, featuredImage, status } = req.body;
  const post = await Post.create({
    title, content, featuredImage, status,
    author: req.user.id
  });
  res.status(201).json(post);
};

// PUT /api/posts/:slug
exports.update = async (req, res) => {
  const updates = (({ title, content, featuredImage, status }) => 
    ({ title, content, featuredImage, status }))(req.body);
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug, author: req.user.id },
    updates,
    { new: true }
  );
  if (!post) return res.status(404).json({ error: 'Not found or not yours' });
  res.json(post);
};

// DELETE /api/posts/:slug
exports.remove = async (req, res) => {
  const post = await Post.findOneAndDelete({
    slug: req.params.slug,
    author: req.user.id
  });
  if (!post) return res.status(404).json({ error: 'Not found or not yours' });
  res.json({ message: 'Deleted' });
};
