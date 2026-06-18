import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import type { Post } from '../App'

type PostDetailsProps = {
  posts: Post[]
}

function PostDetails({ posts }: PostDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id)
  const post = posts.find((item) => item.id === postId)

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