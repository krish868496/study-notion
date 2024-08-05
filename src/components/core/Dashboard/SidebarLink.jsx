import React from "react";
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  console.log(link);
  const location = useLocation();
  const dispatch = useDispatch();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 bg-yellow-700  ${
        matchRoute(link.path) ? "bg-opacity-100" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-5 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        } `}
      ></span>
      <div
        className={`flex items-center gap-x-3
         ${matchRoute(link.path) ? "text-yellow-5" : "text-richblack-300"}
        `}
      >
        {iconName}
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
