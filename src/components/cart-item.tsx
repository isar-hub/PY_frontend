import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="flex items-start justify-start gap-5 py-4 border-b">
      <img
        src={transformImage(photo, 400)}
        alt={name}
        className="w-24 md:w-28 h-24 md:h-28 object-contain"
      />

      <div className="flex flex-col items-start gap-2 md:flex-row md:gap-72 md:items-center ">
        <div className=" flex flex-row items-start">
          <article className="flex flex-col justify-start gap-2 w-40">
            <Link
              to={`/product/${productId}`}
              className="text-base font-normal text-black hover:text-blue-500 "
            >
              {name}
            </Link>
            <span className="text-sm font-normal text-black">₹{price}</span>
          </article>
          <button
              onClick={() => removeHandler(productId)}
              className="text-gray-700 hover:text-red-600 mx-10"
            >
              <RiDeleteBinLine size={18} />
            </button>
        </div>

        <div className="flex items-center justify-end">
          <div className="h-8 flex items-center  ml-left border-black border">
            <button
              onClick={() => decrementHandler(cartItem)}
              className="text-black hover:bg-gray-300 px-4 py-2"
            >
              -
            </button>
            <p className="text-xs font-normal">{quantity}</p>
            <button
              onClick={() => incrementHandler(cartItem)}
              className="text-black hover:bg-gray-300 px-4 py-2"
            >
              +
            </button>
          </div>
          
            <div className="hidden md:block w-32 px-8">
              <span>₹{price}</span>
            </div>

            <button
              onClick={() => removeHandler(productId)}
              className="text-gray-700 hover:text-red-600 mx-10 hidden md:block"
            >
              <RiDeleteBinLine size={18} />
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
