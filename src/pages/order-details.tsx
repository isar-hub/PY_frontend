/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useCancelOrderMutation,
  useOrderDetailsQuery,
  
} from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { Order, OrderItem } from "../types/types";
import { responseToast, transformImage } from "../../src/utils/features";
import { Skeleton } from "../components/Loader";


  const defaultData: Order = {
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      contactNumber: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    paymentMethod: "Online",
    user: { name: "", _id: "" },
    _id: "",
  
};

  
  const OrderDetails = () => {
    useSelector((state: RootState) => state.userReducer);
  
    const params = useParams();
    const navigate = useNavigate();
  
    const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);
  
    const {
      shippingInfo: { address, city, state, country, pinCode },
      orderItems,
      user: { name },
      status,
      tax,
      subtotal,
      total,
      discount,
      shippingCharges,
      paymentMethod,
    } = data?.order || defaultData;
  
    const [cancelOrder] = useCancelOrderMutation();
  
    // console.log("data from transactionmngmnt-", orderItems);
  
    const updateHandler = async () => {
      const res = await cancelOrder({
        orderId: data?.order._id!,
      });
      responseToast(res, navigate, "/admin/transaction");
    };
  

  
    if (isError) return <Navigate to={"/404"} />;
  
  
  return (
    <div className="relative font-avenirCF">
    

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
          <main className="flex flex-col mx-5 md:mx-60 justify-between gap-16">
          <div className="mt-16 hidden md:block">
              <span className="text-base font-light">Orders</span>
              <span> / </span>
              <span className="text-base font-light">
                {data?.order._id}
              </span>
            </div>
            <div className="md:hidden flex items-center justify-start mt-5">
              <Link to="/orders">
                <span>Orders</span>
              </Link>
            </div>
            <div className="w-full flex flex-col md:flex-row md:gap-10">
              <section
                className="overflow-y-auto w-full h-screen max-w-sm bg-white shadow-lg rounded-lg p-8 flex flex-col gap-4 relative"
              >
                <h1 className="text-center text-2xl">Order Items</h1>
                {
                  orderItems.map((i) =>(
                    <ProductCard
                    key={i._id}
                    name={i.name}
                    photo={i.photo}
                    productId={i.productId}
                    _id={i._id}
                    quantity={i.quantity}
                    price={i.price}
                    />

                  ))
                }
                  <hr />
                <span  className="ml-auto">
                         = ₹{subtotal}
                      </span>

              </section>
              <section className="flex flex-col md:w-1/2">
              <article className="min-h-full p-8 w-full max-w-md bg-white rounded-lg shadow-lg relative">
                <h1 className="text-center text-2xl">Order Info</h1>
                <h5 className="ml-2 mt-8 text-xl font-bold">User Info</h5>
                <p className="m-2">Name: {name}</p>
                <p className="m-2">
                  Address:{" "}
                  {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                </p>
                <h5 className="ml-2 mt-8 text-xl font-bold">Payment Method</h5>
                <p className="m-2">Payment Mode: {paymentMethod}</p>
                <h5 className="ml-2 mt-8 text-xl font-bold">Amount Info</h5>
                <p className="m-2">Subtotal: {subtotal}</p>
                <p className="m-2">Shipping Charges: {shippingCharges}</p>
                <p className="m-2">Tax: {tax}</p>
                <p className="m-2">Discount: {discount}</p>
                <p className="m-2">Total: {total}</p>

                <h5 className="ml-2 mt-8 text-xl font-bold">Status Info</h5>
                <p className="m-2">
                  Status:{" "}
                  <span
                    className={
                      status === "Delivered"
                        ? "text-purple-600"
                        : status === "Shipped"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {status}
                  </span>
                </p>
                <button
                  className="mt-8 mb-0 p-4 bg-blue-600 text-white w-full rounded-lg text-lg cursor-pointer hover:opacity-80"
                  onClick={updateHandler}
            
                >
                  Cancel Order
                </button>
              </article>

              </section>


            </div>
          </main>
        

            
          </>
        )}

    </div>
  );
};
  const ProductCard = ({
    name,
    photo,
    price,
    quantity,
    productId,
  }: OrderItem) => (
    <div className="flex flex-row items-center gap-4">
      <img src={transformImage(photo)} alt={name} className="w-16 h-16 object-cover rounded-sm" />
      <Link to={`/product/${productId}`} className="text-blue-500 hover:text-blue-700">{name} </Link>
      <span  className="ml-auto">
        ₹{price} X {quantity} = ₹{price * quantity}
      </span>
      
    </div>
  );


export default OrderDetails;
