export function formatNumber(number: number) {
  return Math.floor(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}