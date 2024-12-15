import { useState, useEffect } from "react";
import age_dialog from "../assets/Adult toys for 18+ Plus.png";
import { Link } from "react-router-dom";

const AgeVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  useEffect(() => {
    localStorage.removeItem("ageVerified");
  }, []);

  const handleVerify = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
  };

  const handleUnderage = () => {
    setIsUnderage(true);
  };

  if (isVerified) {
    return null;
  }

  return (
    <div className="font-avenirCF">
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-[9999] ${
          isUnderage ? "blur-lg" : ""
        }`}
      >
        <div className="bg-slate-100 p-10 rounded-3xl shadow-lg text-center z-50 ">
          <img
            src={age_dialog}
            className="size-52 mx-auto"
            alt="Age Verification"
          />
          <h2 className="text-base font-medium my-5">Are you 18 or older ?</h2>
          <button
            onClick={handleVerify}
            className="bg-white text-black px-4  rounded-xl mr-4 border border-gray-700"
          >
            <span className="text-xs">Yes</span>
          </button>
          <button
            onClick={handleUnderage}
            className="bg-white text-black px-4  rounded-xl border border-gray-700"
          >
            <span className="text-xs">No</span>
          </button>
          <div className="text-xs text-blue-700 pt-4">
            <p>* By entering the website, you are agreeing to the</p>
            <Link to={"/terms-section"}>
              <span onClick={handleVerify} className="underline decoration-solid">Terms of Use </span>
              </Link>
              and{" "}
              <Link to={"/privacy-section"}>
              <span onClick={handleVerify} className="underline decoration-solid">Privacy Policy</span>
              </Link> 
          </div>
        </div>
      </div>

      {isUnderage && (
        <div className="fixed inset-0 bg-white bg-opacity-50 pointer-events-none"></div>
      )}
    </div>
  );
};

export default AgeVerification;
