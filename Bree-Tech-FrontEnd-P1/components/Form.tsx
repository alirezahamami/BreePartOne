import React, { useState, FormEvent, ChangeEvent } from 'react';
import countryList from 'react-select-country-list';
import axios from 'axios';

interface Country {
  label: string;
  value: string;
}

interface ResponseMessage {
  message: string;
  result?: any[]; // Replace 'any' with a more specific type if you know the structure of result
}

const Form: React.FC = () => {
  const countries: Country[] = countryList().getData();
  const [fullName, setFullName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({ message: '', result: [] });

  const API_BASE_URL = 'https://breepartone.onrender.com/api/SSA' || 'http://localhost:3000/api/SSA';


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL, {
        fullName,
        dob,
        country
      });
      console.log(response.data); // Logs the response from the backend
      if (response.data.message === "Clear") {
        setModalVisible(true);
        setResponseMessage(response.data);
      } else {
        setModalVisible(true);
        setResponseMessage(response.data);
      }

    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleDobChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const closeModal = () => {
    setModalVisible(false);
    setResponseMessage({ message: '' });
    setFullName("");
    setDob("");
    setCountry("");
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg bg-gray-100"
        aria-labelledby="formTitle"
      >
        <h1 id="formTitle" className="text-2xl font-bold mb-6 text-gray-900">Screening Form</h1>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="John Doe"
            required
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="text"
            id="dob"
            placeholder="DD/MM/YYYY"
            value={dob}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            onChange={handleDobChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            aria-required="true"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto block"
        >
          Search!
        </button>
      </form>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">

            {responseMessage.message == 'Clear' && <><h2 className="text-xl font-bold mb-3 text-gray-900 text-center">&#10003; {responseMessage.message}</h2> <p className="mb-4 text-gray-700 text-center">You are approved!</p></>}
            {responseMessage.message === 'Hit' && (
              <>
                <h2 className="text-xl font-bold mb-3 text-gray-900 text-center">{responseMessage.message}</h2>
                <p className="mb-4 text-gray-700 text-center">You are not approved!</p>
                <div className="flex justify-end">

                  {responseMessage?.result && (
                    <div className="flex justify-end">
                    {['Name', 'DOB', 'Country'].map((item) => (
                      <div key={item} className="ml-4 mb-4">
                        <p>
                          {responseMessage.result && responseMessage.result.includes(item) ? '✅' : '❌'} {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              </>
            )}
            <button
              onClick={closeModal}
              className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto block"
            >
              Back to the form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
