import { Route, Routes } from 'react-router-dom';
import { CreatePost } from '../pages/CreatePost';
import { PostPage } from '../pages/PostPage';
import { EditPost } from '../pages/EditPost';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PostPageOpen } from '../pages/PostPageOpen';
import { SignUp } from '../pages/Signup';
import { UserContextProvider } from '../context/UserContext';
import './App.css';
import { ProfilePage } from '../pages/ProfilePage';

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
        <Route path='/profilePage/:id' element={<ProfilePage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
