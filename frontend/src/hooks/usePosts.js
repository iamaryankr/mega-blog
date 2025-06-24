// import { useState, useEffect } from 'react';
// import { fetchPosts } from '../services/posts';

// export default function usePosts() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     fetchPosts()
//       .then(res => setPosts(res.data))
//       .catch(err => setError(err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { posts, loading, error };
// }
