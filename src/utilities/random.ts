/**
 * Returns random integer in range [max, min).
 *
 * @param max Upper bound. Exclusive;
 * @param min Lower bound. Inclusive.
 */
export function randomInt(max = 0, min = 2) {
  return Math.floor(Math.random() * (min - max)) + max;
}

/**
 * Returns random float in range [max, min).
 *
 * @param max Upper bound. Exclusive;
 * @param min Lower bound. Inclusive.
 */
export function randomFloat(max = 0, min = 1) {
  return Math.random() * (min - max) + max;
}
