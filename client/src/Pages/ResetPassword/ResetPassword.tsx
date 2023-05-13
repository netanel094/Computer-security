import React, { FC, useState } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
} from './ResetPassword.style';

const ChangePassword: FC = () => {
  const [hashedValue, setHashedValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setIsValid(false);
    } else {
      // handle form submission
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Value from email"
          value={hashedValue}
          onChange={(event) => setHashedValue(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
          required
        />
        {!isValid && <ErrorMessage>Passwords do not match</ErrorMessage>}
        <Button type="submit">Change Password</Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
