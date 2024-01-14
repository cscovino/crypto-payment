export const formatDate = (date: string, locale: string = 'es') => {
  const dateObject = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObject);
};
