import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Dashboard from './Pages/Dashboard/dashboard';
import SignUp from './Pages/signup';
import Submit from './Pages/submit';
import Profile from './Pages/profile';
import Submit2 from './Pages/submit2';
import PostDetails from './Pages/Posts/postDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/dashboard/:id" element={<PostDetails /> } />
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/submit" element={<Submit />} />
        <Route path="/submit-final" element={<Submit2 />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
