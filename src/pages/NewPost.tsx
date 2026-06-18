import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Post } from '../App'

type NewPostProps = {
    addPost: (newPost: Omit<Post, 'id' | 'userId'>) => void
}

function NewPost({ addPost }: NewPostProps) {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!title.trim() || !body.trim() || !author.trim() || !category.trim()) {
            setError('All fields are required.')
            return
        }

        addPost({
            title,
            body,
            author,
            category,
        })

        setSuccess('New post created successfully!')
        setTitle('')
        setBody('')
        setAuthor('')
        setCategory('')
    }

    return (
        <div style={{ padding: '1rem' }}>
            <Link to="/">← Back to Home</Link>

            <h1>Create New Post</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">Title:</label>
                    <br/>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="body">Body:</label>
                    <br/>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={6}
                        cols={40}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="author">Author:</label>
                    <br/>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="category">Category:</label>
                    <br/>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default NewPost