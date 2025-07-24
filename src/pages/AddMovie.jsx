// src/pages/AddMovie.jsx

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const { Title } = Typography;

export default function AddMovie() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await api.post('/movies', {
        ...values,
        year: parseInt(values.year),
      });

      message.success('ფილმი წარმატებით დაემატა!');
      navigate('/');
    } catch (error) {
      console.error('ფილმის დამატება ვერ მოხერხდა:', error);
      message.error('შეცდომა დამატებისას');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#fff',
    }}>
      <Title level={3} style={{ textAlign: 'center' }}>➕ ფილმის დამატება</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="სათაური"
          name="title"
          rules={[{ required: true, message: 'შეიყვანე სათაური' }]}
        >
          <Input placeholder="მაგ: Inception" />
        </Form.Item>

        <Form.Item
          label="აღწერა"
          name="description"
          rules={[{ required: true, message: 'შეიყვანე აღწერა' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="წელი"
          name="year"
          rules={[{ required: true, message: 'შეიყვანე წელი' }]}
        >
          <Input type="number" placeholder="მაგ: 2010" />
        </Form.Item>

        <Form.Item
          label="ჟანრი"
          name="genre"
          rules={[{ required: true, message: 'შეიყვანე ჟანრი' }]}
        >
          <Input placeholder="მაგ: Sci-Fi" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            დამატება
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
