import styled from 'styled-components';
import AppBackground from '../../assets/img/AppBackground.png';

export const Container = styled.div`
  height: 100vh;
  background-image: url(${AppBackground});
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 10px;
`;

export const FailureMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
