import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data: Post = await response.json();
        setPost(data);

      } catch {
        setError("Unable to load post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
}, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return (
        <div style={{ padding: '1rem', color: 'red' }}>
            <p>{error}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
  }

  if (!post) {
    return (
        <div style={{ padding: '1rem' }}>
            <p>Post not found.</p>
            <Link to="/">Back to Home</Link>
        </div>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
        <Link to="/">Back to Home</Link>

        <h1>{post.title}</h1>
        <p>{post.body}</p>
        
        <nav style={{ marginBottom: '1rem' }}>
            <NavLink to="." end style={{ marginRight: '1rem' }}>Overview</NavLink>
            <NavLink to="comments" style={{ marginRight: '1rem' }}>Comments</NavLink>
            <NavLink to="edit">Edit Post</NavLink>
        </nav>
        <Outlet />
    </div>
  );
}

export default PostDetails;