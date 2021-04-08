export function getlocalStorage(key) {
  const currentKey = JSON.parse(localStorage.getItem(key));
  return currentKey;
}

export function setLocalStorage(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
}
