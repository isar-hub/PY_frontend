import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { RootState, server } from "../../../redux/store";

const NewDiscount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    try {
      console.log(code, amount);
      // Validate form input
      if (!code || amount <= 0) {
        throw new Error("Please enter both coupon code and amount.");
      }

      const { data } = await axios.post(
        `${server}/api/v1/payment/coupon/new?id=${user?._id}`,
        {
          coupon: code,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setCode("");
        setAmount(0);
        toast.success(data.message);
        navigate("/admin/discount");
      } else {
        toast.error(data.message || "Failed to create coupon.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          toast.error(error.response.data.message || "Server Error");
        } else {
          console.error("Request Error:", error.message);
          toast.error("Request Error");
        }
      } else if (error instanceof Error) {
        console.error("Network Error:", error.message);
        toast.error("Network Error");
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Unexpected Error");
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Coupon</h2>
            <div>
              <label>Coupon Code</label>
              <input
                type="text"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <button type="submit" disabled={btnLoading}>
              {btnLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewDiscount;
