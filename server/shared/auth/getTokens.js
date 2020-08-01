const jwt = require('jsonwebtoken');

module.exports = (data) => {
  console.log(data);

  const jwtToken = jwt.sign(data,
                            process.env.jwtSecret,
                            { expiresIn: 5 * 60 }
                            );
  const refreshToken = jwt.sign(
                                  data,
                                  process.env.refreshSecret,
                                  { expiresIn:  60 * 60 }
                               );
                               return  { jwtToken, refreshToken };
}
