import { Link } from 'react-router-dom'
import type { Post } from '../App'

type HomeProps = {
    posts: Post[]
    loading: boolean
    error: string | null
}

function Home({ posts, loading, error }: HomeProps) {

    if (loading) {
        return <p>Loading posts...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>PostHub</h1>
            <p>Latest posts refresh every 10 seconds.</p>

            <ul>
                {posts.map(post => (
                    <li key={post.id} style={{ marginBottom: '1rem' }}>
                        <Link to={`/posts/${post.id}`}>
                            <strong>{post.title}</strong>
                        </Link>
                        <p>{post.body.slice(0, 100)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home