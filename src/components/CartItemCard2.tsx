import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";
import { BsPlus } from "react-icons/bs";
import { PiMinusThin } from "react-icons/pi";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard2 = ({
  cartItem,
  incrementHandler,
  decrementHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="flex items-start justify-start gap-5 py-4 border-b">
      <img
        src={transformImage(photo, 400)}
        alt={name}
        className="w-20 md:w-24 h-24 md:h-24 object-contain"
      />
      <div className="flex flex-col gap-2">
        <article className="flex flex-col justify-start gap-2 max-w-[180px] overflow-hidden">
          <Link
            to={`/product/${productId}`}
            className="text-xs font-normal text-black hover:text-blue-500"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Link>
          <span className="text-sm font-normal text-black">₹{price}</span>
        </article>

        <div className="flex items-center border border-black">
          <button
            onClick={() => decrementHandler(cartItem)}
            className="text-black hover:bg-gray-300 px-3 py-1"
          >
            -
          </button>
          <p className="text-xs font-normal">{quantity}</p>
          <button
            onClick={() => incrementHandler(cartItem)}
            className=" text-black hover:bg-gray-300 px-3 py-1"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard2;
