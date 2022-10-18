import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage, GridLoadingSpinner, ProductItemAmount } from '../components/ExploreComponents';
import { useGetSelectedProductQuery } from '../redux/query/mechakuAPI';
import ProductGallery from '../components/ExploreComponents/ProductGallery';
import { fetchAddCartItem } from '../redux/features/cart/cartSlice';

const ProductTag = ({ label }) => (
  <div className="bg-slate-200 rounded-full px-4 py-3 cursor-default">
    <p className="text-zinc-700">{label}</p>
  </div>
);

const DetailPage = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data: productData, isFetching, error } = useGetSelectedProductQuery(id);
  const product = productData?.data;

  const handleMinusItemAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handlePlusItemAmount = () => {
    if (amount < product?.details?.quantity) {
      setAmount(amount + 1);
    }
  };

  const handleAddCartItem = () => {
    const cartItemData = {
      token: auth?.token,
      data: {
        user: auth?.user?.id,
        product: id,
        amount,
      },
    };

    dispatch(fetchAddCartItem(cartItemData));
  };

  if (isFetching) return <GridLoadingSpinner />;

  if (error) return <ErrorMessage message="Something went wrong to show product detail data. Please try again." />;

  return (
    <>
      <Helmet>
        <title>Mechaku | {product?.name}</title>
      </Helmet>
      <div className="mb-[100px] select-none">
        <div className="flex items-center px-16 lg:px-28 2xl:px-40 py-16 bg-[#F9FAFF]">
          <Link to="/" className="mr-2 text-zinc-600">
            Home <span className="ml-2">/</span>
          </Link>

          <Link to="/shop" className="ml-2 text-zinc-600">
            Shop
          </Link>

          <p className="font-bold text-zinc-600 ml-3">/ <span className="ml-2">Detail</span></p>
        </div>
        <div className="mt-20 px-10 sm:px-14 lg:px-16 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Gallery  */}
            <ProductGallery images={product?.details?.images} />

            {/* Product Details */}
            <div className="flex flex-col bg-slate-50 rounded-3xl px-8 py-10 h-fit">
              <p className="font-bold text-2xl lg:text-3xl text-zinc-700">{product?.name}</p>
              <NumericFormat
                displayType="text"
                prefix="Rp. "
                decimalSeparator=","
                thousandSeparator="."
                className="font-semibold text-2xl lg:text-3xl text-emerald-500 mt-6"
                value={product?.details?.price}
              />
              <div className="flex flex-wrap mt-10 gap-3">
                <ProductTag label={product?.category?.name} />
                <ProductTag label={product?.grade?.name} />
                <ProductTag label={product?.brand?.name} />
              </div>
              <div className="flex flex-col mt-8">
                <p className="font-semibold text-zinc-800">About the product</p>
                <p className="text-zinc-600 leading-10">{product?.details?.description}</p>
              </div>
              <div className="flex items-center justify-center gap-5 mt-[30px]">
                <ProductItemAmount action="minus" actionOnClick={handleMinusItemAmount} />
                <p className="text-zinc-600 text-xl">{amount}</p>
                <ProductItemAmount action="plus" actionOnClick={handlePlusItemAmount} />
                <p className="text-zinc-500">{product?.details?.quantity} item left</p>
              </div>
              <div className="flex items-center justify-center gap-8 mt-[30px]">
                <button
                  type="button"
                  onClick={() => handleAddCartItem()}
                  className="bg-[#e7eaf5] text-slate-800 hover:bg-[#f3f3fd] px-5 sm:px-8 py-3 sm:py-4 rounded-xl duration-300"
                >
                  Add to Cart
                </button>
                <button type="button" className="bg-[#4D17E2] text-white hover:bg-[#695de9] px-5 sm:px-8 py-3 sm:py-4 rounded-xl duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
