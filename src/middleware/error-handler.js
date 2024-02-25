const { HttpError } = require("http-errors");

const  errorHandler = async(err,req,res,next) => {
  console.log("Error handler", err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      stack: err.stack
    });
  }
}


module.exports = errorHandler;