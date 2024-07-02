import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'

const tabsName=[
        "Free",
        "New to coding",
        "Most popular",
        "Skill paths",
        "Career paths",
]

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore.courses[0])
  const [currentCard, setCurrentCard] = useState(HomePageExplore.courses[0].heading);
  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.filter()
  }
  return (
    <div>
        <h2 className='text-4xl font-semibold text-center '>Unlock the 
          <HighlightText text={"Power of Code"} />
        </h2>
        <p className='text-center text-richblack-300 text-base my-3'>Learn to build anything you can imagine</p>
        <div className='flex rounded-full 
         bg-richblack-800 my-5 border-richblack-100 p-1'>
          {
            tabsName.map((tab, index) => (
              <button
                key={index}
                className={`text-[16px] font-semibold ${currentTab === tab? 'text-white bg-richblack-800 hover:bg-richblack-900' : 'text-richblack-300 hover:text-richblack-600'}`}
                onClick={() => setMyCards(tab)}>
                {tab}
              </button>
            ))
          }
        </div>
        <div className="lg:h-[150px]"></div>
      <div className="absolute flex lg:flex-row gap-10 justify-between w-full ">
        {
          courses.map((element, index) => {
            return(
              <CourseCard key={index} cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ExploreMore