import { Dispatch, SetStateAction, useState } from 'react';
import { Customer } from '../page';

interface CustomerFormProps {
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  customer: Customer | null;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ setCustomer, customer }) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateField = (name: string, value: string) => {
    switch(name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        return !/^\d{10}$/.test(value.replace(/\D/g, '')) ? 'Phone must be 10 digits' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({...prev, [name]: error}));
    
    setCustomer((prevCustomer: any) => ({
      ...prevCustomer!,
      [name]: value,
    }));
  };

  const inputFields = [
    { 
      name: 'name', 
      type: 'text', 
      placeholder: 'Customer Name',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'email', 
      type: 'email', 
      placeholder: 'Customer Email',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    { 
      name: 'phone', 
      type: 'tel', 
      placeholder: 'Customer Phone',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl -mx-6 -mt-6 p-6 mb-6">
        <h2 className="text-2xl font-bold">Customer Details</h2>
      </div>
      
      <div className="space-y-4">
        {inputFields.map(({ name, type, placeholder, icon }) => (
          <div key={name}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={customer?.[name as keyof Customer] || ''}
                onChange={handleChange}
                className={`
                  w-full p-3 pl-10 border-2 rounded-lg 
                  focus:outline-none focus:ring-2 
                  ${errors[name] 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }
                `}
              />
            </div>
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerForm;