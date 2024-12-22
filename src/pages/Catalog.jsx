import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  //   fetch all categories
  console.log(catalogPageData?.data?.selectedCategory?.courses)
  useEffect(() => {
    const getCategory = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const categoryId = res?.data?.allCategorys?.filter(
        (ct) => ct?.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(categoryId);
    };
    getCategory();
  }, [catalogName]);
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        if (res) {
          setCatalogPageData(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);
  return (
    <>
      <div className="w-9/12 py-5 mx-auto text-richblack-5">
        <div className="text-richblack-5">
          <p className="text-[14px] leading-[22px] font-normal text-richblack-500">
            {`Home / Catalog / `}{" "}
            <span className="text-yellow-100">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <h1 className="text-[30px] leading-[38px] font-medium font-inter">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="text-[14px] leading-[22px] font-normal text-richblack-500">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>
      <div className="bg-richblack-800">
        <div className="w-9/12 py-5 mx-auto text-richblack-5 ">
          {/* section 1  */}
          <div className="">
            <h2 className="text-[30px] font-semibold leading-[58px] ">
              Courses to get you started
            </h2>
            <div className="flex py-2 my-2 border-b border-richblack-300 gap-x-3 text-richblack-300 ">
              <p className="text-[14px] leading-[22px] font-normal">
                Most Popular
              </p>
              <p className="text-[14px] leading-[22px] font-normal">New</p>
              <p className="text-[14px] leading-[22px] font-normal">Trending</p>
            </div>
            <div className="my-5">
              <CourseSlider
                courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* section 2  */}
          <div>
            <p>
              Top Courses in {catalogPageData?.data?.selectedCategory?.name}{" "}
            </p>
            <div>
              <CourseSlider
                courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
          {/* section 3  */}
          <div>
            <p>Frequently Bought</p>
            <div className="py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses?.map(
                  (course, index) => (
                    <Course_Card key={index} course={course} Height={"400px"} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
