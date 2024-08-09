import React, { FormEvent, useState, useCallback } from 'react';
import countryList from 'react-select-country-list';
import { useFormState } from '../../hooks/useFormState';
import { FormField } from './FormField';
import { Modal } from './Modal';
import { submitForm } from '../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  

const Form: React.FC = () => {
  // Get the list of countries for the select dropdown
  const countries = countryList().getData();

  // Custom hook to manage form state
  const { fullName, setFullName, dob, setDob, country, setCountry } = useFormState();

  // State to control modal visibility and response message
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', result: [] });
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true); // Set loading state to true to display please wait message
      try {
        const response = await submitForm({ fullName, dob, country });
        setModalVisible(true); 
        setResponseMessage(response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false); 
      }
    },
    [fullName, dob, country] 
  );

  
  const handleFullNameChange = (value: string) => {
    setFullName(value);
  };

  
  const handleDobChange = (date: Date | null) => {
    if (date) {
      setDob(date.toISOString().split('T')[0]); // Convert date to YYYY-MM-DD format
    } else {
      setDob(''); // Handle null case
    }
  };

  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  // Close the modal and reset form fields
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setResponseMessage({ message: '', result: [] });
    setFullName('');
    setDob('');
    setCountry('');
  }, [setFullName, setDob, setCountry]);

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-white p-6 rounded-lg shadow-lg bg-gray-100 z-10 ${loading ? 'opacity-50' : ''}`}
        aria-labelledby="formTitle"
      >
        <h1 id="formTitle" className="text-2xl font-bold mb-6 text-gray-900">
          Screening Form
        </h1>

        <FormField
          id="fullName"
          label="Full Name"
          value={fullName}
          onChange={handleFullNameChange}  
          placeholder="John Doe"
          required
          disabled={loading}
        />

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <DatePicker
            id="dob"
            selected={dob ? new Date(dob) : null}
            onChange={handleDobChange} 
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-dd"
            showYearDropdown
            showMonthDropdown 
            dropdownMode="select" 
            yearDropdownItemNumber={15} // Optional: Show 15 years at a time
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={loading} 
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            disabled={loading} 
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        
        <button
          type="submit"
          className={`w-1/2 bg-blue-500 text-white py-2 pr-0 rounded-md 
                      shadow-2xl hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                      mx-auto block transition-transform duration-200 ease-out
                      border-2 border-gray-800
                  ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={loading} // Disable button when loading
        >
          {loading ? '' : 'Search'} &#128269;
        </button>
      </form>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Please wait...</div>
        </div>
      )}

      {/* Modal for response message */}
      {modalVisible && <Modal responseMessage={responseMessage} onClose={closeModal} />}
    </div>
  );
};

export default Form;
