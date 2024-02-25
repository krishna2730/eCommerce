const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

const verifyToken = (req, res, next) => {
  var token = req.headers['authorization'];
  try {
    if (!token) {
      throw createHttpError(401,"A token is required for authentication");
    }
  
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
      req.auth = decoded.userId;
      // res.status(200).json({status:'success',data: {tokenData: decoded}})
    } catch (error) {
      throw createHttpError(401,"Invalid or expired token");
    }
  } catch (error) {
    next(error)
  }

  return next();
};

module.exports = verifyToken;
