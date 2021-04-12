// https://adrianarlett.gitbooks.io/idiomatic-redux-by-dan-abramov/content/supplying-the-initial-state.html

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (userKey, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(userKey, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
