export const nrBetween = (min, max, whole = false) => {
  const res = Math.random() * (max - min) + min;
  return whole ? Math.floor(res) : res;
};
