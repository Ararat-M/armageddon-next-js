export function formatDateForUi(date: string) {
  const months = [
    "янв", "фев", "марта", "апр", "мая", "июня",
    "июля", "авг", "сент", "окт", "ноя", "дек"
  ];

  const parts = date.split("-");
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (!isNaN(month) && !isNaN(day)) {
    return `${day} ${months[month - 1]} ${year}`;
  } else {
    return date.trim();
  }
}