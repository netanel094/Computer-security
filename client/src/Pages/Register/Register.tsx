import React, { FC, useState } from "react";
import {
  Container,
  Form,
  Input,
  ErrorMessage,
  Button,
  PasswordRequirements
} from './Register.style'

const Register: FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return re.test(password);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setIsValid(false);
      return;
    }

    if (!validateEmail(email) || !validatePhone(phoneNumber) || !validatePassword(password)) {
      setIsValid(false);
      return;
    }

    // handle form submission
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
          isInvalid={!isValid || !validatePhone(phoneNumber)}
        />
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          isInvalid={!isValid || !validateEmail(email)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          isInvalid={!isValid || !validatePassword(password)}
        />
        {/* <PasswordRequirements>at least 8 characters and at least one uppercase letter and one special character</PasswordRequirements> */}
        <Input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          required
          isInvalid={!isValid || password !== repeatPassword}
        />
        {!isValid && <ErrorMessage>Please fix the errors above</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
}

export default Register;