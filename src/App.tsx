import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  return <h1>Home Page</h1>
}

function PostDetails() {
  return <h1>Post Details Page</h1>
}

function NewPost() {
  return <h1>New Post Page</h1>
}

function EditPost() {
  return <h1>Edit Post Page</h1>
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>
}

function App() {

  return (
    <div>
      <nav style={{padding: '1rem'}}>
        <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
        <Link to="/new-post">New Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
