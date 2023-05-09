import axios from 'axios';
import { useEffect, useState } from 'react';

interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
}

interface useCustomerType {
  sortBy: keyof Customer;
  sortOrder: 'asc' | 'desc';
}

function useCustomers({ sortBy, sortOrder }: useCustomerType) {
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [search, setSearch] = useState<String>('');
  const fetch = () => {
    axios
      .post('https://localhost:8080/api/searchtable', {
        search_string: search,
        sortBy,
        sortOrder,
      })
      .then((res) => {
        setCustomers(res.data);
      });
  };
  const deleteCustomer = (email: String) => {
    axios
      .delete('https://localhost:8080/api/removeclient', {
        data: { email },
      })
      .then(fetch);
  };
  useEffect(fetch, [search, sortBy, sortOrder]);
  return { customers, setSearch, deleteCustomer };
}

export default useCustomers;
