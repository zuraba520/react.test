import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', marginBottom: '15px' }}>⭐ ჩემი ფავორიტები</h2>

      {favorites.length === 0 ? (
        <p style={{ color: 'white' }}>ფავორიტები არ მოიძებნა.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {favorites.map((movie) => (
            <div key={movie.id} style={{ flex: '0 1 250px' }}>
              <MovieCard movie={movie} isFavorite onRemove={handleRemove} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
