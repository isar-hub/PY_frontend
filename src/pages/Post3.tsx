import { Link } from "react-router-dom";
import post3_banner_img from "../assets/sex_toys_and_health_risk.jpg";

const Post3 = () => {
  return (
    <div className="flex border border-slate-700 border-dashed">
      <div className="w-1/3 h-full">
        <img
          src={post3_banner_img}
          alt="post1 banner image"
          className="min-h-40 md:min-h-96 w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-2/3 px-5 md:px-24 py-2 md:py-10">
        <h1 className="text-base md:text-3xl text-gray-600 md:font-medium text-start pb-5 md:pb-0">
          Determining the Relationship between Sexual Enhancement Products and
          Health Complications
        </h1>
        <p className="hidden md:block py-7 md:py-10 font-light max-h-5 md:max-h-full overflow-hidden font-avenirCF">
          Using sex toys can add excitement to your intimate moments, increasing
          pleasure and exploration.. But it is also important to realize the
          presence of possible threats and when these things should be avoided
          to lessen the dangers it brings. Here, you will find detailed
          recommendations concerning
        </p>
        <Link to={"/post33"}>
          <button className="bg-[#5E5E4A] rounded-sm md:rounded-md px-1 md:p-2 text-white">
            <span className="text-sm md:text-lg font-avenirCF">Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post3;
