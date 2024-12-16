// import axios from "axios";
import { useEffect } from "react";
// import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiLockSimpleFill } from "react-icons/pi";
// import { LiaTagSolid } from "react-icons/lia";

import {
  addToCart,
  calculatePrice,
//  discountApplied,
  removeCartItem,
} from "../redux/reducers/cartReducer";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import CartItemCard from "../components/cart-item";
import Footer from "../pages/footer-section";

export const Cart2 = () => {
  const { cartItems, subtotal, total, shippingCharges, discount } = useSelector(
    (state: RootState) => state.cartReducer
  );
  console.log(
    "from cart - ",
    cartItems,
    subtotal,
    total,
    shippingCharges,
    discount
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer);

  // const [couponCode, setCouponCode] = useState<string>("");
  // const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

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

  // useEffect(() => {
  //   if (!couponCode) {
  //     setIsValidCouponCode(false);
  //     dispatch(discountApplied(0));
  //     dispatch(calculatePrice());
  //     return;
  //   }

    // const { token: cancelToken, cancel } = axios.CancelToken.source();

  //   const timeOutID = setTimeout(() => {
  //     axios
  //       .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
  //         cancelToken,
  //       })
  //       .then((res) => {
  //         dispatch(discountApplied(res.data.discount));
  //         setIsValidCouponCode(true);
  //         dispatch(calculatePrice());
  //       })
  //       .catch(() => {
  //         dispatch(discountApplied(0));
  //         setIsValidCouponCode(false);
  //         dispatch(calculatePrice());
  //       });
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeOutID);
  //     cancel();
  //     setIsValidCouponCode(false);
  //   };
  // }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      navigate("/product-listing");
    } else if (!user.user) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row px-5 box-border md:px-52 pt-20 space-y-5 md:space-x-10 min-h-screen font-avenirCF">
        <button
          onClick={handleCheckout}
          className="md:hidden mt-[-20px] w-full bg-[#5E5E4A] py-2"
        >
          <span className="text-white">Checkout</span>
        </button>

        <main className="w-full md:w-3/5 max-h-screen overflow-hidden">
          <h1 className="text-xl border-b mb-4 pb-4 text-left">My Cart</h1>
          <div className="min-h-40 max-h-[700px] overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((i, idx) => (
                <CartItemCard
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
          {/* <div className="flex mt-10 items-center">
            <LiaTagSolid />
            <input
              type="text"
              placeholder="Enter a promo code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border-none text-xs text-black font-medium focus:ring-0"
            />
          </div>
          {couponCode &&
            (isValidCouponCode ? (
              <span className="text-green-500">
                ₹{discount} off using the <code>{couponCode}</code>
              </span>
            ) : (
              <span className="text-red-500">
                Invalid Coupon <VscError />
              </span>
            ))} */}
        </main>

        <aside className="w-full md:w-2/5 pr-5 md:pr-20 max-h-screen overflow-hidden">
          <h1 className="text-xl border-b mb-4 pb-4 text-left">
            Order Summary
          </h1>
          <div className="flex pb-2">
            <h2 className="mr-auto">Subtotal</h2>
            <h2 className="ml-auto">₹{subtotal}</h2>
          </div>
          <div className="flex pb-2">
            <h1 className="mr-auto">Delivery</h1>
            <span className="ml-auto">
              ₹{cartItems.length > 0 ? shippingCharges : "FREE"}
            </span>
          </div>

          {/* <div className="flex border-b pb-3">
            <h1 className="mr-auto">Discount</h1>
            <em className="text-red-500 ml-auto">- ₹{discount}</em>
          </div> */}
          <div className="flex pt-4 pb-6">
            <h1 className="mr-auto">Total:</h1>
            <h1 className="ml-auto">₹{total}</h1>
          </div>

          <button onClick={handleCheckout} className="w-full bg-[#5E5E4A] py-2">
            <span className="text-white">Checkout</span>
          </button>

          <div className="flex items-center justify-center gap-2 mt-3">
            <PiLockSimpleFill />
            <span className="text-xs font-medium">Secure Checkout</span>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Cart2;
