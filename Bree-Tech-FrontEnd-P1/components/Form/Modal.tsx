import React from 'react';

interface ModalProps {
  responseMessage: {
    message: string;
    result?: string[];
  };
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ responseMessage, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    {/* Modal container with dark overlay */}
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
      {/* Check if the message is 'Clear' to display approval message */}
      {responseMessage.message === 'Clear' ? (
        <>
          <h2 className="text-xl font-bold mb-3 text-gray-900 text-center">
            {/* Display a checkmark for approved status */}
            &#10003; {responseMessage.message}
          </h2>
          <p className="mb-4 text-gray-700 text-center">You are approved!</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-3 text-gray-900 text-center">
            {/* Display the response message */}
            {responseMessage.message}
          </h2>
          <p className="mb-4 text-gray-700 text-center">You are not approved!</p>
          <div className="flex justify-end">
            {/* Display checkmarks or crosses based on the result array */}
            {['Name', 'DOB', 'Country'].map((item) => (
              <div key={item} className="ml-4 mb-4">
                <p>
                  {/* Show ✅ for items in the result, ❌ for others */}
                  {responseMessage.result?.includes(item) ? '✅' : '❌'} {item}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <button
        onClick={onClose}
        className="w-1/2 bg-blue-500 text-white py-2 pr-0 rounded-md 
                      shadow-2xl hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                      mx-auto block transition-transform duration-200 ease-out
                      border-2 border-gray-800"
      >
        {/* Button to close the modal */}
        Ok
      </button>
    </div>
  </div>
);
