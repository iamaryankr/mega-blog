import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/posts';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, []);

  return (
    <div className="space-y-10 max-w-2xl mx-auto px-4 sm:px-6">
      {posts.map(post => (
        <div
          key={post._id}
          className="bg-background rounded-md shadow-xl hover:shadow-2xl transition overflow-hidden border border-brand-700"
        >
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2 text-sm text-brand-300">
              <img
                src={`https://ui-avatars.com/api/?name=${post.author.name}&background=38b861&color=ffffff`}
                alt={post.author.name}
                className="w-7 h-7 rounded-full border-2 border-brand-500"
              />
              <span className="font-medium">{post.author.name}</span>
              &middot;
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <Link to={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-bold text-brand-400 hover:underline">
                {post.title}
              </h2>
            </Link>

            <p className="mt-4 text-text line-clamp-4">
              {post.content.replace(/<[^>]+>/g, '').slice(0, 200)}...
            </p>

            <Link
              to={`/posts/${post.slug}`}
              className="inline-block mt-4 btn btn-primary"
            >
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
