export function getLocalYYYYMMDD() {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(now.getTime() - tzOffsetMs);
  return localDate.toISOString().slice(0, 10);
}
