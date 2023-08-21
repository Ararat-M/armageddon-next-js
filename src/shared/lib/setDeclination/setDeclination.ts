export function setDeclination(number: number, words: string[]) {
  let num = Math.abs(number) % 100;

  if (num >= 5 && num <= 20) {
    return `${number} ${words[2]}`;
  }

  num %= 10;

  if (num === 1) {
    return `${number} ${words[0]}`;
  }

  if (num >= 2 && num <= 4) {
    return `${number} ${words[1]}`;
  }

  return `${number} ${words[2]}`;
}