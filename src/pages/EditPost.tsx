import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Post } from '../App'

type EditPostProps = {
    posts: Post[]
    updatePost: (updatedPost: Post) => void
}

function EditPost({ posts, updatePost }: EditPostProps) {
    const { id } = useParams<{ id: string }>()
    const [success, setSuccess] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    const postId = Number(id)
    const post = posts.find((item) => item.id === postId)
    const error = Number.isNaN(postId)
        ? 'Invalid post id.'
        : !post
            ? 'Unable to load post. Please try again later.'
            : ''

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError('')
        setSuccess('')

        if (!post) {
            setFormError('Post not found.')
            return
        }

        const formData = new FormData(e.currentTarget)
        const title = String(formData.get('title') ?? '').trim()
        const body = String(formData.get('body') ?? '').trim()

        if (!title.trim() || !body.trim()) {
            setFormError('Title and body are required.')
            return
        }

        updatePost({ ...post, title, body })

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
                        name="title"
                        defaultValue={post.title}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        defaultValue={post.body}
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