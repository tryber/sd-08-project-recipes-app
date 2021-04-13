export default (pathname) => {
  global.window = Object.create(window);
  const url = `http://localhost:3000${pathname}`;
  Object.defineProperty(window, 'location', {
    value: {
      href: url
    }
  });
}