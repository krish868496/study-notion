import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/logoFullLight.png'
import NavbarLinks from '../../data/navbar-links'

const Navbar = () => {
        const location = useLocation();
        const matchRoute = (route) =>{
                return matchPath({path:route}, location.pathname)
        }
  return (
    <div className='h-14  border-b-[1px] border-b-richblack-700'>
        <div className="w-11/12 mx-auto max-w-maxContent flex items-center justify-between">
        <Link to={'/'}>
                <img src={logo} alt="logo" loading='lazy' className='' />
        </Link>
        <nav>
         <ul className="flex gap-x-6 text-richblack-25">
                {
                      NavbarLinks.map((link, index) => {
                        return (
                          <li key={index}>
                            {link.title === "Catalog" ? (
                              ""
                            ) : (
                              <Link to={link?.path}>
                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}> {link?.title}</p>
                              </Link>
                            )}
                          </li>
                        );
                      })  
                }
         </ul>
        </nav>
        {/* login/signup/dashboard  */}
        <div className='flex gap-x-4 items-center '>

        </div>
        </div>

    </div>
  )
}

                                                export default Navbar