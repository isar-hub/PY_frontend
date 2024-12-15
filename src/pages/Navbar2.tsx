/*************  ✨ Codeium Command 🌟  *************/
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/pleasure yourself.png";
import { GiShoppingBag } from "react-icons/gi";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/reducers/cartReducer";
import { FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import { RootState } from "../redux/store";
import { SearchResult } from "../components/SearchResult";

interface PropsType {
  user: User | null;
}

const Navbar2 = ({ user }: PropsType) => {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const {
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort: "",
    category: "",
    page: 1,
    sellingPrice: 1000000,
  });

  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productIsError) {
      const err = productError as CustomError;
      toast.error(err?.data?.message || "Something went wrong");
      toast.error(err.data.message);
    }
  }, [productIsError, productError]);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      dispatch(resetCart());
      if (dialogRef.current && dialogRef.current.open) {
        dialogRef.current.close();
      }
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        if (dialogRef.current && dialogRef.current.open) {
          dialogRef.current.close();
        }
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setNavOpen(false);
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    setIsOpen(false);
  };

  const MenuLinks = () => (
    <div className="flex text-sm flex-col items-start md:flex-row relative gap-12 md:gap-1 md:space-x-8 md:ml-8 font-avenirCF ">
      <Link to="/" onClick={handleLinkClick}>
        <span className="text-3xl font-medium md:text-sm md:font-normal">
          HOME
        </span>
      </Link>
      <Link to="/product-listing" onClick={handleLinkClick}>
        <span className="text-3xl font-medium md:text-sm">SHOP</span>
      </Link>
      <Link to="/blog-listing" onClick={handleLinkClick}>
        <span className="text-3xl font-medium md:text-sm">BLOG</span>
      </Link>
      <Link to="/contact-listing" onClick={handleLinkClick}>
        <span className="text-3xl font-medium md:text-sm">CONTACT</span>
      </Link>
    </div>
  );

  const handleInputChange = (value: string) => {
    setSearch(value);
    setSearchOpen(value.length > 0);
    setNavOpen(false);
  };

  const productCount = useCallback(() => {
    return cartItems.reduce((total, product) => total + product.quantity, 0);
  }, [cartItems]);

  const toggleDialog = () => {
    if (dialogRef.current) {
      if (dialogRef.current.open) {
        dialogRef.current.close();
      } else {
        dialogRef.current.showModal();
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-1 md:p-4 shadow-sm font-avenirCF">
      <div className="hidden md:flex md:relative space-x-8">
        <MenuLinks />
      </div>
      <div className="ml-36 size-32 md:ml-0 md:size-44">
        <Link to="/">
          <img src={logo} alt="logo" className="" />
        </Link>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-8 md:relative">
        <div
          className="relative border-b-2 hover:border-2 border-gray-600 flex items-center px-2 w-[200px] sm:w-[200px] lg:w-[200px]"
          ref={searchRef}
        >
          <IoSearchOutline size={25} />
          <input
            className="bg-transparent p-2 w-full border-none focus:ring-0 text-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setSearchOpen(search.length > 0)}
            onBlur={() => {
              setTimeout(() => setSearchOpen(false), 20000000); // Delay to ensure results are visible
            }}
          />
          {searchOpen && searchedData && searchedData.products && (
            <div
              className="absolute top-14 left-0 z-20 px-3 py-4 max-h-[320px] min-w-[340px] overflow-y-auto bg-white border"
              style={{ boxShadow: "0px 0px 8px #ddd" }}
            >
              {searchedData.products.length > 0 ? (
                searchedData.products.map((product) => (
                  <div key={product._id} className="mb-2">
                    <Link
                      to={`/product/${product._id}`}
                      onClick={() => setSearchOpen(false)}
                    >
                      <SearchResult
                        productId={product._id}
                        name={product.name}
                        price={product.sellingPrice}
                        photos={product.photos}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <div>No results found</div>
              )}
            </div>
          )}
        </div>

        {user?._id ? (
          <nav className="header ">
            <button onClick={toggleDialog}>
              <FaUserCircle size={25} />
            </button>
            <dialog ref={dialogRef} className="">
              <div className="">
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" onClick={handleLinkClick}>
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/orders" onClick={handleLinkClick}>
                  <span>Orders</span>
                </Link>
                <button onClick={logoutHandler} className="bg-red-600 px-10">
                  <span className="">Sign Out</span>
                </button>
              </div>
            </dialog>
          </nav>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>
            <div className="flex items-center justify-center gap-2">
              <FaUserCircle size={25} /> Login
            </div>
          </Link>
        )}
        <Link to="/cart">
          <button className="text-[#5E5E4A] md:flex items-center py-2 px-5 relative">
            <GiShoppingBag size={32} className="mr-2" />
            <span className="absolute text-white text-xs top-5 left-8">
              {productCount()}
            </span>
          </button>
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <Link to="/cart">
          <button className="text-[#5E5E4A] md:flex items-center py-2 px-5 relative">
            <GiShoppingBag size={30} className="mr-2" />
            <span className="absolute text-white text-xs top-5 left-8">
              {productCount()}
            </span>
          </button>
        </Link>
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="cursor-pointer sm:hidden"
        >
          {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>
      </div>

      {navOpen && (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0" />
      )}

      <div
        className={
          navOpen
            ? "fixed top-0 left-0 w-full h-screen bg-[#D7D7CB] z-10 duration-500"
            : "fixed top-[-100%] left-0 w-full h-[100px] bg-white z-10 duration-500"
        }
      >
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <button
              onClick={() => setNavOpen(false)}
              className="absolute top-4 right-4"
            >
              <AiOutlineClose size={24} />
            </button>
            <li className="text-xl flex flex-col items-start mt-12 space-y-5 cursor-pointer w-[50%] rounded-full mx-auto p-2 hover:text-white">
              {user?._id ? (
                <nav className="header">
                  <button onClick={toggleDialog}>
                    <FaUserCircle size={35} />
                  </button>
                  <dialog ref={dialogRef} className="dialog">
                    <div>
                      {user.role === "admin" && (
                        <Link to="/admin/dashboard" onClick={handleLinkClick}>
                          Admin
                        </Link>
                      )}
                      <Link to="/orders" onClick={handleLinkClick}>
                        Orders
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="bg-red-600 text-white p-1 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  </dialog>
                </nav>
              ) : (
                <Link to="/login" onClick={handleLinkClick}>
                  <div className="flex items-center justify-center gap-2">
                    <FaUserCircle size={25} /> Login
                  </div>
                </Link>
              )}
              <div
                className="relative border-b-2 hover:border-2 border-black flex items-center px-2 w-[200px] sm:w-[380px] lg:w-[400px]"
                ref={searchRef}
              >
                <IoSearchOutline size={25} />
                <input
                  className="bg-transparent p-2 w-full border-none focus:ring-0 mb-2"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setSearchOpen(search.length > 0)}
                  onBlur={() => setTimeout(() => setSearchOpen(false), 10000000)}
                />
                {searchOpen && searchedData && searchedData.products && (
                  <div
                    className="absolute top-14 left-0 z-20 px-3 py-4 max-h-[320px] min-w-[340px] overflow-y-auto bg-white border "
                    style={{ boxShadow: "0px 0px 8px #ddd" }}
                  >
                    {searchedData.products.length > 0 ? (
                      searchedData.products.map((product) => (
                        <div key={product._id} className="mb-2">
                          <Link
                            to={`/product/${product._id}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setTimeout(() => setSearchOpen(false), 100000000000);
                            }}
                          >
                            <SearchResult
                              productId={product._id}
                              name={product.name}
                              price={product.price}
                              photos={product.photos}
                            />
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div>No results found</div>
                    )}
                  </div>
                )}
              </div>
              <MenuLinks />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar2;

/******  62919169-433d-4fb0-85ba-d03b2af925e9  *******/