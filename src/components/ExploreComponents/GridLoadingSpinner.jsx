import React from 'react';
import { GridLoader } from 'react-spinners';

const GridLoadingSpinner = () => (
  <div className="flex justify-center items-center my-[100px]">
    <GridLoader size={24} color="#8758FF" />;
  </div>
);

export default GridLoadingSpinner;
