const express = require('express');
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  deleteBootcamps,
} = require('../Controllers/bootcamp');

// Include other resource routers
const courseRouter = require('./courses');

//Re-route into other resource routers
router.use('/:bootcampId/courses', coursesRouter);
// router.route('/').get(getBootcamps).post(createBootcamps);

router.post('/user', createBootcamps);

// router.route('/:id').get(getBootcamps).delete(deleteBootcamp);
module.export = router;
