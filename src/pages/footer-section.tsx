import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#DCB4BC] justify-evenly items-center mt-20 px-4 lg:px-0 font-avenirCF">
        <div className="flex flex-col py-16">
          <div className="py-10 flex flex-col gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <Link to="/product-listing">
                <h1 className="text-2xl md:text-2xl pb-4">SHOP</h1>
                <p className="text-sm">Women</p>
                <p className="text-sm ">Couples</p>
              </Link>
            </div>
          </div>
          <div className="py-10 flex flex-col gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <h1 className="text-2xl md:text-2xl pb-4">HELP</h1>
              <Link to={"/terms-section"}>
                <button className="text-sm md:text-base font-normal">
                  TERMS & CONDITIONS
                </button>
              </Link>
              <Link to={"/privacy-section"}>
                <button className="text-sm font-normal">PRIVACY POLICY</button>
              </Link>
              <Link to={"/shipping-section"}>
                <button className="text-sm font-normal">
                  SHIPPING & RETURNS
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col ">
          <div className="pt-20 flex flex-col items-start gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <h1 className="text-[17px] md:text-2xl pb-4">PLEASURE YOURSELF</h1>

              <Link to={"/blog-listing"}>
                <button className="text-sm  font-thin">BLOG</button>
              </Link>
              <Link to={"/contact-listing"}>
                <button className="text-sm font-thin">CONTACT US</button>
              </Link>
              <Link to={"/faq-section"}>
                <button className="text-sm font-thin">FAQ</button>
              </Link>
            </div>
          </div>
          <div className=" hidden md:block mt-14">
            <div className="pb-10 flex flex-col gap-3">
              <h1 className="text-2xl">NEWSLETTER SIGN UP</h1>
              <p className="font-thin md:text-base text-[14px]">
                Recieve our latest updates
              </p>
              <input placeholder="enter your email" />
              <button className="bg-black text-white py-2 font-thin text-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
