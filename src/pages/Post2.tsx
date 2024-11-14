import { Link } from "react-router-dom";
import post2_banner_img from "../assets/Beginner guide to using vibrators.png";

const Post2 = () => {
  return (
    <div className="flex border border-slate-700 border-dashed">
      <div className="w-1/3 h-full">
        <img
          src={post2_banner_img}
          alt="post1 banner image"
          className="min-h-40 md:min-h-96 w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-2/3 px-5 md:px-24 py-2 md:py-10">
        <h1 className="text-base md:text-3xl text-gray-600 md:font-medium text-start pb-3 md:pb-0">
          A Step-by-Step Guide to Using Vibrators: Internal, External, Combo,
          Anal and Prostate Massagers
        </h1>
        <p className="hidden md:block py-7 md:py-10 font-light max-h-5 md:max-h-full overflow-hidden font-avenirCF">
          Thus, stepping into a realm of vibrators does not seem to be very
          complicated for starters although it can be very entertaining. This
          guide is meant to make it easy for you and to guide you as you search
          for the vibrator that will work for you and meet all your fantasies.
        </p>
        <Link to={"/post22"}>
          <button className="bg-[#5E5E4A] rounded-sm md:rounded-md px-1 md:p-2 text-white">
            <span className="text-sm md:text-lg font-avenirCF">Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post2;
