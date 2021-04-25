import { login } from '../constants/index';

export const validateEmail = (email) => {
  if (login.VALID_EMAIL_REGEX.test(email)) {
    return true;
  }
  // window.alert('You have entered an invalid email address!');
  return false;
};

export const validatePassword = (password) => {
  if (password.length < login.MIN_PASSWORD_LENGTH) {
    return false;
  }
  // window.alert('You have entered an invalid email address!');
  return true;
};
