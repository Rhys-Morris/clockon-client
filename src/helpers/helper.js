const sortByDate = (array, direction, property) => {
  if (direction === "first") {
    return array.sort((a, b) =>
      new Date(a[property]).getTime() > new Date(b[property]).getTime() ? 1 : -1
    );
  }
  if (direction === "last") {
    return array.sort((a, b) =>
      new Date(a[property]).getTime() > new Date(b[property]).getTime() ? -1 : 1
    );
  }
};

const sortByNumeric = (array, direction, property) => {
  if (direction === "first") {
    return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }
  if (direction === "last") {
    return array.sort((a, b) => (a[property] > b[property] ? -1 : 1));
  }
};

const formatTimestamp = (date, time) => `${date} ${time}`;

export { sortByDate, sortByNumeric, formatTimestamp };
