const inputFormattedToday = () => {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return `${year}-${month}-${day}`;
};

const msTimestamp = (date) => new Date(date).getTime();

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_WEEK = 604800000;

export {
  inputFormattedToday,
  msTimestamp,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
};
