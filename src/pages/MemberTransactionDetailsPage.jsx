import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { NumericFormat } from 'react-number-format';
import { Header } from '../components/DasboardComponents';
import { useGetTransactionByIdQuery } from '../redux/query/mechakuAPI';
import { ErrorMessage, GridLoadingSpinner } from '../components/ExploreComponents';

const MemberTransactionDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetTransactionByIdQuery(id);
  const transactionData = data?.data;

  if (isFetching) return <GridLoadingSpinner />;

  if (error) return <ErrorMessage />;

  return (
    <>
      <Helmet>
        <title>Mechaku | Transaction Details</title>
      </Helmet>
      <section className="mt-10 xl:mt-0">
        <Header title="Transaction Details" />

        <section className="flex flex-col mt-8 bg-white shadow-2xl shadow-black/10 rounded-2xl px-8 py-6">
          {/* Transaction Status */}
          <div className="w-fit bg-violet-700 text-white px-6 py-2 rounded-full">
            <p className="font-medium">{transactionData?.transactionStatus?.name}</p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-y-5 mt-8 pb-8 border-b border-slate-200">
            <h4 className="font-semibold text-lg md:text-xl text-zinc-600">Products</h4>
            {transactionData?.products?.map((item, index) => (
              <div key={item?._id || index} className="md:grid md:grid-cols-4 md:justify-between items-center">
                <div className="md:col-span-3 flex items-center gap-4">
                  <img
                    src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item?.details?.images[0]}`}
                    alt={item?.name}
                    className="w-28 md:w-32 object-cover bg-center bg-no-repeat rounded-2xl"
                  />
                  <div className="max-w-[70%] flex flex-col">
                    <p className="truncate font-semibold text-zinc-600 text-lg">{item?.name} {item?.name} {item?.name}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <ProductTag label={item?.category?.name} />
                      <ProductTag label={item?.brand?.name} />
                      <ProductTag label={item?.grade?.name} />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 flex flex-col md:items-center md:justify-self-end gap-1 mt-3 md:mt-0">
                  <NumericFormat
                    displayType="text"
                    prefix="Rp. "
                    thousandSeparator="."
                    decimalSeparator=","
                    value={item.details.price + 0.1 * item.details.price}
                    className="font-semibold bg-emerald-100 w-fit px-4 lg:px-6 py-2 lg:py-3 rounded-full text-emerald-500 text-lg"
                  />
                  <p className="font-light text-sm text-zinc-400">*incl. tax 10%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Details */}
          <div className="flex flex-col mt-12 pb-8 border-b border-slate-200">
            <h4 className="font-semibold text-lg md:text-xl text-zinc-600 mb-5">Shipping Details</h4>
            <RowItem label="Name" value={transactionData?.user?.name} />
            <RowItem label="Email" value={transactionData?.user?.email} />
            <RowItem label="Shipping Address" value={transactionData?.address} />
            <RowItem label="Courier" value={transactionData?.courier?.name} />
          </div>

          {/* Payment Details */}
          <div className="flex flex-col mt-12 pb-8 border-b border-slate-200">
            <h4 className="font-semibold text-lg md:text-xl text-zinc-600 mb-5">Payment Details</h4>
            <RowItem label="Type" value="Transfer" />
            <RowItem label="Payment Method" value={transactionData?.payment?.name} />
            <RowItem label="Account Name" value={transactionData?.user?.name} />
            <RowItem label="Price" value={transactionData?.value} isNominal />
            <RowItem label="Tax" value={transactionData?.tax} isNominal />
            <RowItem label="Grand Total" value={transactionData.value + transactionData.tax} isNominal />
          </div>

          <div className="w-fit bg-violet-700 text-white px-6 py-2 rounded-full mt-12 hover:bg-violet-500 hover:shadow-xl hover:shadow-black/10 transition duration-300">
            <a href="https://wa.me/6281383932663">Chat to Admin</a>
          </div>
        </section>
      </section>
    </>
  );
};

const ProductTag = ({ label }) => (
  <div className="bg-slate-200 text-slate-500 px-4 py-2 rounded-full text-sm md:text-base">
    <p>{label}</p>
  </div>
);

const RowItem = ({ label, value, isNominal }) => (
  <div className="grid grid-cols-2 items-center justify-between mt-2">
    <h5 className="font-medium text-zinc-600 md:text-lg">{label}</h5>
    {isNominal
      ? (
        <NumericFormat
          displayType="text"
          prefix="Rp. "
          thousandSeparator="."
          decimalSeparator=","
          value={value}
          className="font-medium text-end text-emerald-500"
        />
      )
      : <p className="text-zinc-700 text-end">{value}</p>}
  </div>
);

export default MemberTransactionDetailsPage;
