import React from 'react';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from './ErrorMessage';
import { logoWhite } from '../../assets/icons';
import { useGetProductsQuery } from '../../redux/query/mechakuAPI';

const FeaturedProduct = () => {
  const { data, isFetching, error } = useGetProductsQuery();
  const navigate = useNavigate();

  if (isFetching) {
    return (
      <div className="flex justify-center items-center mt-[100px]">
        <PuffLoader size={120} color="#576F72" />;
      </div>
    );
  }

  if (error) return <ErrorMessage message="Something went wrong to display featured product" />;

  return (
    <div className="flex flex-col mt-[100px] px-12 2xl:px-28">
      <h4 className="font-bold text-2xl md:text-3xl text-zinc-700">Our Featured <br /> Mecha This Year</h4>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.data.slice(0, 5).map((item) => (
          <div
            key={item?._id}
            className="relative h-[320px] 2xl:h-[380px] rounded-3xl overflow-hidden group duration-300 hover:border-[6px] hover:border-zinc-700 hover:cursor-pointer"
            onClick={() => navigate(`/detail/${item?._id}`)}
          >
            <div className="overflow-hidden group-hover:m-3 rounded-3xl">
              <img
                src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item?.details?.images[0]}`}
                alt={`${item?.name} thumbnail`}
                className="w-full h-[320px] 2xl:h-[380px] object-cover bg-center bg-no-repeat rounded-3xl duration-300
              group-hover:blur-2xl group-hover:h-[282px] group-hover:2xl:h-[342px]"
              />
            </div>
            <div className="w-full hidden group-hover:block absolute bottom-8 px-6">
              <div className="flex flex-col">
                <img
                  src={logoWhite}
                  alt="logo"
                  className="w-20 h-20 object-cover mx-auto"
                />
                <div className="mt-[50px]">
                  <p className="font-semibold text-xl text-white line-clamp-2">{item?.name}</p>
                  <p className="font-medium text-sm text-white mt-2">{item?.category?.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
