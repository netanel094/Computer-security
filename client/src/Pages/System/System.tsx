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
     Container } from './System.style'

interface Customer {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const initialCustomers: Customer[] = [
  {
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '555-1234',
    address: '123 Main St'
  },
  {
    name: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    phoneNumber: '555-5678',
    address: '456 Maple Ave'
  }
];

const System = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<keyof Customer>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value
    });
  };

  
  const handleAddCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setNewCustomer({
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: ''
    });
    setShowAddCustomer(false);
  };

  const handleDeleteCustomer = (index: number) => {
    const newCustomers = [...customers];
    newCustomers.splice(index, 1);
    setCustomers(newCustomers);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const compare = a[sortBy].localeCompare(b[sortBy]);
    return sortOrder === 'asc' ? compare : -compare;
  });

  return (
    <SystemContainer>
      <WelcomeText>Hello, User</WelcomeText>
      <Container>

        <SearchBar
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button onClick={() => setChangePassword(true)}>Change Password</Button>
        <Button onClick={() => setShowAddCustomer(true)}>Add Customer</Button>

      </Container>
      <Table>
        <thead>
          <tr>
            <th>
              <SortButton
                active={sortBy === 'name'}
                onClick={() => {
                  if (sortBy === 'name') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('name');
                    setSortOrder('asc');
                  }
                }}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'lastName'}
                onClick={() => {
                  if (sortBy === 'lastName') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('lastName');
                    setSortOrder('asc');
                  }
                }}>
                Last Name {sortBy === 'lastName' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                active={sortBy === 'phoneNumber'}
                onClick={() => {
                  if (sortBy === 'phoneNumber') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('phoneNumber');
                    setSortOrder('asc');
                  }
                }}>
                phone Number {sortBy === 'phoneNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th>
              <SortButton
                active={sortBy === 'address'}
                onClick={() => {
                  if (sortBy === 'address') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('address');
                    setSortOrder('asc');
                  }
                }}>
                Address {sortBy === 'address' && (sortOrder === 'asc' ? '↑' : '↓')}
              </SortButton>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.address}</td>
              <td>
                <DeleteButton onClick={() => handleDeleteCustomer(index)}>Delete</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
        {showAddCustomer && (
            <AddCustomerModal>
            <h2>Add Customer</h2>
            <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={newCustomer.lastName} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={newCustomer.phoneNumber} onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" value={newCustomer.address} onChange={handleInputChange} />
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