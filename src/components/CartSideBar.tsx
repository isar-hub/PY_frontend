import { forwardRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, removeCartItem } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";
import CartItemCard2 from "./CartItemCard2";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface CartSidebarProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartSidebar = forwardRef<HTMLDivElement, CartSidebarProps>(
  ({ isCartOpen, setIsCartOpen }, ref) => {
    const { cartItems } = useSelector((state: RootState) => state.cartReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const incrementHandler = (cartItem: CartItem) => {
      if (cartItem.quantity >= cartItem.stock) return;

      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = (cartItem: CartItem) => {
      if (cartItem.quantity <= 1) return;

      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const removeHandler = (productId: string) => {
      dispatch(removeCartItem(productId));
    };

    // Calculate subtotal dynamically using useMemo
    const subtotal = useMemo(() => {
      return cartItems.reduce(
        (acc, item) => acc + item.sellingPrice * item.quantity,
        0
      );
    }, [cartItems]);

    return (
      <div
        ref={ref}
        className={`fixed right-0 top-0 h-full bg-white shadow-lg z-50 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div>
          <div className="bg-black py-0 flex justify-between items-center">
            <button onClick={() => setIsCartOpen(false)} className="text-white">
              <MdArrowForwardIos className="ml-3 size-6" />
            </button>
            <h2 className="text-2xl font-thin p-0 font-avenirCF text-white mx-auto">
              Cart
            </h2>
          </div>

          <div className="min-h-[68vh] overflow-y-auto p-4 text-left">
            {cartItems.length > 0 ? (
              cartItems.map((i, idx) => (
                <CartItemCard2
                  incrementHandler={incrementHandler}
                  decrementHandler={decrementHandler}
                  removeHandler={removeHandler}
                  key={idx}
                  cartItem={i}
                />
              ))
            ) : (
              <h1>Cart is Empty</h1>
            )}
          </div>

          <div className="flex flex-col items-start justify-center mb-5">
            <div className="ml-9 font-avenirCF flex flex-col gap-2">
              <h2 className="text-lg font-thin text-black tracking-wide text-left">
                Subtotal
              </h2>
              <div className="text-xl items-start">
                <span>&#8377;</span>
                {subtotal.toFixed(2)}
              </div>
            </div>
          </div>

          <div>
            <hr className="mb-5" />
            <div className="flex justify-center items-center px-2 md:px-10 py-2">
              <button
                className="px-20 py-3 bg-[#5E5E4A] text-white text-xl"
                onClick={() => {
                  navigate("/cart");
                  setIsCartOpen(false);
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  }
);

export default CartSidebar;
