import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";

const Home = () => {
  return (
    <div>
      {/* section 1  */}
      <div className="relative lg:w-11/12 w-full max-w-maxContent mx-auto flex flex-col items-center text-white justify-between lg:p-5">
        <Link to={"/signup"}>
          <div className="group mt-16 p-[2px] lg:mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div
              className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 
             group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-white my-4">
          <h1 className="lg:text-[36px] text-[30px] leading-8 lg:leading-[44px] lg:tracking-tight text-center">
            Empower Your Future With
            <HighlightText text={"Coding Skills"} />
          </h1>
        </div>

        <div className=" w-[90%] text-center text-lg font-bold text-richblue-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div
          className="flex gap-7 
         my-8"
        >
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton>Book a Demo</CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row flex-col"}
            heading={
              <div className="text-4xl font-bold">
                'Unlock your'
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Welcome to Study Notion</title>
</head>

<body>
Welcome to Study Notion, where students learn and instructors teach. Join our community for enriching educational experiences!
</body>

</html> `}
            codeColor={"text-yellow-25"}
          />
        </div>
        {/* code section 2  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold lg:w-[240px]">
                Start
                <HighlightText text={"coding in seconds "} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "continue lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Welcome to Study Notion</title>
</head>

<body>
Welcome to Study Notion, where students learn and instructors teach. Join our community for enriching educational experiences!
</body>

</html> `}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>

      {/* section 2  */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="home_bg h-[320px] lg:w-11/12 lg:max-w-maxContent w-full flex gap-7 text-white mx-auto justify-center items-center">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex items-center gap-4">
              Explore Full Catalog
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto justify-between flex flex-col items-center gap-7">
        <div className="flex justify-center gap-10">
          <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a{" "}
              <HighlightText text={"Job that is in demand"} />{" "}
          </div>

          <div className="flex flex-col items-start gap-10 w-[40%] ">
            <div className="text-[16px]">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkto={"signup"}>
              Learn More
            </CTAButton>
          </div>

        </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3  */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white">
      <InstructorSection />
      <h2 className="text-center text-4xl font-semibold my-10">Review from Other Learner</h2>
      {/* Review slider  */}
      </div>
      {/* footer  */}
    </div>
  );
};

export default Home;
