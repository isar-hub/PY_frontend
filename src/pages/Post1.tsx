import { Link } from "react-router-dom";
import post1_img from "../assets/Best beginner vibrators.png";

const Post1 = () => {
  return (
    <div className="flex border border-slate-700 border-dashed">
      <div className="w-1/3 h-full">
        <img
          src={post1_img}
          alt="post1 banner image"
          className="min-h-40 md:min-h-96 w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-2/3 px-5 md:px-14 py-2 md:py-10">
        <h1 className="text-base md:text-3xl text-gray-600 md:font-medium pb-10 md:pb-0 text-left md:text-start">
          7 OF THE BEST SEX TOYS FOR NEWBIES IN 2024
        </h1>
        <p className="hidden md:block py-7 md:py-10 font-light max-h-5 md:max-h-full overflow-hidden font-avenirCF">
          Hi and welcome to our sex toys guide specially designed for the
          newcomers in the world of adult entertainment. We have included in
          this list of toys that are especially suitable for beginners: whether
          you are opening up your sexual field and have not bought toys yet, or
          want to develop intimacy with your partner. Here are some of our top
          toy recommendations for the beginners:
        </p>
        <Link to={"/post11"}>
          <button className="bg-[#5E5E4A] rounded-sm md:rounded-md px-1 md:p-2 text-white">
            <span className="text-sm md:text-lg font-avenirCF">Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post1;
