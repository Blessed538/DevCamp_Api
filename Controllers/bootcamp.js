const Bootcamp = require('../Models/Bootcamp');
const ErrorResponse = require('../Utils/errResponse');
// const errorResponse = require('../Utils/errResponse');

// @desc Get all bootcamps
// @route Get/api/V1/bootcamps
//@access public
exports.getBootcamps = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    //fields to exclude
    const removeFields = ['select'];
    //loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    //Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Executing query
    query = Bootcamp.find(JSON.parse(queryStr));
    const bootcamps = await query;

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    query = query.skip(startIndex).limit(limit);
    const total = await Bootcamp.countDocuments();

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res
      .status(200)
      .json({ success: true, count: bootcamps, data: bootcamps, pagination });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get all bootcamp
// @route Get/api/V1/bootcamps/:id
//@access public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      // return res.status(400).json({ success: false });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc Post all bootcamps
// @route Post/api/V1/bootcamps
//@access public
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc Update  bootcamp
// @route PUt/api/V1/bootcamps/:id
//@access public
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc Delete  bootcamp
// @route DELETE/api/V1/bootcamps/:id
//@access public
exports.deleteBootcamps = (req, res, next) => {
  try {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
  } catch (err) {
    next(err);
  }
};
