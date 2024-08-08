import React, { FormEvent, useState, useCallback } from 'react';
import countryList from 'react-select-country-list';
import { useFormState } from '../../hooks/useFormState';
import { FormField } from './FormField';
import { Modal } from './Modal';
import { submitForm } from '../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Import date picker styles

const Form: React.FC = () => {
  // Get the list of countries for the select dropdown
  const countries = countryList().getData();

  // Custom hook to manage form state
  const { fullName, setFullName, dob, setDob, country, setCountry } = useFormState();

  // State to control modal visibility and response message
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', result: [] });
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent default form submission
      setLoading(true); // Set loading state to true
      try {
        // Submit the form data and handle the response
        const response = await submitForm({ fullName, dob, country });
        setModalVisible(true); // Show the modal with response message
        setResponseMessage(response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false); // Reset loading state
      }
    },
    [fullName, dob, country] // Dependencies for useCallback
  );

  // Update fullName state
  const handleFullNameChange = (value: string) => {
    setFullName(value);
  };

  // Update date of birth state, converting date to 'YYYY-MM-DD' format
  const handleDobChange = (date: Date | null) => {
    if (date) {
      setDob(date.toISOString().split('T')[0]); // Convert date to YYYY-MM-DD format
    } else {
      setDob(''); // Handle null case
    }
  };

  // Update country state
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

        {/* Full Name field */}
        <FormField 
          id="fullName" 
          label="Full Name" 
          value={fullName} 
          onChange={handleFullNameChange}  // Handle text input change
          placeholder="John Doe" 
          required 
          disabled={loading} 
        />

        {/* Date of Birth field */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <DatePicker
            id="dob"
            selected={dob ? new Date(dob) : null}
            onChange={handleDobChange} // Handle date change
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-dd"
            showYearDropdown // Enable year dropdown
            showMonthDropdown // Enable month dropdown
            dropdownMode="select" // Use 'select' dropdown mode for both month and year
            yearDropdownItemNumber={15} // Optional: Show 15 years at a time
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={loading} // Disable date picker when loading
            required
          />
        </div>

        {/* Country select dropdown */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange} // Handle country select change
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            disabled={loading} // Disable select dropdown when loading
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          // className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto block"
          className={`w-1/2 bg-blue-500 text-white py-2 px-6 rounded-md 
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
