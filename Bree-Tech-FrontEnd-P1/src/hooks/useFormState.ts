import { useState } from 'react';

export const useFormState = () => {
  const [fullName, setFullName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  return {
    fullName,
    setFullName,
    dob,
    setDob,
    country,
    setCountry,
  };
};
