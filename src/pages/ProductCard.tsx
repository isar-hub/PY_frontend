import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type ProductsProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  sellingPrice : number,
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

export const ProductCard = ({
  productId,
  price,
  sellingPrice,
  name,
  photos,
  stock,
  handler,
}: ProductsProps) => {
  if (
    !productId ||
    !price ||
    !name ||
    !sellingPrice ||
    !photos ||
    !photos.length ||
    !stock ||
    !handler
  ) {
    return <div>Invalid product data</div>;
  }

  const handleClick = () => {
    const cartItem: CartItem = {
      productId,
      price,
      sellingPrice,
      name,
      photo: photos[0].url,
      stock,
      quantity: 1,
    };
    const result = handler(cartItem);
    console.log("Handler result: ", result);
  };
  

  return (
    <div key={productId} className="w-full font-avenirCF">
      <div className="max-w-[350px] min-h-[380px] md:min-h-[390px] md:min-w-[295px] md:max-w-[400px]">
        <Link to={`/product/${productId}`}>
          <img
            src={transformImage(photos?.[0]?.url, 400)}
            alt={name}
            className="w-full h-[370px] lg:w-full lg:h-[380px] object-left-bottom"
          />
        </Link>
      </div>
      <div className="px-6 text-left">
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-[] text-black max-h-10 min-h-11 overflow-hidden">
              <Link to={`/product/${productId}`}>
                <span className="inset-0 text-[16px] font-[398]">{name}</span>
              </Link>
            </h3>
            <div className="flex items-center space-x-2">
            <p className="">
            <span>&#8377;</span>
            {sellingPrice}
            </p>
            <p className="text-[18px] font-[100] text-gray-400 font-light py-2 text-black line-through">
              <span>&#8377;</span>
              {price}
            </p>

            </div>
            

          </div>
        </div>
        <button
          onClick={handleClick}
          className="mt-6 flex w-full items-center justify-center border border-black bg-transparent hover:bg-[#5E5E4A] px-8 py-3 text-black hover:text-white  focus:ring-2 focus:ring-indigo-500 "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
