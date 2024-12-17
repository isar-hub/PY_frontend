import toast from "react-hot-toast";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CartItem } from "../types/types";
import { ProductCard } from "./ProductCard";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { CustomError } from "../types/api-types";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import Footer from "./footer-section";
import CartSidebar from "../components/CartSideBar";

function ProductListing() {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");
  const search = "";
  const maxPrice = 1000000;
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [catog, setCatog] = useState("All Products");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    sellingPrice: maxPrice,
  });

  const dispatch = useDispatch();
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (productIsError) {
      const err = productError as CustomError;
      toast.error(err.data.message);
    }
  }, [productIsError, productError]);

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    setIsCartOpen(true);
  };

  const capitalizeWords = (str: string): string => {
    return str
      .split(" ")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const handleCategoryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setCatog(capitalizeWords(selectedCategory) || "All Products");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  // console.log("Search data - ", searchedData);

  return (
    <div className="font-avenirCF">
      <div className="flex mt-10 ml-7 md:ml-12">
        <h2 className="mr-2">Home</h2>
        <span>&gt;</span>
        <h2 className="ml-2">{catog}</h2>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-stretch p-5 md:p-8 min-h-[calc(100vh-12.5vh)] md:min-h-[calc(100vh-6.5vh)]">
        <aside className="hidden md:block min-w-full md:min-w-[16rem] h-auto lg:min-h-screen p-10 md:p-5 flex-col items-start justify-stretch space-y-2">
          <h2 className="text-xl font-bold text-left">Browse by</h2>
          <hr className="border-t-1 py-2 border-black w-52" />

          <div>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full bg-white border border-gray-300 rounded-lg focus:ring-0 border-none"
            >
              <option value="">All Products</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </aside>
        <main className="flex-1 px-2">
          <h1 className="text-2xl font-bold mt-5 text-left">All Products</h1>
          {/* <div className="">
            <p className="mt-2 mb-10 md:pr-60">
              This is your category description. It’s a great place to tell
              customers what this category is about, connect with your audience
              and draw attention to your products.
            </p>
          </div> */}

          <div className="my-10 flex items-center justify-between">
            <div>
              <h4 className="text-sm">
                {searchedData?.products.length} products
              </h4>
            </div>
            <div className="flex justify-end items-center">
              <h4 className="text-sm">Sort By:</h4>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="custom-select bg-white border-none focus:ring-0 text-sm"
              >
                <option value="">Recommended</option>
                <option value="">Newest</option>
                <option value="asc">Price (Low to High)</option>
                <option value="dsc">Price (High to Low)</option>
                <option value="asc">Name A-Z</option>
                <option value="dsc">Name Z-A</option>
              </select>
            </div>
          </div>

          {productLoading ? (
            <Loader />
          ) : (
            <div className="bg-white">
              <div className="mx-auto max-w-2xl py-2 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                <div className="grid gird-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-5 md:gap-y-12">
                  {searchedData?.products.map((product) => (
                    <ProductCard
                      key={product._id}
                      productId={product._id}
                      name={product.name}
                      price={product.price}
                      sellingPrice={product.sellingPrice}
                      stock={product.stock}
                      handler={addToCartHandler}
                      photos={product.photos}
                    />
                  ))}
                </div>
                <CartSidebar
                  ref={sidebarRef}
                  isCartOpen={isCartOpen}
                  setIsCartOpen={setIsCartOpen}
                />
              </div>
            </div>
          )}

          {searchedData && searchedData.totalPage >= 1 && (
            <article className="flex justify-center items-center space-x-4 mt-8">
              <button
                disabled={!isPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-1 bg-[#5E5E4A] text-white rounded text-sm disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                {page} of {searchedData.totalPage}
              </span>
              <button
                disabled={!isNextPage || page >= searchedData.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 bg-[#5E5E4A] text-white rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </article>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProductListing;
