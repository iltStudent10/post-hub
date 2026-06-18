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
    const [draft, setDraft] = useState<{ title: string; body: string } | null>(null)

    const postId = Number(id)
    const post = posts.find((item) => item.id === postId)

    const title = draft?.title ?? post?.title ?? ''
    const body = draft?.body ?? post?.body ?? ''

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError('')
        setSuccess('')

        if (!title.trim() || !body.trim()) {
            setFormError('Title and body are required.')
            return
        }

        if (!post) {
            setFormError('Post not found.')
            return
        }

        updatePost({ ...post, title, body })

        setSuccess("Post updated successfully!")
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
                        onChange={(e) =>
                            setDraft((prev) => ({
                                title: e.target.value,
                                body: prev?.body ?? post?.body ?? '',
                            }))
                        }
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) =>
                            setDraft((prev) => ({
                                title: prev?.title ?? post?.title ?? '',
                                body: e.target.value,
                            }))
                        }
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