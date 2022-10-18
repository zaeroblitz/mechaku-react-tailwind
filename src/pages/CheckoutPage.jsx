/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from 'lodash';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { NumericFormat } from 'react-number-format';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BsCheck2 } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useGetCouriersQuery, useGetPaymentsQuery } from '../redux/query/mechakuAPI';
import { CartTotalPrice, GridLoadingSpinner } from '../components/ExploreComponents';
import { createTransactionData } from '../redux/features/checkout/createTransactionSlice';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: couriersData, isFetching: couriersLoading } = useGetCouriersQuery();
  const { data: paymentsData, isFetching: paymentsLoading } = useGetPaymentsQuery();
  const { user } = useSelector((state) => state.auth);
  const { total, tax } = useSelector((state) => state.cartTotal);
  const { data: selectedCartData } = useSelector((state) => state.selectedCart);
  const { data: transactionData, loading: transactionLoading, error: transactionError } = useSelector((state) => state.createTransaction);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      user: user.id,
      address: shippingAddress,
      courier: selectedCourier,
      payment: selectedPayment,
      cartItems: selectedCartData.map((item) => item.itemId),
      products: selectedCartData.map((item) => item.productId),
      value: total,
      tax,
    };

    dispatch(createTransactionData(formData));
  };

  const showSweetAlert = () => {
    // Loading
    if (transactionLoading && !transactionError) {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait a moment',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }

    // Success
    if (!transactionLoading && !transactionError && transactionData.length !== 0) {
      Swal.fire({
        title: 'Success!',
        text: 'Berhasil melakukan transaksi!',
        icon: 'success',
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'OK!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
          window.location.reload();
        }
      });
    }

    // Error
    if (!transactionLoading && transactionError) {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK!',
      });
    }
  };

  if (couriersLoading || paymentsLoading) return <GridLoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Mechaku | Checkout</title>
      </Helmet>
      <div className="mb-[100px]">
        {/* Breadcrumb */}
        <div className="flex items-center px-12 lg:px-28 2xl:px-40 py-16 bg-[#F9FAFF]">
          <div className="breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/carts">Cart</Link>
              </li>
              <li>
                <p className="font-medium">Checkout</p>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="mx-8 lg:mx-24 mt-8">
          {/* Shipping Address */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="font-semibold text-zinc-700 text-xl md:text-2xl m-4">Shipping Address</h2>
            <div className="w-full bg-white rounded-2xl px-8 py-4 shadow-2xl shadow-black/10">
              <label htmlFor="address" className="flex flex-col">
                <p className="text-zinc-700 mb-2">Address</p>
                <textarea
                  name="textarea"
                  id="textarea"
                  cols="30"
                  rows="3"
                  className="textarea bg-slate-50"
                  placeholder="Type your address here..."
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Products Ordered */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="font-semibold text-zinc-700 text-xl md:text-2xl m-4">Products Ordered</h2>
            <div className="w-full overflow-x-auto rounded-2xl shadow-2xl shadow-black/10">
              <table className="w-full table rounded-2xl bg-white">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Item Price</th>
                    <th>Amount</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {!_.isEmpty(selectedCartData) && selectedCartData.map((item, index) => (
                    <tr key={item.itemId}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-5 overflow-hidden">
                          <img
                            src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item.thumbnail}`}
                            alt={item.name}
                            className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-xl"
                          />
                          <p className="max-w-[400px] truncate">{item.name}</p>
                        </div>
                      </td>
                      <td>
                        <NumericFormat
                          displayType="text"
                          prefix="Rp. "
                          decimalSeparator=","
                          thousandSeparator="."
                          value={item.price}
                        />
                      </td>
                      <td>{item.amount}</td>
                      <td>
                        <NumericFormat
                          displayType="text"
                          prefix="Rp. "
                          decimalSeparator=","
                          thousandSeparator="."
                          value={item.amount * item.price}
                          className="font-semibold text-emerald-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Couries */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="font-semibold text-zinc-700 text-xl md:text-2xl m-4">Couriers</h2>
            <div className="lg:w-fit bg-white px-8 py-10 rounded-2xl shadow-2xl shadow-black/10">
              <ul className="flex flex-wrap gap-5 items-center justify-center">
                {!_.isEmpty(couriersData.data) && (
                  couriersData?.data.map((courier, index) => (
                    <li key={index} className="relative">
                      <input
                        type="radio"
                        name="courier"
                        id={courier._id}
                        value={courier._id}
                        className="sr-only peer"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourier(e.target.value);
                          }
                        }}
                        required
                      />
                      <label
                        htmlFor={courier._id}
                        className="flex justify-center items-center p-5 w-[150px] bg-white border border-slate-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50
                    peer-checked:ring-violet-500 peer-checked:ring-2 peer-checked:border-transparent duration-300"
                      >
                        <img
                          src={`https://mechaku-server.zaerodev.my.id/uploads/couriers/${courier.thumbnail}`}
                          alt={courier.name}
                          className="w-[150px] object-cover"
                        />
                      </label>
                      <div className="absolute hidden w-full peer-checked:flex items-center justify-center -top-3 duration-300">
                        <div className="w-fit flex items-center justify-center bg-violet-700 text-white rounded-full p-1">
                          <BsCheck2 />
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Payments */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="font-semibold text-zinc-700 text-xl md:text-2xl m-4">Payments</h2>
            <div className="lg:w-fit bg-white px-8 py-10 rounded-2xl shadow-2xl shadow-black/10">
              <ul className="flex flex-wrap gap-5 items-center justify-center">
                {!_.isEmpty(paymentsData.data) && (
                  paymentsData?.data.map((payment, index) => (
                    <li key={index} className="relative">
                      <input
                        type="radio"
                        name="payment"
                        id={payment._id}
                        value={payment._id}
                        className="sr-only peer"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPayment(e.target.value);
                          }
                        }}
                        required
                      />
                      <label
                        htmlFor={payment._id}
                        className="flex justify-center items-center p-5 w-[150px] bg-white border border-slate-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50
                    peer-checked:ring-violet-500 peer-checked:ring-2 peer-checked:border-transparent duration-300"
                      >
                        <img
                          src={`https://mechaku-server.zaerodev.my.id/uploads/payments/${payment.thumbnail}`}
                          alt={payment.name}
                          className="w-auto h-10 object-cover"
                        />
                      </label>
                      <div className="absolute hidden w-full peer-checked:flex items-center justify-center -top-3 duration-300">
                        <div className="w-fit flex items-center justify-center bg-violet-700 text-white rounded-full p-1">
                          <BsCheck2 />
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <CartTotalPrice />

          <button type="submit" className="w-[320px] px-8 py-4 mt-8 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl">
            Complete Checkout
          </button>
        </form>

        {showSweetAlert()}
      </div>
    </>
  );
};

export default CheckoutPage;
