export default function login(email) {
  return {
    type: 'USER_LOGIN',
    payload: email,
  };
}
