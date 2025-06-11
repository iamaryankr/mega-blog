const cloudinary = require('../utils/cloudinary');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'blog_posts' },
      (error, result) => {
        if (error) return res.status(500).json({ error: 'Upload failed' });
        res.json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
