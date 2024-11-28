/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/rules-of-hooks */
import { CarouselButtonType, MyntraCarousel, Slider, useRating } from "6pp";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import RatingsComponent from "../components/ratings";
import {
  useAllReviewsOfProductsQuery,
  useDeleteReviewMutation,
  useNewReviewMutation,
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducers/cartReducer";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import { responseToast } from "../utils/features";
import * as React from "react";
import ReviewCard from "./ReviewCard";
import { ProductpageAccordion } from "./ProductpageAccordion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductSlider from "./Slider";
import Footer from "./footer-section";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, data } = useProductDetailsQuery(params.id!);
  const reviewsResponse = useAllReviewsOfProductsQuery(params.id!);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [reviewComment, setReviewComment] = useState("");
  const reviewDialogRef = useRef<HTMLDialogElement>(null);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  const [createReview] = useNewReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  // Handle quantity changes
  const decrement = () => setQuantity((prev) => prev - 1);
  const increment = () => {
    if (data?.product?.stock === quantity)
      return toast.error(`${data?.product?.stock} available only`);
    setQuantity((prev) => prev + 1);
  };
  const reviewCloseHandler = () => {
    reviewDialogRef.current?.close();
    setRating(0);
    setReviewComment("");
  };
  // console.log("product-details data-", data);

  const {
    Ratings: RatingsEditable,
    rating,
    setRating,
  } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value: 0,
    selectable: true,
    styles: {
      fontSize: "1.2rem",
      color: "coral",
      justifyContent: "flex-start",
    },
  });

  // Handle add to cart
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) return <Navigate to="/404" />;

  // Show review dialog
  const showDialog = () => {
    reviewDialogRef.current?.showModal();
  };

  // Handle review submission
  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewSubmitLoading(true);
    reviewCloseHandler();

    const res = await createReview({
      comment: reviewComment,
      rating,
      userId: user?._id,
      productId: params.id!,
    });

    setReviewSubmitLoading(false);
    responseToast(res, null, "");
  };

  // Handle review deletion
  const handleDeleteReview = async (reviewId: string) => {
    const res = await deleteReview({ reviewId, userId: user?._id });
    responseToast(res, null, "");
  };
  const navigate = useNavigate();

  return (
    <div className="relative font-avenirCF">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main className="flex flex-col mx-5 md:mx-60 justify-between gap-16">
            <div className="mt-16 hidden md:block">
              <span className="text-base font-light">Home</span>
              <span> / </span>
              <span className="text-base font-light">
                {data?.product?.category}
              </span>
              <span> / </span>
              <span className="text-base font-light">
                {data?.product?.name}
              </span>
            </div>
            <div className="md:hidden flex items-center justify-start mt-5">
              <Link to="/product-listing">
                <ArrowBackIosIcon fontSize="small" />
                <span>Back to SHOP</span>
              </Link>
            </div>
            <div className="w-full flex flex-col md:flex-row md:gap-10">
              <section className="mb-10 md:w-1/2">
                <div className="">
                  <Slider
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarouselOpen(true)}
                    images={data?.product?.photos.map((i) => i.url) || []}
                  />
                </div>

                {carouselOpen && (
                  <MyntraCarousel
                    NextButton={NextButton}
                    PrevButton={PrevButton}
                    setIsOpen={setCarouselOpen}
                    images={data?.product?.photos.map((i) => i.url) || []}
                  />
                )}
              </section>
              <section className="flex flex-col md:w-1/2">
                <h1 className="text-gray-700 font-normal text-2xl text-left">
                  {data?.product?.name}
                </h1>
                <div className="">
                  <em
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      fontSize: "small",
                      padding: "4px 0px",
                    }}
                  >
                    <RatingsComponent value={data?.product?.ratings || 0} />(
                    {data?.product?.numOfReviews} reviews)
                  </em>
                </div>
                <div className="flex items-center space-x-4 my-5">
                    <h3 className="text-gray-700 font-light text-2xl">
                        ₹{data?.product?.sellingPrice}
                    </h3>
                    <p className="text-gray-500 font-light text-2xl line-through">
                        ₹{data?.product?.price}
                    </p>
                </div>

                <article>
                  <div className="flex flex-col my-5">
                    <p className="text-sm font-light">Quantity</p>
                    <div className="py-2">
                      <div className="border border-black flex justify-evenly w-16">
                        <button onClick={decrement}>-</button>
                        <p>{quantity}</p>
                        <button onClick={increment}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 my-10">
                    <button
                      className="bg-[#5E5E4A] text-white p-3 w-full"
                      onClick={() =>
                        addToCartHandler({
                          productId: data?.product?._id!,
                          name: data?.product?.name!,
                          price: data?.product?.price!,
                          stock: data?.product?.stock!,
                          quantity,
                          photo: data?.product?.photos[0].url || "",
                          sellingPrice: data?.product?.sellingPrice!
                        })
                      }
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        addToCartHandler({
                          productId: data?.product?._id!,
                          name: data?.product?.name!,
                          price: data?.product?.sellingPrice!,
                          stock: data?.product?.stock!,
                          quantity,
                          photo: data?.product?.photos[0].url || "",
                          sellingPrice: data?.product?.sellingPrice!
                        });
                        navigate("/cart");
                      }}
                      className="border border-[#5E5E4A] p-3 w-full"
                    >
                      <Link to="/cart">
                        <span className="text-[#5E5E4A]">Buy Now</span>
                      </Link>
                    </button>
                  </div>
                </article>
                {data?.product && (
                  <ProductpageAccordion product={data.product} />
                )}
              </section>
            </div>
          </main>
        </>
      )}

      <dialog
        ref={reviewDialogRef}
        className="absolute mx-auto my-auto  min-w-60 md:min-w-72 min-h-[400px] p-5 md:p-10"
      >
        <button onClick={reviewCloseHandler}>
          X <span>close</span>
        </button>
        <h2 className="text-base my-2 text-left">Write a Review</h2>
        <RatingsEditable />
        <form onSubmit={submitReview}>
          <div className="flex flex-col">
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className=" min-h-48 md:min-h-60 md:min-w-96"
              placeholder="Review..."
            ></textarea>

            <button
              className="bg-[#5E5E4A] px-3 py-1 mt-5 text-white text-sm"
              disabled={reviewSubmitLoading}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>

      <section className="mx-5 md:mx-60 mt-10">
        <article className="max-h-96 mx-auto flex items-center gap-2 px-5">
          <h2 onClick={showDialog} className="text-base font-bold">
            Write Review
          </h2>
          {reviewsResponse.isLoading
            ? user && (
                <button onClick={showDialog}>
                  <FiEdit />
                </button>
              )
            : user && (
                <button onClick={showDialog}>
                  <FiEdit />
                </button>
              )}
        </article>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            overflowY: "auto",
            padding: "2rem",
            height: "20rem",
            margin: "2rem",
          }}
        >
          {reviewsResponse.isLoading ? (
            <>
              <Skeleton width="45rem" length={5} />
              <Skeleton width="45rem" length={5} />
              <Skeleton width="45rem" length={5} />
            </>
          ) : (
            reviewsResponse.data?.reviews.map((review) => (
              <ReviewCard
                handleDeleteReview={handleDeleteReview}
                userId={user?._id}
                key={review._id}
                review={review}
              />
            ))
          )}
        </div>
      </section>
      <div>
        <ProductSlider text={"You Might Also Like"} />
      </div>

      <Footer />
    </div>
  );
};

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid #f1f1f1",
        height: "10vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          width="100%"
          containerHeight="100%"
          height="100%"
          length={1}
        />
      </section>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="40%" length={3} />
        <Skeleton width="50%" length={4} />
        <Skeleton width="100%" length={2} />
        <Skeleton width="100%" length={10} />
      </section>
    </div>
  );
};

const NextButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowRightLong />
  </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
  <button onClick={onClick} className="carousel-btn">
    <FaArrowLeftLong />
  </button>
);

export default ProductDetails;
