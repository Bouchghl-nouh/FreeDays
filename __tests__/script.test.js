const { FreeDays } = require("../script");
const { holidays, days } = require("../data/holidays");
const { getHolidayDate } = require("../helpers/utils");

describe("FreeDays class", () => {
  test("should set country and year in constructor", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.country).toBe("Mar");
    expect(f.year).toBe(2023);
  });
  test("should throw an error for unsupported country", () => {
    expect(() => new FreeDays("Fra")).toThrow("unknown country : Fra");
  });
  test("should correctly count weekend holidays for 2025", () => {
    const f = new FreeDays("Mar", 2025);
    expect(f.countWeekendHolidays()).toBe(1);
  });
  test("should correctly count weekend holidays for 2023", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.countWeekendHolidays()).toBe(5);
  });
  test("should return true if the given date is a holiday", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.isHoliday("2023-01-11")).toBe(true);
  });

  test("should return false if the given date is not a holiday", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.isHoliday("2023-02-01")).toBe(false);
  });
  test("should throw an error when isHoliday receives an invalid date", () => {
    const f = new FreeDays("Mar", 2023);
    expect(() => f.isHoliday("23ljadf")).toThrow("not a date");
  });
});
describe("FreeDays methods with mocked dates", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test("should return the correct list of remaining holidays", () => {
    const mockToday = new Date("2025-11-01");
    jest.setSystemTime(mockToday);
    const f = new FreeDays("Mar", 2025);
    const result = f.getRemainingHolidays();
    const expected = [
      {
        date: new Date("2025-11-06"),
        formatted: new Date("2025-11-06").toDateString(),
        day: days[new Date("2025-11-06").getDay()],
      },
      {
        date: new Date("2025-11-18"),
        formatted: new Date("2025-11-18").toDateString(),
        day: days[new Date("2025-11-18").getDay()],
      },
    ];
    expect(result).toEqual(expected);
  });
  test("should count remaining holidays from the mocked current date", () => {
    const mockToday = new Date("2025-01-01");
    jest.setSystemTime(mockToday);
    const f = new FreeDays("Mar", 2025);
    const result = f.countRemainingHolidays();
    expect(result).toBe(10);
  });
  test("should return the next upcoming holiday even if it's in the next year", () => {
    const mockToday = new Date("2025-12-25");
    jest.setSystemTime(mockToday);
    const expected = {
      date: new Date("2026-01-01"),
      formatted: new Date("2026-01-01").toDateString(),
      day: days[new Date("2026-01-01").getDay()],
    };
    const f = new FreeDays("Mar", 2025);
    const result = f.getNextHoliday();
    expect(result).toEqual(expected);
  });
  test("should list holidays that fall on default weekend days", () => {
    const mockToday = new Date("2025-01-01");
    jest.setSystemTime(mockToday);
    const f = new FreeDays("Mar", 2025);
    const res = f.getWeekendHolidays();
    const expected = [
      {
        date: new Date("2025-01-11"),
        formatted: new Date("2025-01-11").toDateString(),
        day: days[new Date("2025-01-11").getDay()],
      },
    ];
    expect(res).toEqual(expected);
  });
  test("should detect weekend holidays using custom weekend (Thu, Fri)", () => {
    const mockToday = new Date("2025-01-01");
    jest.setSystemTime(mockToday);
    const f = new FreeDays("Mar", 2025);
    const res = f.getWeekendHolidays("Thu", "Fri");
    const expected = [
      {
        date: new Date("2025-05-01"),
        formatted: new Date("2025-05-01").toDateString(),
        day: days[new Date("2025-05-01").getDay()],
      },
      {
        date: new Date("2025-08-14"),
        formatted: new Date("2025-08-14").toDateString(),
        day: days[new Date("2025-08-14").getDay()],
      },
      {
        date: new Date("2025-08-21"),
        formatted: new Date("2025-08-21").toDateString(),
        day: days[new Date("2025-08-21").getDay()],
      },
      {
        date: new Date("2025-10-31"),
        formatted: new Date("2025-10-31").toDateString(),
        day: days[new Date("2025-10-31").getDay()],
      },
      {
        date: new Date("2025-11-06"),
        formatted: new Date("2025-11-06").toDateString(),
        day: days[new Date("2025-11-06").getDay()],
      },
    ];
    expect(res).toEqual(expected);
  });
  test("should return an empty array when custom weekend names don't match any days", () => {
    const f = new FreeDays("Mar", 2025);
    expect(f.getWeekendHolidays("X", "Y")).toEqual([]);
  });
});
