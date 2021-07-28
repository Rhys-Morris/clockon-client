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

const msToFormattedTime = (ms) => {
  let start = ms;
  const time = { hours: 0, mins: 0, secs: 0 };
  while (start > 0) {
    if (start >= 3600000) {
      time.hours += 1;
      start = start - 3600000;
    } else if (start >= 60000) {
      time.mins += 1;
      start = start - 60000;
    } else {
      time.secs += 1;
      start = start - 1000;
    }
  }
  let formatted = "";
  if (time.hours !== 0) {
    formatted += time.hours === 1 ? "1 hour" : `${time.hours} hours`;
  }
  if (time.mins !== 0) {
    if (formatted && time.secs === 0) formatted += " and ";
    if (formatted && time.secs > 0) formatted += ", ";
    formatted += time.mins === 1 ? "1 minute" : `${time.mins} minutes`;
  }
  if (time.secs !== 0) {
    if (formatted) formatted += " and ";
    formatted += time.secs === 1 ? "1 second" : `${time.secs} seconds`;
  }
  return formatted;
};

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_WEEK = 604800000;

export {
  inputFormattedToday,
  msTimestamp,
  msToFormattedTime,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
};
