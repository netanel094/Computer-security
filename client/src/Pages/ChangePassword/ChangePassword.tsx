import React, { FC, useState } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
} from './ChangePassword.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword: FC = () => {
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) {
      return setIsValid(false);
    }
    axios
      .post('https://localhost:8080/api/changepassword', data)
      .then(() => {
        toast.success('Password changed succesfully');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" name="email" required />
        <Input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          required
        />
        <Input
          type="password"
          placeholder="New Password"
          name="newPassword"
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          name="confirmNewPassword"
          required
          isInvalid={!isValid}
        />
        {!isValid && <ErrorMessage>Passwords do not match</ErrorMessage>}
        <Button type="submit">Change Password</Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
