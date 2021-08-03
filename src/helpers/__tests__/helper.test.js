import {
  formatTimestamp,
  sortByDate,
  sortByNumeric,
  getToken,
  destroySession,
  formattedWorkPeriodDuration,
  sum,
  validateEmail,
  convertWorkToHours,
  fortnightTimestamp,
  weekTimestamp,
  workPeriodsBetweenTimestamps,
} from "../helper";

describe(sortByDate, () => {
  const testArray = [
    { date: "2021-08-01 09:23:45.609001000 +0000" },
    { date: "2021-08-02 09:24:30.302428000 +0000" },
    { date: "2021-08-01 11:24:30.302428000 +0000" },
  ];
  it("should sort an array with a timestamp property first to last", () => {
    expect(sortByDate(testArray, "first", "date")).toEqual([
      { date: "2021-08-01 09:23:45.609001000 +0000" },
      { date: "2021-08-01 11:24:30.302428000 +0000" },
      { date: "2021-08-02 09:24:30.302428000 +0000" },
    ]);
  });
  it("should sort an array with a timestamp property last to first", () => {
    expect(sortByDate(testArray, "last", "date")).toEqual([
      { date: "2021-08-02 09:24:30.302428000 +0000" },
      { date: "2021-08-01 11:24:30.302428000 +0000" },
      { date: "2021-08-01 09:23:45.609001000 +0000" },
    ]);
  });
});

describe(sortByNumeric, () => {
  const testArray = [{ number: 1 }, { number: 3 }, { number: 2 }];
  it("should sort an array with a numeric property first to last", () => {
    expect(sortByNumeric(testArray, "first", "number")).toEqual([
      { number: 1 },
      { number: 2 },
      { number: 3 },
    ]);
  });
  it("should sort an array with a numeric property last to first", () => {
    expect(sortByNumeric(testArray, "last", "number")).toEqual([
      { number: 3 },
      { number: 2 },
      { number: 1 },
    ]);
  });
});

describe(formatTimestamp, () => {
  it("should return a single string when passed a date and time", () => {
    expect(formatTimestamp("11/05/21", "11:30")).toEqual("11/05/21 11:30");
  });
});

// TOKEN retrieval and deletion
describe("Token storage", () => {
  const sessionStorageMock = (() => {
    let store = {};

    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, "sessionStorage", {
    value: sessionStorageMock,
  });

  describe("should be able to get a token from storage", () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, "getItem");
    window.sessionStorage.setItem("token", "secret");
    expect(getToken()).toEqual("secret");
    expect(getItemSpy).toBeCalledWith("token");
  });

  describe("should clear token from storage", () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, "getItem");
    window.sessionStorage.setItem("token", "secret");
    expect(getToken()).toEqual("secret");
    destroySession();
    expect(getToken()).toEqual(null);
  });
});

describe(formattedWorkPeriodDuration, () => {
  it("should return null when passed a falsy value", () => {
    expect(formattedWorkPeriodDuration(undefined)).toEqual(null);
  });
  it("should return 'Project not started' when passed an empty array", () => {
    expect(formattedWorkPeriodDuration([])).toEqual("Project not started");
  });
  const testArray = [
    {
      end_time: "2021-07-23 01:58:00.000000000 +0000",
      start_time: "2021-07-22 21:54:00.000000000 +0000",
    },
    {
      end_time: "2021-07-29 23:56:00.000000000 +0000",
      start_time: "2021-07-29 21:54:00.000000000 +0000",
    },
  ];
  it("should return a formatted time duration when passed a work period array", () => {
    expect(formattedWorkPeriodDuration(testArray)).toEqual("6 hrs & 6 mins");
  });
});

describe(sum, () => {
  it("should return null when passed a falsy value", () => {
    expect(sum(undefined)).toEqual(null);
  });
  it("should return a summed numeric value", () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });
});

describe(validateEmail, () => {
  it("should return true for a valid email", () => {
    expect(validateEmail("rhys@test.com")).toBeTruthy();
  });
  it("should return false for an invalid email", () => {
    const invalidEmails = ["rhys", "tests.com", "test@test..com"];
    invalidEmails.forEach((email) => expect(validateEmail(email)).toBeFalsy());
  });
});

describe(convertWorkToHours, () => {
  const testArray = [
    {
      end_time: "2021-07-23 01:58:00.000000000 +0000",
      start_time: "2021-07-22 21:54:00.000000000 +0000",
    },
    {
      end_time: "2021-07-29 23:56:00.000000000 +0000",
      start_time: "2021-07-29 21:54:00.000000000 +0000",
    },
  ];
  it("should return the correct output", () => {
    expect(convertWorkToHours(testArray).length).toEqual(2);
    expect(convertWorkToHours(testArray)[0]).toBeCloseTo(4.066);
    expect(convertWorkToHours(testArray)[1]).toBeCloseTo(2.033);
  });
});

describe(fortnightTimestamp, () => {
  it("should return a timestamp exactly two weeks prior when called without arguments", () => {
    const dateNowStub = jest.fn(() => 1627950712221);
    global.Date.now = dateNowStub;
    expect(Date.now()).toBe(1627950712221);
    expect(fortnightTimestamp()).toBe(1626741112221);
    expect(dateNowStub).toHaveBeenCalled();
  });
  it("should return a timestamp exactly 4 weeks prior when called with 2", () => {
    const dateNowStub = jest.fn(() => 1627950712221);
    global.Date.now = dateNowStub;
    expect(Date.now()).toBe(1627950712221);
    expect(fortnightTimestamp(2)).toBe(1625531512221);
    expect(dateNowStub).toHaveBeenCalled();
  });
});

describe(weekTimestamp, () => {
  it("should return a timestamp exactly 1 week prior when called without arguments", () => {
    const dateNowStub = jest.fn(() => 1627950712221);
    global.Date.now = dateNowStub;
    expect(Date.now()).toBe(1627950712221);
    expect(weekTimestamp()).toBe(1627345912221);
    expect(dateNowStub).toHaveBeenCalled();
  });
  it("should return a timestamp exactly 2 weeks prior when called with 2", () => {
    const dateNowStub = jest.fn(() => 1627950712221);
    global.Date.now = dateNowStub;
    expect(Date.now()).toBe(1627950712221);
    expect(weekTimestamp(2)).toBe(1626741112221);
    expect(dateNowStub).toHaveBeenCalled();
  });
});

describe(workPeriodsBetweenTimestamps, () => {
  it("should return an empty array if workPeriods is falsy", () => {
    expect(workPeriodsBetweenTimestamps(null, 1, 1)).toEqual([]);
  });
  it("should filter workPeriods correctly", () => {
    const testArray = [
      {
        end_time: "2021-07-23 01:58:00.000000000 +0000",
        start_time: "2021-07-22 21:54:00.000000000 +0000",
      },
      {
        end_time: "2021-07-29 23:56:00.000000000 +0000",
        start_time: "2021-07-29 21:54:00.000000000 +0000",
      },
    ];
    expect(
      workPeriodsBetweenTimestamps(testArray, 1627345912221, 1627950712221)
        .length
    ).toBe(1);
    expect(
      workPeriodsBetweenTimestamps(testArray, 1627345912221, 1627950712221)
    ).toEqual([
      {
        end_time: "2021-07-29 23:56:00.000000000 +0000",
        start_time: "2021-07-29 21:54:00.000000000 +0000",
      },
    ]);
  });
});
