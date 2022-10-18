import React from 'react';
import { Helmet } from 'react-helmet';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components/DasboardComponents';
import { ErrorMessage, GridLoadingSpinner } from '../components/ExploreComponents';
import { useGetUserTransactionsQuery } from '../redux/query/mechakuAPI';

const MemberTransactionPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isFetching, error } = useGetUserTransactionsQuery(user.id);
  const transactionData = data?.data;
  const totalTransactionPrice = transactionData?.reduce((accumulator, object) => accumulator + (object.value + object.tax), 0);

  if (isFetching) return <GridLoadingSpinner />;

  if (error) return <ErrorMessage />;

  return (
    <>
      <Helmet>
        <title>Mechaku | My Transactions</title>
      </Helmet>
      <section className="mt-10 xl:mt-0">
        <Header title="My Transactions">
          <div className="mt-8 flex flex-col">
            <p className="text-zinc-400">You&apos;ve spent</p>
            <NumericFormat
              displayType="text"
              prefix="Rp. "
              thousandSeparator="."
              decimalSeparator=","
              value={totalTransactionPrice}
              className="mt-2 font-semibold text-3xl md:text-4xl text-zinc-700 tracking-wider"
            />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <TransactionTag label="All Transactions" active />
              <TransactionTag label="Success" />
              <TransactionTag label="Pending" />
              <TransactionTag label="Failed" />
            </div>
          </div>
        </Header>

        <div className="w-full overflow-auto rounded-2xl shadow-2xl shadow-black/10 mt-10">
          <table className="w-full table bg-white rounded-2xl">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product</th>
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
    </>
  );
};

const TransactionTag = ({ active, label }) => (
  <div className={`text-center  px-6 py-2 rounded-full ${active ? 'bg-violet-700 text-white' : 'bg-slate-200 text-slate-400'}`}>
    {label}
  </div>
);

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

export default MemberTransactionPage;
