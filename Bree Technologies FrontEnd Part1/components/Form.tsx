import React, { useState, FormEvent, ChangeEvent } from 'react';
import countryList from 'react-select-country-list';

interface Country {
  label: string;
  value: string;
}

const Form: React.FC = () => {
  const countries: Country[] = countryList().getData();
  const [fullName, setFullName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ fullName, dob, country });
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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg bg-gray-100" 
        aria-labelledby="formTitle"
      >
        <h1 id="formTitle" className="text-2xl font-bold mb-6 text-gray-900">User Screening Form</h1>

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
            placeholder="MM/DD/YYYY"
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
