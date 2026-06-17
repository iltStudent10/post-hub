import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'
import './App.css'

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
