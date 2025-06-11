const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    content:    { type: String, required: true },
    featuredImage: { type: String },
    status:     { type: String, enum: ['draft','published'], default: 'draft' },
    author:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
PostSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
