function alternatePath(string) {
  if (string.includes('/comidas')) return '/bebidas';
  return '/comidas';
}

export default alternatePath;
