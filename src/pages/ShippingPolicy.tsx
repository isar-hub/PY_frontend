import Footer from "./footer-section";

const ShippingPolicy = () => {
  return (
    <>
      <div className="mx-10 my-20 font-avenirCF">
        <div className="px-2 md:px-40">
          <h1 className="text-4xl text-slate-600 text-left py-10 font-avenirCF font-medium">
            RETURN & EXCHANGE
          </h1>
          <p className="font-arialBlackCF">
            Due, to our commitment to maintaining hygiene and safety protocols
            we are unable to accommodate returns for adult products once the
            seal is broken or the item has been used, as they become unsellable.
            In case your product exhibits a manufacturing defect. Sustains
            damage during shipping kindly notify us within 48 hours of receiving
            your order. We are more than willing to help you with a replacement
            or refund under circumstances.
          </p>
        </div>
        <div className="px-2 md:px-40">
          <h1 className="text-4xl text-slate-600 text-left py-10 font-avenirCF font-medium">
            SHIPPING & CUSTOMS
          </h1>
          <p className="">
            All the products on Pleasure Yourself are 100% custom cleared. Also
            the prices mentioned on the website is the final amount that you
            will have to pay for product. Prices mentioned on the website
            includes all the taxes and duties that needs to be paid. Also in
            order to make sure about your privacy we never ship any of our
            products with the plesureyourself.store mentioned on it. Which makes
            it impossible to detect what you are getting. All our shipments
            comes in plain brown boxes entitled as cell phone or similar
            products.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
