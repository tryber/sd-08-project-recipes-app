export function saveOnStorage(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

export function loadFromStorage(key) {
  const stringValue = localStorage.getItem(key);
  return JSON.parse(stringValue);
}

export function validateLogin(email, passLength) {
  const regexEmail = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/i;
  const minPassLength = 7;
  return !(passLength >= minPassLength && email.match(regexEmail));
}

export function makeListWithObj(objParam, keyBase) {
  const keyList = [];
  const response = [];
  Object.keys(objParam).forEach((e) => e.includes(keyBase) && keyList.push(e));
  keyList.forEach((e) => {
    const actualValue = objParam[e];
    if (actualValue !== null && actualValue !== '') {
      response.push(actualValue);
    }
  });
  return response;
}

export function embedLink(watchLink) {
  const cuttedLink = watchLink.split('watch?v=');
  const [base, id] = cuttedLink;
  return `${base}embed/${id}`;
}
