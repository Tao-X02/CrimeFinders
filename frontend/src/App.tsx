import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';
import SignUp from './Pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/signup" element={<SignUp /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
