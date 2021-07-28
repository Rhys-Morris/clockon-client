// Sort an array new to old by the due_date property
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

const sortByDueDateFirst = (array) =>
  array.sort((a, b) =>
    new Date(a.due_date).getTime() > new Date(b.due_date).getTime() ? 1 : -1
  );
const sortByDueDateLast = (array) =>
  array.sort((a, b) =>
    new Date(a.due_date).getTime() > new Date(b.due_date).getTime() ? -1 : 1
  );

export { sortByDate, sortByDueDateFirst, sortByDueDateLast };
