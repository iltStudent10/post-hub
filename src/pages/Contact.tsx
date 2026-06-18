import { useState } from 'react'

type ContactErrors = {
    name?: string
    email?: string
    message?: string
}

function Contact() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [subscribe, setSubscribe] = useState<boolean>(false)
    const [errors, setErrors] = useState<ContactErrors>({})
    const [success, setSuccess] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const nextErrors: ContactErrors = {}

        if (!name.trim()) {
            nextErrors.name = 'Name is required.'
        }

        if (!email.includes('@')) {
            nextErrors.email = 'Email must include @.'
        }

        if (message.trim().length < 10) {
            nextErrors.message = 'Message must be at least 10 characters.'
        }

        setErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            setSuccess('')
            return
        }

        setSuccess('Contact form submitted successfully!')
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Contact</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="message">Message:</label>
                    <br />
                    <textarea
                        id="message"
                        rows={6}
                        cols={40}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="subscribe">
                        <input
                            id="subscribe"
                            type="checkbox"
                            checked={subscribe}
                            onChange={(e) => setSubscribe(e.target.checked)}
                            style={{ marginRight: '0.5rem' }}
                        />
                        Subscribe
                    </label>
                </div>

                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default Contact
