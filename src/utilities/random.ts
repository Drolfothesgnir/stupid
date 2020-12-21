/**
 * Returns random integer in range [max, min).
 *
 * @param max Upper bound. Exclusive;
 * @param min Lower bound. Inclusive.
 */
export function randomInt(min = 0, max = 2) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns random float in range [max, min).
 *
 * @param max Upper bound. Exclusive;
 * @param min Lower bound. Inclusive.
 */
export function randomFloat(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}
