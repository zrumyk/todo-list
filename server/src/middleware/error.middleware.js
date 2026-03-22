const { ZodError } = require("zod");
const ApiError = require("../exceptions/api.error");

function errorMiddleware(err, req, res, next) {
  console.error("error: ", err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  if (err.code == "P2002") {
    return res.status(400).json({
      message: "prisma error",
    });
  }

  if(err instanceof ZodError) {
    const cleanError = err.flatten().fieldErrors;

    return res.status(400).json({
        error: "data validation error",
        message: cleanError
    })
  }

  return res.status(500).json({
    error: "unpredictable error",
    message: err.message
  });
}

module.exports = errorMiddleware;