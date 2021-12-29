const order = '23456789TJQKA';

const count = (c: Record<string, number>, a: string | number) => {
  c[a] = (c[a] || 0) + 1
  return c;
}

const getHandDetails = (hand: string) => {
  const cards = hand.split(' ');
  const faces = cards.map(a => String.fromCharCode(77 - order.indexOf(a[0]))).sort();
  const suits = cards.map(a => a[1]).sort();
  const counts: Record<string, number> = faces.reduce(count, {});
  const duplicates = Object.values(counts).reduce(count, {});
  const flush = suits[0] === suits[4];
  const first = faces[0].charCodeAt(0);
  const straight = faces.every((f, index) => f.charCodeAt(0) - first === index);

  const rank = [
    flush && straight && 1,
    duplicates[4] && 2,
    duplicates[3] && duplicates[2] && 3,
    flush && 4,
    straight && 5,
    duplicates[3] && 6,
    duplicates[2] > 1 && 7,
    duplicates[2] && 8,
    9
  ].find(Boolean) as number;

  const byCountFirst = (a: string, b: string): number => {
    const countDiff = counts[b] - counts[a]
    if (countDiff) {
        return countDiff;
    }
    return b > a ? -1 : b === a ? 0 : 1
  };

  return { rank, value: faces.sort(byCountFirst).join('') }
}

/**
 * Compare card for 2 hands
 * @param h1 {string} hands 1 ex. "4H 4C 6S 7S KD"
 * @param h2 {string} hands 2 ex. "4H 4C 6S 7S KD"
 * @returns {boolean} is hands 1 won
 */
export const compareHands = (h1: string, h2: string): number => {
  const d1 = getHandDetails(h1)
  const d2 = getHandDetails(h2)
  if (d1.rank === d2.rank) {
    if (d1.value < d2.value) {
      return 1
    } else if (d1.value > d2.value) {
      return -1
    } else {
      return 0
    }
  }
  return d1.rank < d2.rank ? 1 : -1;
}
