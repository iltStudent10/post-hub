import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

function PostComments() {
    const { id } = useParams<{ id: string }>()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>('')

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true)
                setError('')

                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

                if (!response.ok) {
                    throw new Error('Failed to fetch comments')
                }

                const data: Comment[] = await response.json()
                setComments(data)

            } catch {
                setError('Unable to load comments. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchComments()
    }, [id])

    if (loading) {
        return <p>Loading comments...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} style={{ marginBottom: '1rem' }}>
                            <strong>{comment.name}</strong>
                            <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PostComments