import React, { useState, useEffect } from 'react';
import { fetchPost, updatePost } from '../services/posts';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPage() {
  const { slug } = useParams();
  const [form, setForm] = useState({ title: '', content: '', featuredImage: '', status: 'published' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    fetchPost(slug).then(res => {
      const { title, content, featuredImage, status } = res.data;
      setForm({ title, content, featuredImage, status });
    });
  }, [slug]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updatePost(slug, form);
      nav(`/posts/${slug}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="featuredImage"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={form.featuredImage}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content (HTML allowed)"
          rows="8"
          className="w-full p-2 border rounded"
          value={form.content}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          className="w-full p-2 border rounded"
          value={form.status}
          onChange={handleChange}
        >
          <option value="published">Publish</option>
          <option value="draft">Save as Draft</option>
        </select>
        <button type="submit" className="px-6 py-2 bg-yellow-600 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
}
