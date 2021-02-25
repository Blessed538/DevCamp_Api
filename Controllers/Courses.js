const Course = require('../Models/course');
const ErrorResponse = require('../Utils/errResponse');

// @desc Get all bootcamps
// @route Get/api/V1/bootcamps/:bootcampId/courses
//@access public

exports.getCourses = async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.lemgth,
    data: courses,
  });
};
