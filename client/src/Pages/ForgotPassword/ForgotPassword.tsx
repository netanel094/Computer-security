import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Label,
  Input,
  Button,
  ErrorMessage,
  Container,
  Title,
  SuccessMessage,
  FailureMessage,
} from './ForgotPassword.style';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      setSubmitStatus('failure');
    } else {
      setEmailError(false);
      setSubmitStatus('success');
      axios.post('/api/userforgotpassword');
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email: string) => {
    // email validation logic
    return true;
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
        />
        {emailError && <ErrorMessage>Please enter a valid email</ErrorMessage>}
        {submitStatus === 'success' && (
          <SuccessMessage>
            Temporary password sent to your email. Please check your mailbox.
          </SuccessMessage>
        )}
        {submitStatus === 'failure' && (
          <FailureMessage>The email you entered is not valid.</FailureMessage>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
