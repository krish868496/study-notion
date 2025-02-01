import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logoFullLight.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  async function fetchSublinks() {
    try {
      const { data } = await apiConnector("GET", categories.CATEGORIES_API);
      if (!data.success) {
        throw new Error(data.message);
      }
      setSubLinks(data?.allCategorys);
    } catch (error) {}
  }

  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="h-14  border-b-[1px] border-b-richblack-700 flex items-center justify-center">
      <div className="flex items-center justify-between w-11/12 mx-auto max-w-maxContent">
        <Link to={"/"}>
          <img src={logo} alt="logo" loading="lazy" className="" />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">
                      <Link to={link?.path}>
                        <div
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {" "}
                          {link?.title}
                        </div>
                      </Link>
                      <IoIosArrowDropdownCircle />
                      <div className="invisible z-20 absolute left-[50%] top-[30px] -translate-x-[43%]  flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute top-0 z-10 w-6 h-6 rotate-45 rounded left-1/2 bg-richblack-5"></div>
                        {subLinks.length > 0 ? (
                          subLinks.map((subLink, index) => {
                            return (
                              <Link
                                key={index}
                                to={`/catalog/${subLink.name
                                  ?.split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="px-5 py-1 font-semibold text-richblack-800 hover:text-richblack-400"
                              >
                                {subLink?.name}
                              </Link>
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <div
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {" "}
                        {link?.title}
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        {/* login/signup/dashboard  */}
        <div className="flex items-center gap-x-4 ">
          {user && user?.accountType !== "Instructor" && (
            <Link to={`/dashboard/cart`} className="relative text-richblack-5">
              <AiOutlineShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 text-2xl font-bold text-white rounded-full bg-richblack-800">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <p className="hidden text-yellow-25 lg:block">Login</p>
              <CiLogin
                className="block text-2xl lg:hidden text-richblack-5"
                title="login"
              />
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <p className="hidden text-yellow-25 lg:block">Sign Up</p>
              <RiAccountCircleLine
                className="block text-2xl lg:hidden text-richblack-5"
                title="sign up"
              />
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
