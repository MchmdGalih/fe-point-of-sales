export const formatDate = (
  value: string | Date | number,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(value));
};
