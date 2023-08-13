export function formatName(input: string) {
  const regex = /\((\d+)\s*([A-Z0-9]+)\)/;
  const match = input.match(regex);

  if (match) {
    const year = match[1];
    const code = match[2];
    return year + " " + code;
  } else {
    return input.trim();
  }
}