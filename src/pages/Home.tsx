import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

function Home() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')

                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data: Post[] = await response.json()
                setPosts(data)

                if (isMounted) {
                    setPosts(data)
                    setError('')
                }

            } catch {
                if (isMounted) {
                    setError('Unable to load posts. Please try again later.')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchPosts()

        const intervalId = setInterval(fetchPosts, 10000)

        return () => {
            isMounted = false
            clearInterval(intervalId)
        }
    }, [])

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
                        <Link to={`/post/${post.id}`}>
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