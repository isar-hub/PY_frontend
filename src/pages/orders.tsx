/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import "../styles/orders.scss"
import { responseToast } from "../../src/utils/features";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import {
  useCancelOrderMutation,
  
} from "../redux/api/orderAPI";
type DataType = {
  _id: string;
  photo:string;
  amount: number;
  quantity: number;
  discount: number;
  status: string;
  action?: ReactElement;
};

// const column: Column<DataType>[] = [
//   {
//     Header: "ID",
//     accessor: "_id",
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//   },
//   {
//     Header: "Discount",
//     accessor: "discount",
//   },
//   {
//     Header: "Amount",
//     accessor: "amount",
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          photo:i.orderItems[0].photo,
          quantity: i.orderItems.length,
          status: i.status,
          action: (
            <button
              onClick={async () => {
                const res = await cancelOrder({
                  orderId: i._id,
                });
                responseToast(res, navigate, "/orders");
              }}
              disabled={i.status === "Cancelled"}
              className={`px-3 py-1 rounded ${
                i.status === "cancelled"
                  ? "bg-gray-700 text-gray-200 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Cancel Order
            </button>
          ),
            
        
        }))
      );
    }
  }, [data]);

  const navigate = useNavigate();
  const [cancelOrder] = useCancelOrderMutation();


  // useEffect(() => {
  //   if (data)
  //     setRows(
  //       data.orders.map((i) => ({
  //         _id: i._id,
  //         amount: i.total,
  //         discount: i.discount,
  //         quantity: i.orderItems.length,
  //         status: (
  //           <span
  //             className={
  //               i.status === "Processing"
  //                 ? "red"
  //                 : i.status === "Shipped"
  //                 ? "green"
  //                 : "purple"
  //             }
  //           >
  //             {i.status}
  //           </span>
  //         ),
  //         action: <Link to={`/order/${i._id}`}>Manage</Link>,
  //       }))
  //     );
  // }, [data]);

  // const Table = TableHOC<DataType>(
  //   column,
  //   rows,
  //   "dashboard-product-box",
  //   "Orders",
  //   rows.length > 6
  // )();
  // return (

  //   <>
  //     <h1 className="text-left ml-10 my-5 font-avenirCF text-lg">My Orders</h1>
  //     <div className="container">
  //       {isLoading ? <Skeleton length={20} /> : Table}
  //     </div>
  //   </>
  // );


  return (

    <>
    <section className="product">

      {isLoading ? (
        <Skeleton length={20}  />
      ):<div className="grid">
      {
        rows.map((order)=>(
          <div className="card" key={order._id}>
            <img
              className="card-image"
              src={order.photo}
              alt={order._id}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/600x400?text=No+Image!";
              }}
            />
            <div className="card-body">
              <h5 className="card-title">
                Order ID :{order._id}
              </h5>
              <p className="card-description">
                  {}
                </p>
                <span>Quantity :{order.quantity} </span>
                <p className="card-price">Total Amount : ₹{order.amount}</p>
                
                <p
            className={`${
              order.status === "Processing"
                ? "text-red-500"
                : order.status === "Shipped"
                ? "text-green-500"
                : "text-purple-500"
            } font-bold`}
          >
            Status: {order.status}
          </p>
                  {order.action}

            </div>
          </div>
        ))
      }

    </div>
      
    }
      

    </section>
    </>
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    //   {isLoading ? (
    //     <Skeleton length={20}  />
    //   ) : (
    //     <div>
    //     rows.map((order) => (
    //       <div
    //         className="grid"
    //         key={order._id}
    //       >
    //         <h3 className="text-lg font-semibold">
    //           Order ID: {order._id}
    //         </h3>
    //         <p className="text-gray-600">Amount: ₹ {order.amount.toFixed(2)}</p>
    //         <p className="text-gray-600">Discount: {order.discount}%</p>
    //         <p className="text-gray-600">Quantity: {order.quantity}</p>
    //         <p
    //           className={`${
    //             order.status === "Processing"
    //               ? "text-red-500"
    //               : order.status === "Shipped"
    //               ? "text-green-500"
    //               : "text-purple-500"
    //           } font-bold`}
    //         >
    //           Status: {order.status}
    //         </p>
    //         {order.action}
    //       </div>
    //     ))
    //   )}
      
    // </div>
  );

};

export default Orders;
