// src/pages/Register.jsx

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/register', values);
      const token = response.data.token;

      localStorage.setItem('token', token);
      message.success('რეგისტრაცია წარმატებით დასრულდა!');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error('შეცდომა რეგისტრაციისას');
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
      <Title level={3} style={{ textAlign: 'center' }}>📝 რეგისტრაცია</Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="სახელი"
          name="name"
          rules={[{ required: true, message: 'შეიყვანე სახელი' }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="იმეილი"
          name="email"
          rules={[{ required: true, message: 'შეიყვანე იმეილი' }]}
        >
          <Input prefix={<MailOutlined />} type="email" />
        </Form.Item>

        <Form.Item
          label="პაროლი"
          name="password"
          rules={[{ required: true, message: 'შეიყვანე პაროლი' }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          label="გაიმეორე პაროლი"
          name="password_confirmation"
          dependencies={['password']}
          rules={[
            { required: true, message: 'გაიმეორე პაროლი' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('პაროლები არ ემთხვევა'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            რეგისტრაცია
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
