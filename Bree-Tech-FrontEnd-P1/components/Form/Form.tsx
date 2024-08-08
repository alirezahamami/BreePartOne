import React, { FormEvent, useState, useCallback } from 'react';
import countryList from 'react-select-country-list';
import { useFormState } from '../../hooks/useFormState';
import { FormField } from './FormField';
import { Modal } from './Modal';
import { submitForm } from '../../utils/api';

const Form: React.FC = () => {
  const countries = countryList().getData();
  const { fullName, setFullName, dob, setDob, country, setCountry } = useFormState();
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', result: [] });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
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
          value={fullName} onChange={(e) => setFullName(e.target.value)} 
          placeholder="John Doe" 
          required 
          disabled={loading} 
        />

        <FormField
          id="dob"
          label="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="DD/MM/YYYY"
          required
          disabled={loading}
          inputType="date"
        />

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            disabled={loading} // Disable the select when loading
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
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto block"
          disabled={loading} // Disable the button when loading
        >
          {loading ? 'Searching...' : 'Search'} &#128269;
        </button>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Please wait...</div>
        </div>
      )}

      {modalVisible && <Modal responseMessage={responseMessage} onClose={closeModal} />}
    </div>
  );
};

export default Form;
