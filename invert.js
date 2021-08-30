const invert = (obj) => {
  return Object.keys(obj).reduce((prev, key) => (
    {
        ...prev,
        [obj[key]]: key
      }
  ), {});
}