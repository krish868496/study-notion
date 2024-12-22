const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");

// create Category handler

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(name, description);

    // validation
    if (!name || !description) {
      return res.status(403).json({
        message: "all fields are required",
        success: false,
      });
    }

    // create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      CategoryDetails: categoryDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategorys = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    );
    if(allCategorys.length > 0){
    return res.status(200).json({
      success: true,
      allCategorys: allCategorys,
    });
  }else{
    return res.status(200).json({
      success: true,
      message: "No categories found",
    });
  }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// category page details

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
    const { categoryId } = req.body;
    // convert string into object
    const id = new mongoose.Types.ObjectId(categoryId.trim());
    // get course for specified categoryId
    const selectedCategory = await Category.findById({ _id: id })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
          populate: {
            path: "courses",
          },
        },
      })
      .exec();

    if (!selectedCategory) {
      return res.status(400).json({
        message: "category not found",
        success: false,
      });
    }
    const categoriesExceptSelected = await Category.find({ _id: { $ne: id } })
      .populate({
        path: "courses", // Field to populate
        match: { status: "Published" }, // Only include courses with status 'Published'
        populate: {
          path: "instructor",
          populate: { path: "courses" }, // Populate additional fields, like instructor
        }, // Populate additional fields, like instructor
      })
      .exec();
    console.log(categoriesExceptSelected, "category except selected");

    const randomIndex = getRandomInt(categoriesExceptSelected.length);
    const differentCategory = await Category.findById(
      categoriesExceptSelected[randomIndex]._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    const allCourses = categoriesExceptSelected.flatMap(
      (category) => category.courses
    );
    console.log(allCourses, "allCourses");

    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    console.log(mostSellingCourses, "mostSellingCourses");
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory: selectedCategory,
        differentCategory: differentCategory,
        mostSellingCourses: mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
