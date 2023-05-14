import React, { useState } from 'react';
import {
  SystemContainer,
  WelcomeText,
  SearchBar,
  Table,
  SortButton,
  DeleteButton,
  Button,
  AddCustomerModal,
  AddCustomerModalButtons,
  Container,
} from './System.style';
import useCustomers from '../../hooks/useCustomers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ButtonLink } from '../Login/Login.style';

interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
}

const System = () => {
  const [sortBy, setSortBy] = useState<keyof Customer>('first_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { customers, setSearch, deleteCustomer, refetchCustomers } =
    useCustomers({
      sortBy,
      sortOrder,
    });
  const [newCustomer, setNewCustomer] = useState<Customer>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: '',
  });
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleAddCustomer = () => {
    //setCustomers([...customers, newCustomer]);
    axios
      .post('https://localhost:8080/api/addclient', newCustomer)
      .then(refetchCustomers)
      .catch((error) => {
        toast.error(error.response.data);
      });
    setNewCustomer({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      city: '',
    });
    setShowAddCustomer(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SystemContainer>
      <WelcomeText>Hello, User</WelcomeText>
      <Container>
        <SearchBar
          type="text"
          placeholder="Search customers..."
          onChange={handleSearch}
        />

        <ButtonLink to="/ChangePassword">Change Password</ButtonLink>
        <Button onClick={() => setShowAddCustomer(true)}>Add Customer</Button>
      </Container>

      <Table>
        <thead>
          <tr>
            <th>
              <SortButton
                active={sortBy === 'first_name'}
                onClick={() => {
                  if (sortBy === 'first_name') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('first_name');
                    setSortOrder('asc');
                  }
                }}
              >
                Name{' '}
                {sortBy === 'first_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'last_name'}
                onClick={() => {
                  if (sortBy === 'last_name') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('last_name');
                    setSortOrder('asc');
                  }
                }}
              >
                Last Name{' '}
                {sortBy === 'last_name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'email'}
                onClick={() => {
                  if (sortBy === 'email') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('email');
                    setSortOrder('asc');
                  }
                }}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'phone_number'}
                onClick={() => {
                  if (sortBy === 'phone_number') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('phone_number');
                    setSortOrder('asc');
                  }
                }}
              >
                phone Number{' '}
                {sortBy === 'phone_number' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'city'}
                onClick={() => {
                  if (sortBy === 'city') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('city');
                    setSortOrder('asc');
                  }
                }}
              >
                Address {sortBy === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.city}</td>
              <td>
                <DeleteButton onClick={() => deleteCustomer(customer.email)}>
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showAddCustomer && (
        <AddCustomerModal>
          <h2>Add Customer</h2>
          <input
            type="text"
            name="first_name"
            placeholder="Name"
            value={newCustomer.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={newCustomer.last_name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={newCustomer.phone_number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Address"
            value={newCustomer.city}
            onChange={handleInputChange}
          />
          <AddCustomerModalButtons>
            <button onClick={() => setShowAddCustomer(false)}>Cancel</button>
            <button onClick={handleAddCustomer}>Add</button>
          </AddCustomerModalButtons>
        </AddCustomerModal>
      )}
    </SystemContainer>
  );
};

export default System;
