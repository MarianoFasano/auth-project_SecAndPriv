// Jwt import
const jsonwebtoken = require('jsonwebtoken');
// .env import
require('dotenv').config();

/**
 * Token generator function
 * @param {*} user
 * @returns
 */
const tokenGenerator = (user) => {
  // User id
  const email = user.email;
  // Expiration time: 15m
  const expiresIn = '15m';
  // Payload
  const payload = {
    sub: email,
    iat: Date.now(),
  };

  // Create the token
  // eslint-disable-next-line max-len
  const signedToken = jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiresIn});
  // Return
  return {
    token: signedToken,
    expiresIn: expiresIn,
  };
};

// Function export
module.exports = tokenGenerator;
