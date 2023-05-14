import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  Form,
  Label,
  Input,
  Button,
  Container,
  Title,
} from './ForgotPassword.style';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('https://localhost:8080/api/userforgotpasssword', { email })
      .then(() => {
        toast.success('The email has been sent please check');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response?.data);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Container>
      <Title>Forgot Password</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email address"
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
