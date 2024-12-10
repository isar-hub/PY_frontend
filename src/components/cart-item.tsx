import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";
import { RiDeleteBinLine } from "react-icons/ri";

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
  const { photo, productId, name, sellingPrice, quantity } = cartItem;

  return (
    <div className="flex flex-wrap items-center justify-end gap-5 py-4 border-b w-full">
      <img
        src={transformImage(photo, 400)}
        alt={name}
        className="w-24 md:w-24 h-24 md:h-28 object-contain"
      />

      <div className="flex flex-col md:flex-row gap-2 md:gap-12 w-full flex-1">
        <div className="flex flex-col justify-start gap-2 w-full flex-1">
          <Link
            to={`/product/${productId}`}
            className="text-base font-normal text-black hover:text-blue-500"
          >
            {name}
          </Link>
          <span className="text-sm font-normal text-black">
            ₹{sellingPrice}
          </span>
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
            <span>₹{sellingPrice}</span>
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
