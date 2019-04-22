/* eslint-disable no-use-before-define */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable no-control-regex */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { isEmpty } from '../utils/utils';

const TEXT_FIELD_REG = /[a-zA-Z\-'\s]+/;
const EMAIL_FIELD_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let ERROR_MESSAGES = [];


/**
 * Checks if and email is valid or not
 * @param {string} email
 * @returns {string|null} matched string or null if nothing is fine
 */
const validateEmail = (email) => {
  if (isEmpty(email)) {
    ERROR_MESSAGES.push('email field is empty');
  }
  if (!EMAIL_FIELD_REG.test(email)) {
    ERROR_MESSAGES.push('Invalid email address');
  }
  return true;
};

/**
 * Checks if firstName and lastName are valid
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string|null}
 */
const validateNameFields = (lastName, firstName) => {
  if (isEmpty(firstName)) {
    ERROR_MESSAGES.push('firstName field required');
  }
  if (!isEmpty(firstName) && !TEXT_FIELD_REG.test(firstName)) {
    ERROR_MESSAGES.push('Invalid first name');
  }
  if (!isEmpty(lastName) && !TEXT_FIELD_REG.test(lastName)) {
    ERROR_MESSAGES.push('Invalid last name');
  }
  if (isEmpty(lastName)) {
    ERROR_MESSAGES.push('lastName field required');
  }
};

function getErrorMessages() {
  return ERROR_MESSAGES;
}
/**
 * Checks if both confirm password and password fields match
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 *
 */
function validatePassword(password, confirmPassword) {
  if (isEmpty(password)) {
    ERROR_MESSAGES.push('password field is required');
  }
  if (isEmpty(confirmPassword)) {
    ERROR_MESSAGES.push('confirm password field required');
  }
  if (!(password === confirmPassword)) {
    ERROR_MESSAGES.push('password and confirm password fields do not match');
  }
}

/**
 * Checks if both confirm password and password fields match
 * @param {string} req
 * @param {string} res
 *
 */
export default function signUpValidation(req, res, next) {
  const { lastName, firstName, email, password, confirmPassword } = req.body;

  validateNameFields(lastName, firstName);

  validateEmail(email);

  validatePassword(password, confirmPassword);

  if (ERROR_MESSAGES.length === 0) {
    next();
  } else {
    res.json({ status: 400, message: getErrorMessages() });
    ERROR_MESSAGES = [];
  }
}
