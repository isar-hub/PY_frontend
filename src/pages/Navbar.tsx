import logo from "../assets/pleasure yourself.png";
import { GiShoppingBag } from "react-icons/gi";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/reducers/cartReducer";
import { FaUserCircle } from "react-icons/fa";

interface PropsType {
  user: User | null;
}

function Navbar({ user }: PropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      dispatch(resetCart());
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-around h-38 relative max-w-full font-avenirCF">
      <div className="flex relative space-x-8">
        <Link to={"/"}>
          <button className=""> HOME</button>
        </Link>
        <Link to={"/product-listing"}>
          <button className=""> SHOP</button>
        </Link>
        <Link to={"/blog-listing"}>
          <button className=""> BLOG</button>
        </Link>
        <Link to={"/contact-listing"}>
          <button className=""> CONTACT</button>
        </Link>
      </div>
      <div className="size-36">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex items-center space-x-8 relative">
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />

            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {user?._id ? (
          <nav className="header">
            <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
              <FaUserCircle size={25} />
            </button>
            <dialog ref={dialogRef} open={isOpen} className="dialog">
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}
                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button
                  onClick={logoutHandler}
                  className=" text-white p-1 rounded"
                >
                  Sign Out
                </button>
              </div>
            </dialog>
          </nav>
        ) : (
          <Link to={"/login"}>
            <div className="flex items-center justify-center gap-2">
              <FaUserCircle size={25} /> Login
            </div>
          </Link>
        )}
        <Link to={"/cart"}>
          <button>
            <GiShoppingBag size={35} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
