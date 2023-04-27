import React, { FC, useState } from "react";
import { 
  FormContainer,
  FormWrapper,
  FormTitle,
  AnimatedForm,
  FormInput,
  HeaderWrapper,
  ErrorText,
  Button,
  CheckBoxWrapper,
  CheckBoxInput,
  CheckBoxLabel,
  LinkButton
 } from "./Login.style"
import Lottie from 'lottie-react'
import animationData from '../../assets/lottie/helloLogin.json';


const Login : FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please enter username and password');
    } else {
      setError('');
      console.log(`Submitted username: ${username}, password: ${password}, rememberMe: ${rememberMe}`);
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password button clicked');
  };

  return (
    <FormContainer>
      <FormWrapper>
      <Lottie animationData={animationData} style={{ width: "40%", margin: "auto", height: "30%" }}/>
        <AnimatedForm onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <CheckBoxWrapper>
            <CheckBoxInput
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <CheckBoxLabel htmlFor="rememberMe">Remember me</CheckBoxLabel>
          </CheckBoxWrapper>
          <Button type="submit">Login</Button>
        </AnimatedForm>
        <LinkButton onClick={handleForgotPassword}>Forgot password?</LinkButton>
      </FormWrapper>
    </FormContainer>
  );
}

export default Login;