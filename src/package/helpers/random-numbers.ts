export const getRandomNumbers = (array: any) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomNumber = (array: any) => {
  return Math.floor(Math.random() * array.length);
};
