import React, { Profiler } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Upload from '../pages/Upload'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Profile from '../pages/Profile'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<Search />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes