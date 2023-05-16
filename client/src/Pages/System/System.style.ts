import styled from "styled-components";
import AppBackground from "../../assets/img/AppBackground.png";

export const SystemContainer = styled.div`
  background-image: url(${AppBackground});
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: repeat;
`;

export const WelcomeText = styled.h1`
  font-size: 2em;
  margin-bottom: 21px;
  color: #fff;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchBar = styled.input`
  width: 40%;
  padding: 10px;
  display: flex;
  align-self: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
    color: #fff;
  }

  th {
    font-weight: bold;
    color: #fff;
  }
`;

export const SortButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background-color: ${({ active }) => (active ? "#000" : "transparent")};
  border: none;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #000;
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

export const Button = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  margin-left: 20px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
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

  @media screen and (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    padding: 30px;
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
