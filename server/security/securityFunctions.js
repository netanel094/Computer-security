const config = require("../config.json");
const validator = require("validator");
const crypto = require("crypto");

const isValidEmail = (email) => {
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const checkPassword = (password) => {
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numbersRegex = /\d/;
  const specialRegex = /[!@#$%^&)(+=._-]/;
  const seqs = config.password.avoid_sequence;
  if (seqs.some((seq) => password.includes(seq)))
    return "password contains a sequence";

  if (!uppercaseRegex.test(password) && config.password.chars.uppercase)
    return "uppercase letter";

  if (!numbersRegex.test(password) && config.password.chars.numbers)
    return "number";

  if (!specialRegex.test(password) && config.password.chars.special)
    return "special character";

  if (!lowercaseRegex.test(password) && config.password.chars.lowercase)
    return "lowercase letter";

  if (password.length < config.password.length)
    return `length must be more than ${config.password.length}`;

  return "all required elements";
};

const checkPhone = (phoneNumber) => {
  let phoneRegEx = /^[0-9]{10}$/;
  return phoneRegEx.test(phoneNumber);
};

const inputValidate = (userInput) => {
  if (userInput === "") return true;

  return validator.escape(userInput);
};

const secret = process.env.HASH_SECRET;
const iterations = parseInt(process.env.HASH_ITERATIONS);
const keylen = parseInt(process.env.PASSWORD_KEYLEN);
const digest = process.env.HASH_TYPE;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, secret, iterations, keylen, digest, (err, key) => {
      if (err) return reject(err);

      return resolve(key.toString("hex"));
    });
  });
}

const verifyPasswordMatchToHash = (password, hashed_password) => {
  return hashPassword(password) == hashed_password;
};

module.exports = {
  inputValidate,
  checkPhone,
  checkPassword,
  isValidEmail,
  hashPassword,
  verifyPasswordMatchToHash,
};
