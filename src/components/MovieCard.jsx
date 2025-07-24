import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StarOutlined, DeleteOutlined } from '@ant-design/icons';

export default function MovieCard({ movie, onRemove, isFavorite }) {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.some(fav => fav.id === movie.id)) {
      alert('უკვე ფავორიტებშია');
      return;
    }

    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('დაემატა ლოკალურ ფავორიტებში!');
  };

  return (
    <Card
      title={movie.title}
      extra={
        <Button onClick={handleDetail} size="small">
          დეტალურად
        </Button>
      }
      className="w-full max-w-[300px]"

      cover={
        <img
          alt={movie.title}
          src={`https://placehold.co/300x200/EEE/444?text=${encodeURIComponent(movie.title)}`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      }
    >
      <p><strong>წელი:</strong> {movie.year}</p>
      <p><strong>ჟანრი:</strong> {movie.genre}</p>

      {isFavorite ? (
        <Button
          type="default"
          icon={<DeleteOutlined />}
          danger
          onClick={() => onRemove(movie.id)}
          block
        >
          წაშლა ფავორიტებიდან
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<StarOutlined />}
          onClick={addToFavorites}
          block
        >
          ფავორიტებში
        </Button>
      )}
    </Card>
  );
}
