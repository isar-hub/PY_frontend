import post4_banner_img from "../assets/cleaning_of_sex_toys.jpg";
import { Link } from "react-router-dom";

const Post4 = () => {
  return (
    <div className="flex border border-slate-700 border-dashed">
      <div className="w-1/3 h-full">
        <img
          src={post4_banner_img}
          alt="post1 banner image"
          className="min-h-40 md:max-h-[400px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-2/3 px-5 md:px-24 py-2 md:py-10">
        <h1 className="text-base md:text-3xl text-gray-600 md:font-medium text-start pb-10 md:pb-0">
          How to Clean & Maintain Your Sex Toys: A Comprehensive Guide
        </h1>
        <p className="hidden md:block py-7 md:py-10 font-light max-h-5 md:max-h-full overflow-hidden font-avenirCF">
          Maintenance and cleaning of the sex toys are not only crucial for
          safeguarding your health and promoting the long life of the toys but
          also for boosting the pleasure of your sex life. Proper maintenance
          and hygiene not only make your toys work great but also fend off risks
          of getting infections. This manual will guide you through the steps to
          clean your sex toys properly and keep them in good condition. It will
          make the point that it is a must and list the problems that com
        </p>
        <Link to={"/post44"}>
          <button className="bg-[#5E5E4A] rounded-sm md:rounded-md px-1 md:p-2 text-white">
            <span className="text-sm md:text-lg font-avenirCF">Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post4;
