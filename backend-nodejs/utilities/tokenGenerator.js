// Jwt import
const jsonwebtoken = require('jsonwebtoken');
// .env import
require('dotenv').config();

// eslint-disable-next-line valid-jsdoc
/**
 * Token generator function
 * @param {*} user
 * @returns
 */
const tokenGenerator = (user) => {
  // User id
  const id = user.id;
  // Expiration time: 1w
  const expiresIn = '1w';
  // Payload
  const payload = {
    sub: id,
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
