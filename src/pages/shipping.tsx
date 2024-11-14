import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducers/cartReducer";
import { RootState, server } from "../redux/store";
import Footer from "./footer-section";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    contactNumber: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!data || !data.clientSecret) {
        throw new Error("Invalid response from server");
      }

      // console.log("Received client secret:", data.clientSecret);

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.error("Error in Axios request:", error);
      toast.error("Failed to fetch client secret. Please try again.");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <>
      <div className="shipping font-avenirCF">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          <BiArrowBack />
        </button>

        <form onSubmit={submitHandler}>
          <h1>Shipping Address</h1>

          <input
            required
            type="text"
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
          />

          <select
            name="country"
            required
            value={shippingInfo.country}
            onChange={changeHandler}
          >
            <option value="">Choose Country</option>
            <option value="india">India</option>
            <option value="outside of india">Outside of India</option>
          </select>

          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />
          <input
            required
            type="number"
            placeholder="Contact Number"
            name="contactNumber"
            value={shippingInfo.contactNumber}
            onChange={changeHandler}
          />

          <button type="submit">Pay Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
