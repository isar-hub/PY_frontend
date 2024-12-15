import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import { responseToast, ResType } from "../utils/features";
import { resetCart } from "../redux/reducers/cartReducer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cards from "react-credit-cards-2";
import "./checkoutstyles.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Modal from "react-modal";

const CheckOutForm = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  console.log("Data - ", total);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("Online");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDiscalaimer, setShowCodDisclaimer] = useState<boolean>(false);


  const totalBeforePayment = paymentMethod === "COD" ? total + 99 : total;

  const dispatch = useDispatch();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const deliveryCharge = paymentMethod === "COD" ? 99 : 0;

    if (paymentMethod === "COD") {
      try {
        await axios.post(
          `${server}/api/v1/order/newWithCOD`,
          {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges: shippingCharges + deliveryCharge,
            total: totalBeforePayment,
            user: user?._id,
            paymentMethod,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        dispatch(resetCart());

        setShowModal(true);
      } catch (error) {
        console.error("Error creating COD order:", error);
        toast.error("Error creating order. Please try again later.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${server}/api/v1/order/newRazorpayOrder`,
          { amount: total },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const razorpayKey = data?.razorpayKey;
        const orderId = data?.razorpayOrderId;

        if (!razorpayKey) {
          throw new Error("Razorpay key not found in backend response");
        }

        const options: RazorpayOptions = {
          key: razorpayKey,
          amount: total * 100, // amount in paise
          currency: "INR",
          name: "Pleasure Yourself",
          description: "Test Transaction",
          image: "",
          order_id: orderId,
          handler: async (response) => {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            const paymentData = {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderData: {
                shippingInfo,
                orderItems: cartItems,
                subtotal,
                tax,
                discount,
                shippingCharges,
                total,
                user: user?._id,
              },
            };

            try {
              const verificationRes = await axios.post(
                `${server}/api/v1/order/paymentVerifiedOrder`,
                paymentData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              );

              const verificationResult = verificationRes.data;
              console.log("verifi - ", verificationRes);

              if (verificationResult && verificationResult.success) {
                dispatch(resetCart());

                setShowModal(true);
              } else {
                const adaptedError: ResType = {
                  error: {
                    status: 400,
                    data: {
                      success: false,
                      message:
                        verificationResult.message ||
                        "Payment verification failed",
                    },
                  } as FetchBaseQueryError,
                };
                responseToast(adaptedError, null, "");
              }
            } catch (verificationError) {
              console.error(
                "Error in payment verification:",
                verificationError
              );
              const adaptedError: ResType = {
                error: {
                  status: 500,
                  data: {
                    success: false,
                    message: "Error verifying payment. Please try again later.",
                  },
                } as FetchBaseQueryError,
              };

              responseToast(adaptedError, null, "");
            }

            setIsProcessing(false);
          },
          prefill: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            contact: shippingInfo.contactNumber,
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#DCB4BC",
          },
        };

        const loadRazorpay = await loadRazorpayScript();

        if (!loadRazorpay) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          setIsProcessing(false);
          return;
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsProcessing(false);
      } catch (error) {
        console.error("Error in Axios request:", error);
        toast.error("Error initiating payment. Please try again later.");
        setIsProcessing(false);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/orders");
  };

  return (
    <div className="checkout-container min-h-[20rem]">
      <form onSubmit={submitHandler}>
        <div className="min-h-[20rem] shadow-md shadow-[#5E5E4A]">
          <div className="App-cards text-left">
            <label className="border block py-3">
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() =>{
                   setPaymentMethod("Online");
                   setShowCodDisclaimer(false);
                }
                  }
                className="ml-[20px]"
              />
              <span className="font-avenirCF text-left pl-2 text-sm">
                Pay using UPI,Cards,Wallets,Netbanking
              </span>
            </label>
            <div className="App-cards-list ">
              <Cards
                name="John Smith"
                number="5555 4444 3333 1111"
                expiry="00/00"
                cvc="000"
              />
            </div>
          </div>
          <div className="text-left">
            <label className="border block py-3 text-left">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => {
                  setPaymentMethod("COD");
                  setShowCodDisclaimer(true);
                }}
                className="ml-[20px]"
              />
              <span className="font-avenirCF text-left pl-2 text-sm">
                Cash on Delivery (COD)
              </span>
            </label>
          </div>
        </div>
        {showDiscalaimer && (
          <p className="text-sm md:text-base text-center font-avenirCF italic text-grey-600 leading-relaxed mt-1">
          A handling fee of ₹101 is applicable for all COD purchases since extra
          processing and verification is entailed. To avoid this fee, for quicker
          dispatch, and a more hassle-free delivery, you can choose the prepaid
          option.
        </p>
        )}
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ${totalBeforePayment}`}
        </button>
      </form>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Order Success"
        className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-out"
      >
        <div className="bg-white rounded-lg p-6 mx-2 md:p-8 max-w-md w-full shadow-lg transform transition-transform duration-300 ease-out scale-100">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-avenirCF">
            Order Placed Successfully!
          </h2>
          <p className="text-base md:text-lg text-center font-avenirCF">
            Your order has been placed successfully. Thank you for your
            purchase!
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out font-avenirCF"
            >
              Go to Orders
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOutForm;
