import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import PostComments from './pages/PostComments'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import Contact from './pages/Contact.tsx'
import NotFound from './pages/NotFound'
import './App.css'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
  author?: string
  category?: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
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

  const addPost = (newPost: Omit<Post, 'id' | 'userId'>) => {
    const postToAdd: Post = {
      ...newPost,
      id: Date.now(),
      userId: 1,
    }
    setPosts((prevPosts) => [...prevPosts, postToAdd])
  }

  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    )
  }

  return (
    <div>
      <nav style={{padding: '1rem'}}>
        <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
        <Link to="/new-post" style={{marginRight: '1rem'}}>New Post</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home posts={posts} loading={loading} error={error} />} />
        <Route path="/posts/:id" element={<PostDetails posts={posts}/> }>
          <Route path="comments" element={<PostComments />} />
          <Route path="edit" element={<EditPost posts={posts} updatePost={updatePost} />} />
        </Route>
        <Route path="/new-post" element={<NewPost addPost={addPost} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
