export default function formatMoney(n, symbol = true) {
  try {
    const formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (symbol) {
      return `$${formatted}`;
    }
    return formatted;
  } catch {
    return '';
  }
}