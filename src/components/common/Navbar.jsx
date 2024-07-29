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

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  console.log(user);

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
      <div className="w-11/12 mx-auto max-w-maxContent flex items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="logo" loading="lazy" className="" />
        </Link>
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="group relative flex items-center gap-2">
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
                        <div className="absolute left-1/2 top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 z-10"></div>
                        {subLinks.length ? (
                          subLinks.map((subLink, index) => {
                            return (
                              <Link
                                key={index}
                                to={subLink?.link}
                                className="text-richblack-800 font-semibold hover:text-yellow-25 px-5 py-1"
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
        <div className="flex gap-x-4 items-center ">
          {user && user?.accountType !== "Instructor" && (
            <Link to={`/dashboard/cart`} className="relative text-richblack-5">
              <AiOutlineShoppingCart />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 text-2xl font-bold text-white bg-richblack-800 rounded-full w-5 h-5">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <p className="text-yellow-25">Login</p>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <p className="text-yellow-25">Sign Up</p>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
