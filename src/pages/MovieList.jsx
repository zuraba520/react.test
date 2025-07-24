import React, { useEffect, useState } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies');
      console.log('მიღებული მონაცემები:', response.data);

      const moviesArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setMovies(moviesArray);
    } catch (error) {
      console.error('ფილმების მიღება ვერ მოხერხდა:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', marginBottom: '15px' }}>🎬 ფილმების კატალოგი</h2>

      <input
        type="text"
        placeholder="ძებნა ფილმის სახელით..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '30px',
          width: '100%',
          borderRadius: '6px',
          border: '1px solid #555',
          background: '#1c1c1c',
          color: 'white',
        }}
      />

      {loading ? (
        <p style={{ color: 'white' }}>იტვირთება...</p>
      ) : filteredMovies.length === 0 ? (
        <p style={{ color: 'white' }}>ფილმები ვერ მოიძებნა.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {filteredMovies.map((movie) => (
            <div key={movie.id} style={{ flex: '0 1 250px' }}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
