const config = require('../config.json');
const validator = require('validator');

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
    return 'password contains a sequence';

  if (!uppercaseRegex.test(password) && config.password.chars.uppercase)
    return 'uppercase letter';

  if (!numbersRegex.test(password) && config.password.chars.numbers)
    return 'number';

  if (!specialRegex.test(password) && config.password.chars.special)
    return 'special character';

  if (!lowercaseRegex.test(password) && config.password.chars.lowercase)
    return 'lowercase letter';

  if (password.length != config.password.length) return 'length';

  return 'all required elements';
};

const checkPhone = (phoneNumber) => {
  let phoneRegEx = /^[0-9]{10}$/;
  return phoneRegEx.test(phoneNumber);
};

const inputValidate = (userInput) => {
  if (userInput === '') return true;

  return validator.escape(userInput);
};

module.exports = { inputValidate, checkPhone, checkPassword, isValidEmail };
