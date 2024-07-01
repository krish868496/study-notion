import React from "react";
import CTAButton from "../HomePage/Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 lg`}>
      {/* section 1  */}
      <div className="flex flex-col lg:w-[50%] w-full gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subHeading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>
      {/* section 2  */}
      <div className="flex h-fit text-[10px] w-[100%] lg:w-[500px] ">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p className="p-[2px] text-[14px]">1</p>
          <p className="p-[2px] text-[14px]">2</p>
          <p className="p-[2px] text-[14px]">3</p>
          <p className="p-[2px] text-[14px]">4</p>
          <p className="p-[2px] text-[14px]">5</p>
          <p className="p-[2px] text-[14px]">6</p>
          <p className="p-[2px] text-[14px]">7</p>
          <p className="p-[2px] text-[14px]">8</p>
          <p className="p-[2px] text-[14px]">9</p>
          <p className="p-[2px] text-[14px]">10</p>
          <p className="p-[2px] text-[14px]">11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 text-[14px] font-bold font-mono ${codeColor}`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
