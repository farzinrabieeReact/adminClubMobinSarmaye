export const orderBy = (data, sort) => {
  let title = Object.keys(sort)[0];
  if (sort[title] === "asc") {
    return [...data].sort((a, b) => (a[title] > b[title] ? 1 : -1));
  }
  if (sort[title] === "desc")
    return [...data].sort((a, b) => (a[title] > b[title] ? -1 : 1));
  if (sort[title] !== "asc" || sort[title] !== "desc") {
    return data;
  }
};
