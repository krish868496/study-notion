import React from "react";
import CTAButton from '../HomePage/Button'

const LearningGridArray = [
  {
    order: -1,
    heading: "world-Class learning for",
    hightLightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 270+ leading universities and companies to flexible, affordable, job-relevant only learning to individuals and organizations worldwide",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "world-Class learning for all organizations",
    description:
      "Save time and money The Belajar curriculum for all organizations with industry needs.",
  },
  {
    order: 2,
    heading: "world-Class learning for all individuals",
    description:
      "Studynotion offers a comprehensive, affordable, and flexible learning experience for anyone, anywhere.",
  },
  {
    order: 3,
    heading: "world-Class learning for software developers",
    description:
      "Studynotion's curriculum is designed to make learning a software developer easy and enjoyable.",
  },
  {
    order: 4,
    heading: "world-Class learning for software developers",
    description:
      "Studynotion's curriculum is designed to make learning a software developer easy and enjoyable.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto lg:grid-cols-4 grid-cols-1 my-10">
      {LearningGridArray?.map((card, index) => {
        return (
                <div key={index}
                className={`${index === 0 && "lg:col-span-2"} ${card?.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"} ${card.order ===3 && "lg:col-start-2"} lg:h-[250px] `}
                >
                        {
                                card.order < 0 ? (
                                        <div className="lg:w-[90%" flex flex-col pb-5 gap-4>
                                                <h2 className="text-4xl ">{card.heading}
                                                        <HightListText text = {card?.hightLightText} />
                                                                                </h2>
                <p>{card?.description}</p>               
                <div>
                  <CTAButton active={true} linkto={card.BtnLink}></CTAButton>      </div>                  
                                        </div>
                                ) : 
                                (
                                        <div className="">
                                                 <h2>{card.heading}</h2>
                        <p>{card.description}</p>
                                        </div>
                                )
                        }
                        
                </div>
        )

      })}
    </div>
  );
};

export default LearningGrid;
