import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';

import { logo } from '../assets/icons';
import { Header } from '../components/DasboardComponents';
import { useGetUserTransactionsQuery } from '../redux/query/mechakuAPI';
import { ErrorMessage, GridLoadingSpinner } from '../components/ExploreComponents';

const TransactionItem = ({ item, index }) => (
  <tr>
    <td>{index + 1}</td>
    <td>
      <div className="flex items-center gap-3">
        <img
          src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item?.products[0]?.details?.images[0]}`}
          alt={item?.products[0]?.name}
          className="w-16 object-cover bg-center bg-no-repeat rounded-xl"
        />
        <div className="max-w-[70%]">
          <p className="truncate text-zinc-700">{item?.products[0].name}</p>
          <p className="text-zinc-400">{item?.products[0]?.category?.name}</p>
        </div>
      </div>
    </td>
    <td>
      <NumericFormat
        displayType="text"
        prefix="Rp. "
        thousandSeparator="."
        decimalSeparator=","
        value={item.value + item.tax}
        className="font-medium text-emerald-500"
      />
    </td>
    <td>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <p className="text-zinc-700">{item?.transactionStatus?.name}</p>
      </div>
    </td>
    <td>
      <Link to={`/member/transaction/details/${item._id}`} className="bg-violet-700 hover:bg-violet-500 text-white px-5 py-2 rounded-full transition duration-300">
        Details
      </Link>
    </td>
  </tr>
);

const MemberOverviewPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { isFetching, error, data } = useGetUserTransactionsQuery(user.id);
  const transactionData = data?.data;
  const totalTransactionPrice = transactionData?.reduce((accumulator, object) => accumulator + (object.value + object.tax), 0);

  if (isFetching) return <GridLoadingSpinner />;

  if (error) return <ErrorMessage />;

  return (
    <>
      <Helmet>
        <title>Mechaku | My Overview</title>
      </Helmet>
      <section className="mt-10 xl:mt-0">
        <Header title="Overview">
          <div className="bg-white shadow-2xl shadow-black/10 px-10 py-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Mechaku Logo"
                className="w-16 h-16 object-cover bg-center bg-no-repeat"
              />
              <h2 className="text-lg md:text-xl font-semibold text-zinc-600">Mechaku</h2>
            </div>
            <div className="flex flex-col mt-6">
              <h3 className="text-zinc-400">Total Spent</h3>
              <NumericFormat
                displayType="text"
                prefix="Rp. "
                thousandSeparator="."
                decimalSeparator=","
                value={transactionData?.length === 0 ? 0 : totalTransactionPrice}
                className="font-medium text-lg md:text-xl text-zinc-600"
              />
            </div>
          </div>
        </Header>

        {/* Latest Transaction */}
        <section className="mt-16">
          <h4 className="font-semibold text-xl md:text-2xl text-zinc-600 mb-4">Latest Transaction</h4>
          <div className="w-full overflow-auto shadow-2xl shadow-black/10 rounded-2xl">
            <table className="w-full table bg-white rounded-2xl">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Products</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* If user don't have any transactions */}
                {transactionData?.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-zinc-500">
                      You don&apos;t have any transactions in Mechaku.
                    </td>
                  </tr>
                )}

                {/* If user have transactions */}
                {transactionData?.length > 0 && (
                  transactionData?.slice(0, 3)?.map((item, index) => (
                    <TransactionItem key={item?._id || index} item={item} index={index} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
};

export default MemberOverviewPage;
