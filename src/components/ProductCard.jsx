import React from 'react'
import {Link} from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/Cart';

const MAX_PRODUCT_QUANTITY = 5;

const ProductCard = (props) => {
  const { id, name, price, image, slug } = props.data;
  const cartItems = useSelector(store => store.cart.items);
  const dispatch = useDispatch();

  const cartItem = cartItems.find(item => item.productId === id);

  const handleCartItems = () => {
    if (!cartItem || cartItem.quantity < MAX_PRODUCT_QUANTITY) {
      dispatch(addToCart({
        productId: id,
        quantity: 1,
      }));
    }
   
  };

  return (
    <div className='bg-gray-100 p-5 rounded-xl shadow-sm'>
      <Link to={slug}>
        <div className='bg-gray-200 p-0.5 rounded-lg'>
          <img src={image} alt={name} className='md:h-70 h-78 w-full object-contain  ' />
        </div>
      </Link>
      <Link to={slug}>
        <h1 className='text-2xl font-medium text-center py-3'>{name}</h1>
      </Link>
      <div className='flex justify-between items-center'>
        <span className='text-lg font-semibold'>
          <p>₹{price}</p>
        </span>
        {(() => {
          if (cartItem) {
            const handleDecrease = () => {
              if (cartItem.quantity > 1) {
                dispatch({
                  type: 'cart/changeQuantity',
                  payload: {
                    productId: id,
                    quantity: cartItem.quantity - 1,
                  }
                });
              } else {
                // Quantity <= 1, remove from cart
                dispatch({
                  type: 'cart/changeQuantity',
                  payload: {
                    productId: id,
                    quantity: 0,
                  }
                });
              }
            };
            const handleIncrease = () => {
              if (cartItem.quantity < MAX_PRODUCT_QUANTITY) {
                dispatch({
                  type: 'cart/changeQuantity',
                  payload: {
                    productId: id,
                    quantity: cartItem.quantity + 1,
                  }
                });
              }
              // Optionally, you could show a message if at max
            };
            return (
              <div className="flex items-center gap-2">
                <button
                  className="bg-amber-300 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-amber-400"
                  onClick={handleDecrease}
                  disabled={cartItem.quantity <= 0}
                >-</button>
                <span className="mx-1 text-lg font-medium">{cartItem.quantity}</span>
                <button
                  className={`bg-amber-300 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-amber-400 ${cartItem.quantity >= MAX_PRODUCT_QUANTITY ? 'opacity-50 cursor-default' : ''}`}
                  onClick={handleIncrease}
                  disabled={cartItem.quantity >= MAX_PRODUCT_QUANTITY}
                  title={cartItem.quantity >= MAX_PRODUCT_QUANTITY ? `Max ${MAX_PRODUCT_QUANTITY} allowed` : ''}
                >+</button>
              </div>
            );
          } else {
            return (
              <button
                className={`flex justify-center text-zinc-700 font-medium bg-orange-500 hover:bg-orange-500/80 shadow-sm shadow-zinc-400 hover:shadow-md transition-transform duration-300 p-1.5 rounded-sm gap-2 items-center cursor-pointer outline-none active:scale-95 active:bg-gray-300`}
                onClick={handleCartItems}
              >
                <IoCartOutline size={21} className='' />
                Buy
              </button>
            );
          }
        })()}
      </div>
    </div>
  )
}

export default ProductCard