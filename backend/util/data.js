export const fetchData = (query) => {
  return $.ajax({
    method: "GET",
    url: `/url`,
    data: { query },
  });
};
