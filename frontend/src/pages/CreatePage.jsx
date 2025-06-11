import React, { useState } from 'react';
import { createPost } from '../services/posts';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const [form, setForm] = useState({ title: '', content: '', featuredImage: '', status: 'published' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await createPost(form);
      nav(`/posts/${res.data.slug}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Creation failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-brand-400">Create New Post</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded font-bold mb-4 text-brand-400"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="featuredImage"
          placeholder="Image URL"
          className="w-full p-2 border rounded text-brand-400"
          value={form.featuredImage}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content (HTML allowed)"
          rows="8"
          className="w-full p-2 border rounded text-brand-400"
          value={form.content}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          className="w-full p-2 border rounded text-brand-400"
          value={form.status}
          onChange={handleChange}
        >
          <option value="published" className=" text-brand-400">Publish</option>
          <option value="draft" className=" text-brand-400">Save as Draft</option>
        </select>
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
}
