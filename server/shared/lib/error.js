const error400 = (res, message) => {
  res.status(400).json({
    success: false,
    status: 400,
    message,
    data: null
  });
}

const error401 = (res, message) => {
  res.status(401).json({
    success: false,
    status: 401,
    message,
    data: null
  });
}


const error404 = (res, message) => {
  res.status(404).json({
    success: false,
    status: 404,
    message,
    data: null
  });
}

const error409 = (res, message) => {
  res.status(409).json({
    success: false,
    status: 409,
    message,
    data: null
  });
}

const error498 = (res, message) => {
  res.status(409).json({
    success: true,
    status: 498,
    message,
    data: null
  });
}

const error500 = (res, message) => {
  res.status(500).json({
    success: false,
    status: 500,
    message,
    data: null
  });
}
const error501 = (res, message) => {
  res.status(501).json({
    success: false,
    status: 501,
    message: message || 'update successful but not implemented',
    data: null
  });
}

const error504 = (res, message) => {
  res.status(504).json({
    success: false,
    status: 504,
    message,
    data: null
  });
}


module.exports = {
  error400,
  error401,
  error404,
  error409,
  error498,
  error500,
  error501,
  error504
}
