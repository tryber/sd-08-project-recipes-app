export const findKey = (array, value) => Object.entries(array).map((nome) => {
  if (nome[0].includes(value)) {
    return nome[1];
  }
  return undefined;
}).filter((element) => element !== undefined && element !== '' && element !== null);

export const etc = 0;
