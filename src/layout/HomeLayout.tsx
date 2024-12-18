import slider_img_1 from "../assets/slider_img_1.jpg";
// import slider_img_2 from "../assets/slider_img_2.jpg";
import slider_img_3 from "../assets/slider_img_3.jpg";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import sex_toys_for_women from "../assets/sex_toys_for_women.jpg";
import sex_toys_for_women2 from "../assets/sextoysforwomen.jpg";
import adult_toys from "../assets/adult toys.png";
import sex_toys_healthy_relation from "../assets/sex_toys_healthy_relation.jpg";
import ProductSlider from "../pages/Slider";
import { Link } from "react-router-dom";
import Footer from "../pages/footer-section";
function HomeLayout() {

  const images = [slider_img_1,  slider_img_3];
  const text1 = ["Your Pleasure, Perfectly", "No One "];
  const text2 = ["Priced. Up to 45% Off", "Will Know !"];
  // const images = [slider_img_1, slider_img_2, slider_img_3];
  // const text1 = ["Your Pleasure, Perfectly", "Secretly Worn,", "No One "];
  // const text2 = ["Priced. Up to 45% Off", "Deeply Felt.", "Will Know !"];
  return (
    <div className="w-full h-full overflow-x-hidden font-avenirCF ">
      <Slider slideImages={images} text1={text1} text2={text2} />

      <div className="flex justify-center max-w-full">
        <h1 className="hidden md:block text-2xl py-10 md:text-3xl lg:text-4xl md:my-20 font-avenirCF tracking-widest font-thin leading-loose">
          Exceptional Sex Toys for Women
        </h1>
        <h1 className="md:hidden text-2xl py-10 md:text-3xl lg:text-4xl md:my-20 font-avenirCF tracking-widest font-thin leading-tight">
          <span>Exceptional Sex Toys for</span>
          <br />
          <span>Women</span>
        </h1>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full md:pl-52 md:pr-28 lg:mb-60">
        <div className="w-full md:w-1/2 p-5 md:pl-20 flex flex-col items-center md:items-start">
          <p className="text-center md:text-left overflow-hidden leading-relaxed text-2xl font-thin tracking-wide font-avenirCF">
            Your source of enjoyment is readily available through our premium
            quality and affordable adult toys. From cute looking vibrators to
            realistic dildos, to fancy BDSM toys and more. Each toy ensures
            maximum comfort andenjoyment you never felt .Gain the privacy you
            deserve and seek this type of happiness here today!
          </p>
          <button className="group bg-[#5E5E4A] px-8 text-xs py-2 mt-5 hover:bg-gray-200 hover:border border-black group-hover:text-black">
            <Link to={"/product-listing"}>
              <p className="text-white font-thin font-avenirCF text-lg group-hover:text-black">
                Shop Now
              </p>
            </Link>
          </button>
        </div>

        <div className="w-full md:w-1/2 h-80 md:hidden">
          <img
            src={sex_toys_for_women}
            alt="story-img-1"
            className="md:min-h-[590px] lg:min-h-auto md:min-w-[490px] lg:min-w-auto"
          />
        </div>
        <div className="w-full md:w-1/2   hidden md:block ">
          <img
            src={sex_toys_for_women2}
            alt="story-img-1"
            className="md:min-h-[580px] lg:min-h-auto md:min-w-[490px] lg:min-w-auto"
          />
        </div>
      </div>
      <div className="bg-[#f8eadc] pb-16  pt-20 md:pt-40 mb-28 w-screen h-auto">
        <div className="mb-10 md:mb-20">
          <h1 className="mx-auto font-thin text-2xl md:text-5xl tracking-widest font-avenirCF">
            MOST POPULAR
          </h1>
        </div>
        <ProductSlider text={""} />
      </div>
      <div className="px-10 xl:ml-32 lg:px-32 flex flex-col lg:flex-row w-full h-full items-start md:space-x-10">
        <div className="w-full lg:w-2/5 h-full  lg:mt-[-80px] ">
          <img
            src={adult_toys}
            alt="story-img-2"
            className="md:min-h-[576px] md:min-w-[455px]"
          />
        </div>

        <div className="w-full lg:w-3/5 h-full font-avenirCF">
          <div className="flex flex-col md:items-start items-center w-full lg:w-96  md:space-y-1  lg:ml-0 mt-0  ">
            <div>
              <h2 className="text-2xl md:text-[40px] font-thin">
                BEYOND PERFECT
              </h2>
            </div>

            <p className="text-center md:text-left overflow-hidden max-w-full lg:max-w-[44rem] py-6 px-4 md:px-0 font-avenirCF font-thin text-[17px] leading-relaxed tracking-wide">
              Why should one go for the ordinary when there is extraordinary?
              Being one of the fastest-growing providers of premium sex toys in
              India. Our products are so smooth, like silk for customers to
              touch and explore; explore our wide range of collection including
              vibrating dildos ,vibrators for women and other essentials.
              Whether you are looking for personal massagers, dildo for women,
              bondage kit or any other essentials, we got exactly what you need
              if you want to buy sex toys online. Welcome to India’s
              fastest-growing sex store where passion intertwines with
              perfection in the classiest world of pleasure.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between">
        <h3 className="text-2xl md:text-[40px] mt-8 md:mt-32 font-thin font-avenirCF text-nowrap">
          Sex Toys for Couples:Connect Deeper
        </h3>
        <p className="text-center overflow-hidden max-w-full lg:max-w-[42rem] py-8 px-4 font-avenirCF font-normal text-[17px] leading-relaxed tracking-wide">
          Check out our exciting new range of couple sex toys to enhance your
          intimate fun! Now with features of remote and application control,
          pleasure can be discovered irrespective of the distance. Learn how
          it’s possible to find joy in togetherness as well as in loneliness,
          longing, and even separation.
        </p>
        <img
          src={sex_toys_healthy_relation}
          className="w-full lg:w-[55rem] h-auto object-cover object-center px-5"
          alt="footerImage"
        />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomeLayout;

interface SliderProps {
  slideImages: string[];
  text1: string[];
  text2: string[];
}

const Slider: React.FC<SliderProps> = ({ slideImages, text1, text2 }) => (
  <div className="container">
    <Slide easing="ease">
      {slideImages.map((slide, index) => (
        <section className="slidestyle relative" key={index}>
          {/* Background Image */}
          <div
            className="w-full h-[400px] md:h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
          ></div>

          {/* Overlay Text */}
          <div className="absolute top-24 left-4 md:top-0 md:left-14 flex items-center md:top-1/6 ">
            {/* Desktop View */}
            <div className="hidden md:flex flex-col items-start gap-4 text-white">
              <h1 className="text-4xl md:text-6xl font-libreBaskervilleCF font-semibold drop-shadow-xl">
                {text1[index]}
              </h1>
              <h1 className="text-4xl md:text-6xl font-libreBaskervilleCF font-semibold drop-shadow-xl">
                {" "}
                {text2[index]}
              </h1>
              <Link to="/product-listing">
                <button className="bg-[#5E5E4A] px-8  py-3 mt-4 hover:bg-gray-200 hover:border border-black hover:text-black text-white text-sm md:text-lg">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* Mobile View */}
            <div className="md:hidden md:flex flex-col items-start gap-2 text-white">
              <h1 className="text-2xl font-libreBaskervilleCF font-semibold drop-shadow-xl">
                {text1[index]}
              </h1>
              <h1 className="text-2xl font-libreBaskervilleCF font-semibold drop-shadow-xl">
                {" "}
                {text2[index]}
              </h1>
              <Link to="/product-listing">
                <button className="bg-[#5E5E4A] px-6 py-2 mt-2 hover:bg-gray-200 hover:border border-black hover:text-black text-white text-sm">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </Slide>
  </div>
);
