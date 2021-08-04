import {
  inputFormattedTimestamp,
  formattedTaskDate,
  msTimestamp,
  msToTimer,
  msToFormattedTime,
} from "../date";

describe(inputFormattedTimestamp, () => {
  it("should return a correctly formatted date and time", () => {
    expect(inputFormattedTimestamp(1627888212118)).toEqual("2021-08-02 17:10");
  });
  it("should return only the date when passed true as second argument", () => {
    expect(inputFormattedTimestamp(1627888212118, true)).toEqual("2021-08-02");
  });
});

describe(formattedTaskDate, () => {
  it("should formate a postgreSQL timestamp to a user friendly format", () => {
    expect(formattedTaskDate("2021-08-01 09:23:45.609001000 +0000")).toEqual(
      "SUN 01 AUG"
    );
  });
});

describe(msTimestamp, () => {
  it("should return a unix UTC timestamp for a date", () => {
    expect(msTimestamp("2021-08-02 17:10")).toEqual(1627888200000);
  });
});

describe(msToTimer, () => {
  it("should return a formatted timer given a millisecond timestamp", () => {
    expect(msToTimer(3600000)).toEqual("01:00:00");
    expect(msToTimer(3600000 - 1000)).toEqual("00:59:59");
  });
});

describe(msToFormattedTime, () => {
  it("should return a formatted time given a millisecond timestamp", () => {
    expect(msToFormattedTime(3600000)).toEqual("1 hr");
    expect(msToFormattedTime(3600000 - 1000)).toEqual("59 mins & 59 secs");
    expect(msToFormattedTime(3600000 + 61000)).toEqual("1 hr, 1 min & 1 sec");
    expect(msToFormattedTime(3600000 + 62000)).toEqual("1 hr, 1 min & 2 secs");
    expect(msToFormattedTime(7200000 + 122000)).toEqual(
      "2 hrs, 2 mins & 2 secs"
    );
  });
});
