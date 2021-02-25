const express = require('express');
const dotnev = require('dotenv');
const morgan = require('morgan');
const connectBD = require('./Config/db');
const errorHandler = require('./Middleware/error_handling');
const bootcamps = require('./Routes/bootcamp');
const courses = require('./Routes/courses');

// Load env vars
dotnev.config({ path: './Config/config.env' });

connectBD();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body Parser
app.use(express.json());
//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exist process
  ServiceWorkerRegistration.close(() => process.exist(1));
});
