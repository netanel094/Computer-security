import styled from "styled-components";
import AppBackground from '../../assets/img/AppBackground.png';

interface InputProps {
  isInvalid?: boolean;
}

export const Container = styled.div`
  background-image: url(${AppBackground});
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

export const Input = styled.input<InputProps>`
  margin: 10px 0;
  padding: 10px;
  border: ${({ isInvalid }) =>
    isInvalid ? "1px solid red" : "1px solid #ccc"};
  border-radius: 5px;
  outline: none;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3c78d8;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;