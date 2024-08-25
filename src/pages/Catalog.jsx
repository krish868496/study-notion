import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  console.log(catalogPageData, "catalog page data")
  const [categoryId, setCategoryId] = useState("");
  //   fetch all categories
  useEffect(() => {
    const getCategory = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const categoryId = res?.data?.allCategorys?.filter(
        (ct) => ct?.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(categoryId);
    };
    getCategory();
  }, []);
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log(res, "res");
        if(res){
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
    <div className="text-richblack-5">
      <div className="text-richblack-5">
        <p>
          {`Home / Catalog / `}{" "}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>
      <div>
        {/* section 1  */}
        <div>
          <h2>Courses to get you started</h2>
          <div className="flex gap-x-3">
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>
        {/* section 2  */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
          <div>
            {/* <CourseSlider
              courses={catalogPageData?.data?.differentCategory?.courses}
            /> */}
          </div>
        </div>
        {/* section 3  */}
        <div>
          <p>Frequently Bought</p>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* {catalogPageData?.data?.mostSellingCourses?.slice?.map(
                (course, index) => (
                  <Course_Card key={index} course={course} Height={"400px"} />
                )
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
