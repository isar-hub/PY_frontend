import post5_banner_img from "../assets/sex_toys_in_india.jpg";
import { Link } from "react-router-dom";

const Post5 = () => {
  return (
    <div className="flex border border-slate-700 border-dashed">
      <div className="w-1/3 h-full">
        <img
          src={post5_banner_img}
          alt="post1 banner image"
          className="min-h-40 md:max-h-[400px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-2/3 px-5 md:px-24 py-2 md:py-10">
        <h1 className="text-base md:text-3xl text-gray-600 md:font-medium text-start pb-10 md:pb-0">
          Understanding Sex Toys in India: In this article we explain important
          things that you must know
        </h1>
        <p className="hidden md:block py-7 md:py-10 font-light max-h-5 md:max-h-full overflow-hidden font-avenirCF">
          During shopping have you ever felt that the usage of the sex toys is
          legal or not in India? Now, let’s explain it in easy-to-understand
          language.
        </p>
        <Link to={"/post55"}>
          <button className="bg-[#5E5E4A] rounded-sm md:rounded-md px-1 md:p-2 text-white">
            <span className="text-sm md:text-lg font-avenirCF">Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post5;
