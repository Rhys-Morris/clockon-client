const inputFormattedToday = () => {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return `${year}-${month}-${day}`;
};

const inputFormattedTimestamp = (timeStamp, dateOnly = false) => {
  const dateObj = new Date(timeStamp);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (dateOnly) return `${year}-${month}-${day}`;
  const hour = dateObj.getHours() + 1;
  const minute = dateObj.getMinutes() + 1;
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

const msTimestamp = (date) => new Date(date).getTime();

const msToTimer = (ms) => {
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
  const { hours, mins, secs } = time;
  return `${String(hours).padStart(2, 0)}:${String(mins).padStart(
    2,
    0
  )}:${String(secs).padStart(2, 0)}`;
};

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
    formatted += time.hours === 1 ? "1 hr" : `${time.hours} hrs`;
  }
  if (time.mins !== 0) {
    if (formatted && time.secs === 0) formatted += " & ";
    if (formatted && time.secs > 0) formatted += ", ";
    formatted += time.mins === 1 ? "1 min" : `${time.mins} mins`;
  }
  if (time.secs !== 0) {
    if (formatted) formatted += " & ";
    formatted += time.secs === 1 ? "1 sec" : `${time.secs} secs`;
  }
  return formatted;
};

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_WEEK = 604800000;
const MILLISECONDS_IN_FORTNIGHT = 1209600000;

export {
  inputFormattedToday,
  inputFormattedTimestamp,
  msTimestamp,
  msToFormattedTime,
  msToTimer,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_FORTNIGHT,
};
