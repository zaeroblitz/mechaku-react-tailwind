import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { GridLoadingSpinner, CartItem, CartTotalPrice } from '../components/ExploreComponents';

const CartPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { grandTotal } = useSelector((state) => state.cartTotal);
  const { data: cartData, loading: cartDataLoading } = useSelector((state) => state.cart);

  if (_.isEmpty(auth.user)) {
    navigate('/');
  }

  if (cartDataLoading) return <GridLoadingSpinner />;

  if (!_.isEmpty(cartData)) {
    return (
      <>
        <Helmet>
          <title>Mechaku | Cart</title>
        </Helmet>
        <div className="mb-[100px] select-none">
          {/* Breadcrumb */}
          <div className="flex items-center px-16 lg:px-28 2xl:px-40 py-16 bg-[#F9FAFF]">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <p className="font-medium">Carts</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Table */}
          <div className="px-8 md:px-12 mt-12">
            <div className="overflow-x-auto w-full rounded-2xl shadow-2xl shadow-black/10">
              <table className="table w-full bg-white">
                <thead>
                  <tr>
                    <th className="pr-5">
                      <input type="checkbox" className="checkbox" disabled />
                    </th>
                    <th>Product</th>
                    <th className="text-center">Amount</th>
                    <th className="pl-5">Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.items?.length !== 0 && cartData?.items?.map((item) => (
                    <CartItem key={item?._id} item={item} />
                  ))}

                  {cartData?.items.length === 0 && (
                    <tr>
                      <td colSpan="5">
                        <p className="text-center text-sm text-zinc-500">No items, in your cart. You can explore shop to buy product.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Total Price & Continue Button */}
          <div className="w-full flex md:flex-row-reverse">
            <div className="flex flex-col items-start md:items-end mx-8 md:mx-12">
              <CartTotalPrice />
              {grandTotal > 0 && (
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-[320px] md:w-[420px] bg-emerald-500 text-white text-center rounded-2xl px-6 py-3 mt-8"
                >
                  Continue to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div />
  );
};

export default CartPage;
