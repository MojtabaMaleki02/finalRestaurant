import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './components/list'
import {Registration } from './components/RegisterForm'
import { Login } from './components/LoginForm'
import Profile from './components/profile'
import AddRes from './components/AddRes.js'


const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="home" element={<Main />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="sign-up" element={<Registration />}></Route>
        <Route path="addRes" element={<AddRes />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
