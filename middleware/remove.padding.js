/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
export default (res, req, next) => {
  const obj = res.body;

  for (const prop in obj) {
    if (typeof obj[prop] === 'string') {
      obj[prop] = obj[prop].trim();
    }
  }
  next();
};
