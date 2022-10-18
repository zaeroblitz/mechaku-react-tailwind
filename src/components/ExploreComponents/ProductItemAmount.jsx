import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductItemAmount = ({ action, actionOnClick }) => (
  <div
    className="p-1 lg:p-3 text-zinc-600 bg-slate-200 rounded-lg hover:cursor-pointer hover:scale-105 duration-200 hover:bg-slate-300"
    onClick={actionOnClick}
  >
    <div className="text-[10px]">
      {action === 'plus' ? <FaPlus /> : <FaMinus />}
    </div>
  </div>
);
export default ProductItemAmount;
