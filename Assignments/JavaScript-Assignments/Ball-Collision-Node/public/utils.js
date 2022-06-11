function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomColor = () => {
  let r = getRandomFromRange(0, 255);
  let g = getRandomFromRange(0, 255);
  let b = getRandomFromRange(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
};
