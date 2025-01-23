import { Dispatch, SetStateAction } from 'react';
import { Customer } from '../page'; // Adjust the path as needed

interface CustomerFormProps {
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  customer: Customer | null;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ setCustomer, customer }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer: any) => ({
      ...prevCustomer!,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Customer Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={customer?.name || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Customer Email"
        value={customer?.email || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Customer Phone"
        value={customer?.phone || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
    </div>
  );
};

export default CustomerForm;
