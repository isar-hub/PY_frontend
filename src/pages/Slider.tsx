import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import SwiperCore from "swiper";
import { addToCart } from "../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { Skeleton } from "../components/Loader";
import { ProductCard } from "./ProductCard";
import CartSidebar from "../components/CartSideBar";

const ProductSlider = ({ text }: { text: string }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { data: latestProducts, isLoading, error } = useLatestProductsQuery("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    setIsCartOpen(true);
    toast.success("Added to cart");
  };

  if (isLoading)
    return (
      <div>
        <Skeleton />
      </div>
    );

  if (error) return <div>Error: {"Error from Slider"}</div>;

  return (
    <div className="text-center ">
      <h2 className="text-2xl font-thin my-16 px-20 text-left">{text}</h2>
      <div className="relative px-20">
        {latestProducts && latestProducts.products && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
            className="mySwiper"
          >
            {latestProducts.products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="max-w-96">
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    sellingPrice={product.sellingPrice}
                    stock={product.stock}
                    handler={addToCartHandler}
                    photos={product.photos}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="absolute top-60 md:top-[190px] transform -translate-y-1/2 left-4 z-50">
          <button
            onClick={slidePrev}
            className=" text-black p-5 focus:outline-none "
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-60 md:top-[190px] transform -translate-y-1/2 right-4 z-50">
          <button
            onClick={slideNext}
            className=" text-black p-5 focus:outline-none"
          >
            &gt;
          </button>
        </div>
        <CartSidebar
          ref={sidebarRef}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
      </div>
    </div>
  );
};

export default ProductSlider;
