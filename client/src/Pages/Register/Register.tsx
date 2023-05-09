import React, { FC, useState } from 'react';
import { Container, Form, Input, ErrorMessage, Button } from './Register.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  // const test = async () => {
  //   const response = await axios.get('https://localhost:8080/api/test');
  //   console.log(response);
  // };

  // window.test = test;

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit started!');
    if (password !== repeatPassword) {
      return setIsValid(false);
    }
    console.log('repeat password valid');

    if (!validateEmail(email)) return setIsValid(false);
    console.log('email passed');

    if (!validatePhone(phoneNumber)) return setIsValid(false);
    console.log('phone number passed');

    if (!validatePassword(password)) return setIsValid(false);
    console.log('password passed');

    axios
      .post('https://localhost:8080/api/adduser', {
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        city: address,
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
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
        {message}
      </Form>
    </Container>
  );
};

export default Register;
