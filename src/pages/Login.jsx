// src/pages/Login.jsx

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/login', values);
      const token = response.data.token;

      localStorage.setItem('token', token);
      message.success('წარმატებით შედით!');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error('შეცდომა! შეამოწმეთ იმეილი ან პაროლი.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#fff',
    }}>
      <Title level={3} style={{ textAlign: 'center' }}>🔑 შესვლა</Title>
      
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="იმეილი"
          name="email"
          rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ იმეილი' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="პაროლი"
          name="password"
          rules={[{ required: true, message: 'შეიყვანე პაროლი' }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            შესვლა
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
