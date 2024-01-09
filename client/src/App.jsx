import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { SignUp } from './components/Signup'
import { UserContextProvider } from './context/UserContext'
import { CreatePost } from './components/CreatePost'
import { PostPage } from './components/PostPage'
import { PostPageOpen } from './components/PostPageOpen'
import { EditPost } from './components/EditPost'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/post' element={<PostPage />} />
        <Route path='/post/:id' element={<PostPageOpen />} />
        <Route path='/editPost/:id' element={<EditPost />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
