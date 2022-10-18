import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { useGetProductsQuery } from '../redux/query/mechakuAPI';
import { ErrorMessage, Product, GridLoadingSpinner } from '../components/ExploreComponents';

const ShopPage = () => {
  const { data, isFetching, error } = useGetProductsQuery();

  if (error) return <ErrorMessage message="Something went wrong to display products" />;

  return (
    <>
      <Helmet>
        <title>Mechaku | Shop</title>
      </Helmet>
      <div className="mb-[100px] select-none">
        <div className="flex items-center px-16 lg:px-28 2xl:px-40 py-16 bg-[#F9FAFF]">
          <div className="breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <p className="font-medium">Shop</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-5 px-10 sm:px-14 lg:px-16 2xl:px-28">
          <h2 className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-zinc-700">List of Mecha</h2>
        </div>

        {isFetching && <GridLoadingSpinner />}

        <div className="px-4 sm:px-14 lg:px-16 2xl:px-28">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
            {data?.data.map((item) => (
              <Product
                key={item?._id}
                id={item?._id}
                image={item?.details?.images[0]}
                name={item?.name}
                price={item?.details?.price}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default ShopPage;
