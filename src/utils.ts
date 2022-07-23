export function toEnglishNumber(value: string | number) {
  if (!value) return '';

  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return value
    .toString()
    .replace(/[۰-۹]/g, (match) => persianDigits.indexOf(match).toString());
}
