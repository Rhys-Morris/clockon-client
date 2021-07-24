// Sort an array new to old by the due_date property
const sortByDueDateFirst = (array) =>
  array.sort((a, b) =>
    new Date(a.due_date).getTime() > new Date(b.due_date).getTime() ? 1 : -1
  );
const sortByDueDateLast = (array) =>
  array.sort((a, b) =>
    new Date(a.due_date).getTime() > new Date(b.due_date).getTime() ? -1 : 1
  );

export { sortByDueDateFirst, sortByDueDateLast };
