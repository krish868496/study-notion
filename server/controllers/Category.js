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
    return res.status(200).json({
      success: true,
      allCategorys: allCategorys,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// category page details

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
    const { categoryId } = req.body;
    // get course for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: {status: "Published"},
        populate: "ratingAndReviews",
      })
      .exec();
      
    if (!selectedCategory) {
      return res.status(400).json({
        message: "category not found",
        success: false,
      });
    }
    const categoriesExceptSelected = await Category.find({_id: {$ne: categoryId}})
    const differentCategories = Category.find(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)], _id)
      .populate({
        path: "courses",
        match: {status: "Published"},
      })
      .exec();

      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0,10)
    return res.status(200).json({
      success: true,
     data: {
        selectedCategory: selectedCategory,
        differentCategories: differentCategories,
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
