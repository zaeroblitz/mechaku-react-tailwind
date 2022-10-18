import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import ProductItemAmount from './ProductItemAmount';
import { decrementItemCart, incrementItemCart } from '../../redux/features/cart/cartTotalSlice';
import { fetchDecrementCartItem, fetchIncrementCartItem, fetchRemoveCartItem } from '../../redux/features/cart/cartSlice';
import { addSelectedCart, decrementAmount, incrementAmount, uncheckedSelectedCart } from '../../redux/features/cart/selectedCartSlice';

const CartItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [totalPrice, setTotalPrice] = useState(amount * item.product.details.price);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const data = {
    token: auth.token,
    itemId: item._id,
  };

  const handleItemChecked = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
      dispatch(incrementItemCart(totalPrice));
      dispatch(
        addSelectedCart({
          itemId: item._id,
          productId: item.product._id,
          thumbnail: item.product.details.images[0],
          name: item.product.name,
          category: item.product.category.name,
          amount: item.amount,
          price: item.product.details.price,
        }),
      );
    } else {
      setIsChecked(false);
      dispatch(decrementItemCart(totalPrice));
      dispatch(uncheckedSelectedCart(item._id));
    }
  };

  const handleMinusCartItem = () => {
    if (amount > 1) {
      setAmount(amount - 1);
      setTotalPrice((amount - 1) * item.product.details.price);
      dispatch(fetchDecrementCartItem(data));

      if (isChecked) {
        dispatch(decrementItemCart(parseInt(item.product.details.price, 10)));
        dispatch(decrementAmount(item._id));
      }
    }
  };

  const handlePlusCartItem = () => {
    if (amount < item?.product?.details?.quantity) {
      setAmount(amount + 1);
      setTotalPrice((amount + 1) * item.product.details.price);
      dispatch(fetchIncrementCartItem(data));

      if (isChecked) {
        dispatch(incrementItemCart(parseInt(item.product.details.price, 10)));
        dispatch(incrementAmount(item._id));
      }
    }
  };

  const handleRemoveItem = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Selected item will be removed from your cart',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const removeItemData = {
          token: auth.token,
          userId: auth.user.id,
          data: {
            item: item._id,
          },
        };

        dispatch(fetchRemoveCartItem(removeItemData));
      }
    });
  };

  return (
    <tr className="hover">
      {/* Checkbox */}
      <td className="pr-5">
        <input type="checkbox" className="checkbox checkbox-primary" value={item?._id} onChange={(e) => handleItemChecked(e)} />
      </td>

      {/* Product Details */}
      <td className="overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src={`https://mechaku-server.zaerodev.my.id/uploads/products/${item?.product?.details?.images[0]}`}
            alt={`${item?.product?.name} Thumnbail`}
            className="w-12 lg:w-20 h-12 lg:h-20 object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-1">
            <p className="max-w-[400px] truncate text-sm font-semibold text-zinc-600">{item?.product?.name}</p>
            <p className="text-sm text-zinc-400">{item?.product?.category?.name}</p>
          </div>
        </div>
      </td>

      {/* Amount */}
      <td>
        <div className="flex justify-center items-center gap-5">
          <ProductItemAmount
            action="minus"
            actionOnClick={() => handleMinusCartItem()}
          />
          <p className="text-zinc-600">{amount}</p>
          <ProductItemAmount
            action="plus"
            actionOnClick={() => handlePlusCartItem()}
          />
        </div>
      </td>

      {/* Price */}
      <td className="pl-5 text-left text font-semibold text-emerald-500">
        <NumericFormat
          displayType="text"
          prefix="Rp. "
          decimalSeparator=","
          thousandSeparator="."
          value={totalPrice}
        />
      </td>

      {/* Action */}
      <td className="text-center">
        <div
          className="w-fit mx-auto bg-pink-500 hover:bg-pink-600 hover:scale-105 duration-300 cursor-pointer p-2 rounded-lg text-white font-bold text-lg"
          onClick={() => handleRemoveItem()}
        >
          <FiTrash2 />
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
