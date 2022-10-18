import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center mt-[100px]">
    <p className="text-slate-600">
      {message || 'Something went wrong'}
    </p>
  </div>
);

export default ErrorMessage;
