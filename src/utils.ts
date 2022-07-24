export function toEnglishNumber(value: string | number) {
  if (!value) return '';

  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return value.toString().replace(/[۰-۹]/g, match => persianDigits.indexOf(match).toString());
}

export function isValidNumber(value: string) {
  return /^[0-9۰-۹]*$/.test(value);
}
