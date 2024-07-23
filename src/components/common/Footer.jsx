import React from 'react'
import { FooterLink1 } from "../../data/footer-links";


const Footer = () => {
  return (
    <div className="bg-richblack-800 text-richblack-100">
      {FooterLink1.map(({ title, links, mediaLinks }, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg leading-7 tracking-wide">
              {title}
            </h2>
            <ul>
              {links.map(({ title, link }, index) => (
                <li key={index}>
                  <a key={index} href={link} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
            {/* {
            mediaLinks?.map((icon, index) => (
              <div className="" key={index}>
                {icon}
              </div>
            ))
          } */}
          </div>
        );
      })}
    </div>
  );
}

export default Footer