import styled from 'styled-components';
import AppBackground from '../../assets/img/AppBackground.png';
import { AiOutlineSearch } from 'react-icons/ai';

export const SystemContainer = styled.div`
  background-image: url(${AppBackground});
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WelcomeText = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

export const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    font-weight: bold;
  }
`;

export const SortButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ active }) => (active ? '#eee' : 'transparent')};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

export const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export const AddCustomerButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const AddCustomerModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;

  h2 {
    margin-top: 0;
  }

  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }
`;

export const AddCustomerModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;

    &:first-child {
      background-color: #e74c3c;
    }
  }
`;