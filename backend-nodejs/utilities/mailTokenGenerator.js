// Jwt import
const jsonwebtoken = require('jsonwebtoken');
// .env import
require('dotenv').config();

/**
 * Token generator function
 * @param {*} user
 * @returns
 */
const mailTokenGenerator = (user) => {
  // User id
  const email = user.email;

  // Payload
  const payload = {
    sub: email,
    iat: Date.now(),
  };

  // Create the token
  const signedToken = jsonwebtoken.sign(payload, process.env.MAIL_TOKEN_SECRET);
  // Return
  return {
    token: signedToken,
  };
};

// Function export
module.exports = mailTokenGenerator;
