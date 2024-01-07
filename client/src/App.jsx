import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/login'
import { SignUp } from './components/signup'
import { Home } from './components/home'
import { useEffect } from 'react'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
