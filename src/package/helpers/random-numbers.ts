export const getRandomNumbers = () => {
  const array = [0, 1, 2, 3];
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomNumber = (array: any) => {
  return Math.floor(Math.random() * array.length);
};
