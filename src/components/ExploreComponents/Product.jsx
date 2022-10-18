import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

const Product = ({ id, image, name, price }) => {
  const navigate = useNavigate();

  return (
    <div key={id} className="w-full bg-slate-50 px-4 py-3 md:px-8 md:py-6 rounded-2xl shadow-2xl shadow-black/10 hover:cursor-pointer group" onClick={() => navigate(`/detail/${id}`)}>
      <div className="w-full h-60 2xl:h-72 overflow-hidden rounded-2xl">
        <img
          src={`https://mechaku-server.zaerodev.my.id/uploads/products/${image}`}
          alt={`${name} thumbnail`}
          className="w-full h-60 2xl:h-72 object-cover bg-center bg-no-repeat rounded-2xl group-hover:scale-105 duration-300"
        />
      </div>
      <p className="mt-4 font-semibold md:text-lg text-zinc-700 line-clamp-2 mb-2">{name}</p>
      <NumericFormat
        displayType="text"
        prefix="Rp. "
        decimalSeparator=","
        thousandSeparator="."
        className="md:text-lg text-zinc-600"
        value={price}
      />
    </div>
  );
};

export default Product;
