import React, { useState, useEffect } from "react";
import products from "../product";
import { useDispatch } from "react-redux";
import {
  changeQuantity,
  deleteFromCart as deleteFromCartAction,
} from "../features/Cart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState([]);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const findDetail = products.find((product) => product.id === productId);
    setDetail(findDetail);
  }, [productId]);

  const handleMinusQuant = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      }),
    );
    setAnimate(true);
  };

  const handlePlusQuant = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      }),
    );
    setAnimate(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteFromCartAction({
        productId: productId,
      }),
    );
  };

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setAnimate(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <div
      className={`flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md transition-transform duration-300 ${
        animate ? "scale-105 shadow-lg ring-amber-100" : ""
      }`}
    >
      <img src={detail.image} alt={detail.name} className="w-12" />
      <h3>{detail.name}</h3>
      <p>${detail.price * quantity}</p>
      <div className="flex flex-col items-end w-20 justify-between top-0 h-16 ">
      <AiOutlineDelete className="w-[30px] cursor-pointer right-6 top-22 " onClick={handleDelete} />
      <div className="flex justify-between w-20 gap-1 ">
      <button
          className="bg-gray-200 text-black flex justify-center items-center rounded-full w-6 h-6"
          onClick={handleMinusQuant}
        >
          <FaMinus className="w-3 h-3 text-black" />
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200  text-black flex justify-center items-center rounded-full w-6 h-6"
          onClick={handlePlusQuant}
        >
          <FaPlus className="w-3 h-3 " />
        </button>
      </div>
      </div>

    </div>
  );
};

export default CartItem;
