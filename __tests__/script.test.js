const { FreeDays } = require("../script");
const { holidays, days } = require("../data/holidays");
const { getHolidayDate } = require("../helpers/utils");

describe("FreeDays class", () => {
  test("constructor should set country and year", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.country).toBe("Mar");
    expect(f.year).toBe(2023);
  });
  test("constructor should return err", () => {
    expect(() => new FreeDays("Fra")).toThrow("unknown country : Fra");
  });
  test("countWeekendHolidays", () => {
    const f = new FreeDays("Mar", 2025);
    expect(f.countWeekendHolidays()).toBe(1);
  });
  test("countWeekendHolidays", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.countWeekendHolidays()).toBe(5);
  });
  test("isHoliday returns true for valid holiday", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.isHoliday("2023-01-11")).toBe(true);
  });

  test("isHoliday returns false for invalid holiday", () => {
    const f = new FreeDays("Mar", 2023);
    expect(f.isHoliday("2023-02-01")).toBe(false);
  });
  test("isHoliday should throw not a date if the input isn't a date", () => {
    const f = new FreeDays("Mar", 2023);
    expect(() => f.isHoliday("23ljadf")).toThrow("not a date");
  });
});
describe("FreeDay methods", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test("should return the exact remaining days", () => {
    const mockToday = new Date("2025-11-01");
    jest.setSystemTime(mockToday);
    const freeDays = new FreeDays("Mar", 2025);
    const result = freeDays.getRemainingHolidays();
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
  test("count remaining holidays", () => {
    const mockToday = new Date("2025-01-01");
    jest.setSystemTime(mockToday);
    const f = new FreeDays("Mar", 2025);
    const result = f.countRemainingHolidays();
    expect(result).toBe(10);
  });
  test("next holiday", () => {
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
  test("wasted holidays should return the arr of objects describing the days who are weekend", () => {
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
  test("wasted holidays with customized weekend", () => {
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
  test("getWeekendHolidays returns empty array if weekend names don't match", () => {
    const f = new FreeDays("Mar", 2025);
    expect(f.getWeekendHolidays("X", "Y")).toEqual([]);
  });
});
