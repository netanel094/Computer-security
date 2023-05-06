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
  LinkButton,
  RegisterLink
 } from "./Login.style"
import Lottie from 'lottie-react'
import { useNavigate } from "react-router-dom";
import animationData from '../../assets/lottie/helloLogin.json';


const Login : FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please enter username and password');
    } else {
      setError('');
      navigate("/System")
      // fetch
      // in the fetch use navigate("/System") if the login is succ
      
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password button clicked');
    navigate("/ForgotPassword");
    
  };

  const handleRegister = () => {
    navigate("/RegisterPage");
  }

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
        <LinkButton>
          <RegisterLink onClick={handleRegister}>Don't have an account? press here</RegisterLink>
        </LinkButton>
      </FormWrapper>
    </FormContainer>
  );
}

export default Login;