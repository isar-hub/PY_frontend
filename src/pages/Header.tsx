import SlideText from "../components/SlideText";

const mock = [
  "DISCREET DELIVERY",
  "SECURE PAYMENT",
  "CASH ON DELIVERY",
  "ELEGANT.GENTLE.SAFE.",
];

function Header() {
  return (
    <div className="flex h-12 items-center  justify-evenly bg-[#DCB4BC] px-4 text-sm font-medium text-white sm:px-6 lg:px-8 max-w-full">
      <p className="tracking-widest hidden md:block">
        DISCREET DELIVERY &amp; PAYMENTS&nbsp; &nbsp; &nbsp; &nbsp; CASH ON
        DELIVERY &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; FREE DELIVERY ON ALL
        ORDERS&nbsp;
      </p>
      <div
        className="md:hidden"
        style={{
          color: "white",
          fontSize: "1rem",
          textWrap: "nowrap",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <SlideText source={mock} />
      </div>
    </div>
  );
}

export default Header;
