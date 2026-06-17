import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Post } from '../App'

type NewPostData = {
    title: string
    body: string
    author: string
    category: string
}

type NewPostProps = {
    addPost: (newPost: Omit<Post, 'id' | 'userId'>) => void
}

function NewPost({ addPost }: NewPostProps) {
    const [formData, setFormData] = useState<NewPostData>({
        title: '',
        body: '',
        author: '',
        category: '',
    })
    const [errors, setErrors] = useState<Partial<NewPostData>>({})
    const [success, setSuccess] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<NewPostData> = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required.'
        if (!formData.body.trim()) newErrors.body = 'Body is required.'
        if (!formData.author.trim()) newErrors.author = 'Author is required.'
        if (!formData.category.trim()) newErrors.category = 'Category is required.'

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSuccess('')

        if (!validateForm()) return

        addPost(formData)

        setSuccess('New post created successfully!')

        setFormData({
            title: '',
            body: '',
            author: '',
            category: '',
        })
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
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="body">Body:</label>
                    <br/>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        rows={6}
                        cols={40}
                    />
                    {errors.body && <p style={{ color: 'red' }}>{errors.body}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="author">Author:</label>
                    <br/>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                    {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="category">Category:</label>
                    <br/>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                </div>

                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default NewPost