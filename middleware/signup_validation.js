/* eslint-disable no-use-before-define */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable no-control-regex */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */

const TEXT_FIELD_REG = /[a-zA-Z\-'\s]+/;
const EMAIL_FIELD_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


/**
 * Checks if and email is valid or not
 * @param {string} email
 * @returns {string|null} matched string or null if nothing is fine
 */
const validateEmail = (email) => {
  return EMAIL_FIELD_REG.test(email);
};

/**
 * Checks if firstName and lastName are valid
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string|null}
 */
const validateNameFields = (firstName, lastName) => {
  return TEXT_FIELD_REG.test(firstName) && TEXT_FIELD_REG.test(lastName);
};

/**
 * Checks if both confirm password and password fields match
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {true|false}
 *
 */
function validatePassword (password, confirmPassword) {
  return password === confirmPassword;
}

/**
 * Checks if both confirm password and password fields match
 * @param {string} req
 * @param {string} res
 *
 */
export default function signUpValidation(req, res, next) {
  const { lastName, firstName, email, password, confirmPassword } = req.body;

  const validateNamesStat = validateNameFields(lastName, firstName);

  const validateEmailStat = validateEmail(email);

  const validatePasswordStat = validatePassword(password, confirmPassword);

  if (validateNamesStat && validateEmailStat && validatePasswordStat) {
    return next();
  }

  return res.send({ status: 401, message: 'Required fields are empty or incorrect' });
}
