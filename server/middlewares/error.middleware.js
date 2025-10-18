export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internel server error";

  res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
