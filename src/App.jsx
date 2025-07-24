// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import MovieList from './pages/MovieList.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddMovie from './pages/AddMovie.jsx';
import Favorites from './pages/Favorites.jsx';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
