import styled, { css, keyframes } from 'styled-components';
import AppBackground from '../../assets/img/AppBackground.png';
import { redirect, Link } from 'react-router-dom';

export const FormContainer = styled.div`
  background-image: url(${AppBackground});
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  display: 'flex';
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background: #fff;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled.div`
  height: 200px;
  justify-content: center;
  align-items: center;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #f2f2f2;

  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid red;
    `}
`;

export const ErrorText = styled.p`
  color: red;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2f55d4;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
  }
`;

export const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  color: #2f55d4;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const RegisterLink = styled(Link)`
  margin-top: 20px;
  color: #2f55d4;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const CheckBoxLabel = styled.label`
  margin-left: 10px;
`;

export const CheckBoxInput = styled.input`
  margin-right: 10px;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const AnimatedForm = styled(Form)`
  animation: ${fadeIn} 0.5s ease-in-out;
`;
