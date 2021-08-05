import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_FORTNIGHT,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_WEEK,
  msTimestamp,
  msToFormattedTime,
} from "./date";

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

const destroySession = () => sessionStorage.clear();

const getToken = () => sessionStorage.getItem("token");

const formattedWorkPeriodDuration = (array) => {
  if (!array) return null;
  if (array.length === 0) return "Project not started";
  return msToFormattedTime(
    array
      .map((wp) => msTimestamp(wp.end_time) - msTimestamp(wp.start_time))
      .reduce((acc, curr) => acc + curr, 0)
  );
};

const convertWorkToHours = (work, projectName = false) => {
  return !projectName
    ? work.map(
        (wp) =>
          (msTimestamp(wp.end_time) - msTimestamp(wp.start_time)) /
          MILLISECONDS_IN_HOUR
      )
    : work.map((wp) => ({
        hours: msTimestamp(wp.end_time) - msTimestamp(wp.start_time),
        project: wp.project,
      }));
};

const totalIncome = (workPeriods) => {
  return sum(
    workPeriods.map(
      (wp) =>
        ((msTimestamp(wp.end_time) - msTimestamp(wp.start_time)) /
          MILLISECONDS_IN_HOUR) *
        wp.project_rate
    )
  );
};

const mostPopularProject = (workPeriods) => {
  const hourCounts = {};
  const mappedPeriods = convertWorkToHours(workPeriods, true);
  mappedPeriods.forEach((wp) =>
    hourCounts[wp.project]
      ? (hourCounts[wp.project] += wp.hours)
      : (hourCounts[wp.project] = wp.hours)
  );
  let largest = 0;
  let projectName = null;
  Object.keys(hourCounts).forEach((project) => {
    if (hourCounts[project] > largest) {
      projectName = project;
      largest = hourCounts[project];
    }
  });
  if (largest === 0) return null;
  return [projectName, largest];
};

const sum = (array) => {
  if (!array) return null;
  return array.reduce((acc, curr) => acc + curr, 0);
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const dayTimestamp = (num = 1) => {
  return Date.now() - MILLISECONDS_IN_DAY * num;
};

const fortnightTimestamp = (num = 1) => {
  return Date.now() - MILLISECONDS_IN_FORTNIGHT * num;
};

const weekTimestamp = (num = 1) => {
  return Date.now() - MILLISECONDS_IN_WEEK * num;
};

const workPeriodsBetweenTimestamps = (workPeriods, start, end) => {
  if (!workPeriods) return [];
  return workPeriods.filter((wp) => {
    return msTimestamp(wp.end_time) > start && msTimestamp(wp.end_time) < end;
  });
};

export {
  sortByDate,
  sortByNumeric,
  formatTimestamp,
  getToken,
  destroySession,
  formattedWorkPeriodDuration,
  sum,
  totalIncome,
  mostPopularProject,
  convertWorkToHours,
  validateEmail,
  dayTimestamp,
  fortnightTimestamp,
  weekTimestamp,
  workPeriodsBetweenTimestamps,
};
