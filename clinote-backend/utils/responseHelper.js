// utils/responseHelper.js

/**
 * Send standardized success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Response data
 */
const sendSuccessResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };
  return res.status(statusCode).json(response);
};

/**
 * Send standardized error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object} error - Error details (only in development)
 */
const sendErrorResponse = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  const response = {
    success: false,
    message
  };
  
  // Only include error details in development
  if (process.env.NODE_ENV !== 'production' && error) {
    response.error = error.message || error;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse
};