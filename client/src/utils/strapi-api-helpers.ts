export function getStrapiURL(path = "") {
  return `${process.env.STRAPI_URL || "http://localhost:1337"}${path}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
}
