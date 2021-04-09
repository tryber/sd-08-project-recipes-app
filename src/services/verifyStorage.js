function verifyStorage(id, done) {
  let returnDone = true;
  const storage = JSON.parse(localStorage.getItem(done)) || [];

  if (storage && storage.length) {
    storage.find((item) => {
      if (item.id === id) {
        returnDone = false;
      }
      return null;
    });
  } else {
    returnDone = true;
  }

  return returnDone;
}

export default verifyStorage;
