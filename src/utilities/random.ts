export function randomInt(start = 0, end = 2) {
  return Math.floor(Math.random() * (end - start)) + start;
}

export function randomFloat(start = 0, end = 1) {
  return Math.random() * (end - start) + start;
}
