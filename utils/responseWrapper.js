const success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};
const error = (statusCode, messsage) => {
  return {
    status: "error",
    statusCode,
    messsage,
  };
};

module.exports = {
  success,
  error,
};
