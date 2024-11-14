import contact_pleasure_yourself from "../assets/contact Pleasure Yourself.png";
import "./contact.scss";
import Footer from "./footer-section";

function ContactSection() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="md:basis-1/2 bg-[#C4AEAD] h-[850px] md:min-h-[900px]">
          <div className="flex gap-20 pb-20 py-10 px-10">
            <div className="md:p-20 w-full">
              <div className="flex flex-col leading-relaxed items-center md:items-start justify-center">
                <div className="flex flex-row md:flex-col">
                  <h2 className="text-xl md:text-5xl">LET'S STAY </h2>
                  <h2 className="text-xl md:text-5xl">CONNECTED</h2>
                </div>

                <p className="text-[16px] pb-10 pt-5 text-center md:text-justify">
                  If you have questions or special inquiries, you're welcome to
                  contact me or fill out this form
                </p>
              </div>

              <div className="">
                <form action="" className="flex flex-col space-y-1">
                  <div className="flex flex-col gap-3 md:flex-row md:py-2 pb-2">
                    <div className="md:w-1/2">
                      <h2 className="py-2">First Name *</h2>
                      <input
                        type="text"
                        className="border border-black bg-[#D7D7CB] w-full"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h2 className="py-2">Last Name *</h2>
                      <input
                        type="text"
                        className="border border-black bg-[#D7D7CB] w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row md:py-2 ">
                    <div className="md:w-1/2">
                      <h2 className="py-2">Email *</h2>
                      <input
                        type="text"
                        className="border border-black bg-[#D7D7CB] w-full"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h2 className="py-2">Phone</h2>
                      <input
                        type="text"
                        className="border border-black bg-[#D7D7CB] w-full"
                      />
                    </div>
                  </div>
                  <div className="py-2 w-full">
                    <h2 className="py-2">Leave me a message...</h2>
                    <input
                      type="text"
                      className="border border-black bg-[#D7D7CB]  h-32 w-full "
                    />
                  </div>
                  <div className="flex py-5 items-center justify-center ">
                    <button
                      type="submit"
                      className="bg-[#5E5E4A] text-white px-10 py-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block md:w-2/4 md:min-h-[900px] h-[300px] bg-fixed-md bg-fixed-sm"
          style={{
            backgroundImage: `url(${contact_pleasure_yourself})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "auto",
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactSection;
