// Import bcrypt for password --> https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
// eslint-disable-next-line valid-jsdoc
/**
 * Password generator function
 * @param {*} passwordNotYetHashed
 * @returns
 */
const passwordGenerator = async (passwordNotYetHashed) => {
  // Salt generation for hashing
  const salt = await bcrypt.genSalt();
  // Generate hash password
  const hashedPassword = await bcrypt.hash(passwordNotYetHashed, salt);

  // Return
  return hashedPassword;
};

// Module export
module.exports = passwordGenerator;
