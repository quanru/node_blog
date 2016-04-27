export default (obj) => {
  for (const key in obj) {
    return false;
  }
  return true;
};