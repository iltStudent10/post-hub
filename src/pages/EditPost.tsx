import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Post } from '../App'

type EditPostProps = {
    posts: Post[]
    updatePost: (updatedPost: Post) => void
}

function EditPost({ posts, updatePost }: EditPostProps) {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<Post | null>(null)
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [error, setError] = useState<string | null>('')
    const [success, setSuccess] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        const postId = Number(id)
        const foundPost = posts.find((item) => item.id === postId)

        if (!foundPost) {
            setPost(null)
            setError('Unable to load post. Please try again later.')
            return
        }

        setPost(foundPost)
        setTitle(foundPost.title)
        setBody(foundPost.body)
        setError('')
    }, [id, posts])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')
        setSuccess('')

        if (!title.trim() || !body.trim()) {
            setFormError('Title and body are required.')
            return
        }

        if (post) {
            updatePost({ ...post, title, body })
        }

        setSuccess("Post updated successfully!")
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
            <Link to={`/post/${post.id}`}>← Back to Post</Link>

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