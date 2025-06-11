import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPost, deletePost } from '../services/posts';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchPost(slug).then(res => setPost(res.data));
  }, [slug]);

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      await deletePost(slug);
      nav('/');
    }
  };

  if (!post) return <p className="text-center py-10">Loading…</p>;

  return (
    <article className="max-w-3xl mx-auto bg-background rounded shadow-xl p-6 space-y-6 border border-brand-700">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded"
        />
      )}

      <div className="flex items-center gap-3 text-brand-300 text-sm">
        <img
          src={`https://ui-avatars.com/api/?name=${post.author.name}&background=38b861&color=ffffff`}
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-brand-500"
        />
        <span className="font-medium">{post.author.name}</span>
        &middot;
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <h1 className="text-3xl font-bold text-brand-400">{post.title}</h1>

      <div
        className="prose prose-lg max-w-none bg-surface p-6 rounded-md shadow-inner text-brand-400"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {localStorage.getItem('token') && (
        <div className="flex gap-4 mt-8">
          <Link
            to={`/edit/${post.slug}`}
            className="btn btn-secondary flex items-center gap-2"
          >
            <PencilSquareIcon className="w-5 h-5 text-text" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger flex items-center gap-2"
          >
            <TrashIcon className="w-5 h-5 text-text" />
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
