// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('Error:', err);

  // Default to 500 Internal Server Error if status code is not set
  const statusCode = err.statusCode || 500;
  
  // In development, include the full error stack trace
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Send the error response
  res.status(statusCode).json(response);
};

// 404 Not Found middleware
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
