import React from 'react';
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { BsFillCheckSquareFill } from 'react-icons/bs';

const CartTotalPrice = () => {
  const { total, grandTotal } = useSelector((state) => state.cartTotal);

  return (
    <div className="w-[320px] md:w-[420px] bg-white mt-10 px-8 py-4 rounded-2xl shadow-2xl shadow-black/10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-zinc-700">Total</p>
          <NumericFormat
            displayType="text"
            prefix="Rp. "
            decimalSeparator=","
            thousandSeparator="."
            className="font-medium text-emerald-500"
            value={total}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-zinc-700">Grand Total</p>
          <NumericFormat
            displayType="text"
            prefix="Rp. "
            decimalSeparator=","
            thousandSeparator="."
            className="font-medium text-emerald-500"
            value={grandTotal}
          />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="text-emerald-500">
            <BsFillCheckSquareFill />
          </div>
          <p className="text-[10px] text-zinc-400">Shipping & taxes calculated at checkout</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotalPrice;
