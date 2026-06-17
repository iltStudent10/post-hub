import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

function EditPost() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Post | null>(null)
    const [title, setTitle] = useState<string | null>('')
    const [body, setBody] = useState<string | null>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                setError('')

                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch post')
                }

                const data: Post = await response.json()
                setPost(data)
                setTitle(data.title)
                setBody(data.body)
            } catch {
                setError('Unable to load post. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')
        setSuccess('')

        if (!title.trim() || !body.trim()) {
            setFormError('Title and body are required.')
            return
        }
        setSuccess("Post updated successfully!")
    }

    if (loading) {
        return <p>Loading edit form...</p>
    }

    if (error) {
        return (
            <div style={{ padding: '1rem', color: 'red' }}>
                <p>{error}</p>
                <Link to="/">Back to Home</Link>
            </div>
        )
    }

    if (!post) {
        return (
            <div style={{ padding: '1rem', color: 'red' }}>
                <p>Post not found.</p>
                <Link to="/">Back to Home</Link>
            </div>
        )
    }

    return (
        <div style={{ padding: '1rem' }}>
            <Link to={`/posts/${post.id}`}>← Back to Post</Link>

             <h1>Edit Post</h1>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={6}
                        cols={40}
                    />
                </div>

                {formError && <p style={{ color: 'red' }}>{formError}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default EditPost