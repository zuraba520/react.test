// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '10px',
      background: '#333',
      color: 'white',
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
    }}>
      <Link to="/" style={{ color: 'white' }}>🏠 მთავარი</Link>
      <Link to="/favorites" style={{ color: 'white' }}>⭐ ფავორიტები</Link>
      <Link to="/add-movie" style={{ color: 'white' }}>➕ ფილმის დამატება</Link>

      <div style={{ marginLeft: 'auto' }}>
        {token ? (
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            🚪 გასვლა
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>🔑 შესვლა</Link>
            <Link to="/register" style={{ color: 'white' }}>📝 რეგისტრაცია</Link>
          </>
        )}
      </div>
    </nav>
  );
}
// working to fix
