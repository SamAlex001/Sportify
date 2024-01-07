import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { SignUp } from './components/Signup'
import { UserContextProvider } from './context/UserContext'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
