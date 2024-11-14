import { transformImage } from "../utils/features";
import { Link } from "react-router-dom";

export const SearchResult = ({
  productId,
  name,
  photos,
  price,
}: {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
}) => {
  return (
    <Link
      to={`/product/${productId}`}
      className="hover:bg-[#efefef] z-25 block"
    >
      <div className="flex items-start justify-start gap-5 py-2 px-1 border-b border-gray-400">
        <img
          src={transformImage(photos?.[0]?.url, 400)}
          alt={name}
          className="w-16 md:w-16 h-16 md:h-20 object-contain"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <article className="flex flex-col justify-start gap-2">
            <span className="text-xs font-normal text-black hover:text-blue-500">
              {name}
            </span>
            <span className="text-sm font-normal text-black">₹{price}</span>
          </article>
        </div>
      </div>
    </Link>
  );
};
