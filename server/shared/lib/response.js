
const createResponse = (res, message, data) => {
  res.status(201).json({
    success: true,
    status: 201,
    message,
    data
  });
}

const response200 = (res, message, data) => {
  res.status(200).json({
    success: true,
    status: 200,
    message,
    data
  });
}

module.exports = {
  createResponse,
  response200
}
