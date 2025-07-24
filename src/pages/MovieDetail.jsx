import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { Rate, Button, Input } from 'antd';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        console.log('მიღებული დეტალები:', res.data);
        setMovie(res.data.data); // სწორად ვიღებთ description-საც
      } catch (err) {
        console.error('ფილმის დეტალების მიღება ვერ მოხერხდა:', err);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`comments-${id}`) || '[]');
    setComments(stored);
  }, [id]);

  const handleAddComment = () => {
    if (comment.trim() === '') return;
    const updated = [...comments, comment.trim()];
    setComments(updated);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updated));
    setComment('');
  };

  const handleAddToFavorites = () => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = stored.find((item) => item.id === movie.id);
    if (!exists) {
      const updated = [...stored, movie];
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  if (!movie) return <p style={{ color: 'white' }}>იტვირთება...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: 'white', marginBottom: '20px' }}>{movie.title}</h2>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          color: 'black',
          marginBottom: '30px',
        }}
      >
        <p><strong>წელი:</strong> {movie.year}</p>
        <p><strong>ჟანრი:</strong> {movie.genre}</p>
        <p><strong>ავტორი:</strong> {movie.author}</p>
        <p><strong>აღწერა:</strong> {movie.description}</p>
        <p><strong>შეფასე ფილმი:</strong></p>
        <Rate value={rating} onChange={setRating} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'white', marginBottom: '10px' }}>💬 კომენტარები</h3>
        <div
          style={{
            backgroundColor: '#1e1e1e',
            padding: '15px',
            borderRadius: '8px',
            color: 'white',
            marginBottom: '15px',
          }}
        >
          {comments.length === 0 ? (
            <p>კომენტარები ჯერ არ არის.</p>
          ) : (
            comments.map((cmt, index) => <p key={index}>{cmt}</p>)
          )}
        </div>
        <Input.TextArea
          rows={3}
          placeholder="კომენტარი..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAddComment}
          style={{ marginTop: '10px' }}
        >
          დამატება
        </Button>
      </div>

      <Button danger onClick={handleAddToFavorites}>
        ❤️ დამატება ფავორიტებში
      </Button>
    </div>
  );
}
