const { holidays, days } = require("./data/holidays");
const { getHolidayDate,generateDayObject } = require("./helpers/utils");
class FreeDays {
  constructor(country, year = new Date().getFullYear()) {
    if (!holidays[country]) throw new Error(`unknown country : ${country}`);
    this.country = country;
    this.year = year;
  }
  getRemainingHolidays() {
    const today = new Date();
    const countryHolidays = holidays[this.country] || [];
    const remainingHolidays = [];
    countryHolidays.forEach((holiday) => {
      const dayObject = generateDayObject(holiday,this.year);
      if (today < dayObject.date) {
        remainingHolidays.push(dayObject);
      }
    });
    return remainingHolidays;
  }
  countRemainingHolidays() {
    return this.getRemainingHolidays().length;
  }
  getWeekendHolidays(free1 = "Sat", free2 = "Sun") {
    const countryHolidays = holidays[this.country] || [];
    const weekendHolidays = [];
    countryHolidays.forEach((holiday) => {
      const dayObject = generateDayObject(holiday,this.year);
      if (dayObject.day === free1 || dayObject.day  === free2) {
        weekendHolidays.push(dayObject);
      }
    });
    return weekendHolidays;
  }
  isHoliday(date) {
    let d;

    if (date instanceof Date) {
      d = date;
    } else if (typeof date === "string") {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(date)) throw new Error("not a date");
      d = new Date(date);
    } else {
      throw new Error("not a date");
    }

    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    const formatted = `${month}-${day}`;

    return holidays[this.country].includes(formatted);
  }
  getNextHoliday() {
    const today = new Date();
    const countryHolidays = holidays[this.country] || [];
    for (const holiday of countryHolidays) {
      const dayObject = generateDayObject(holiday,this.year);
      if (today < dayObject.date) {
        return dayObject;
      }
    }
    if (countryHolidays.length > 0) {
      const dayObject = generateDayObject(countryHolidays[0],this.year+1);
      return dayObject;
    }
    return null;
  }
  getAllHolidays() {
    return holidays[this.country].map((day) =>
      getHolidayDate(day, this.year).toDateString()
    );
  }
  countWeekendHolidays(free1 = "Sat", free2 = "Sun") {
    return this.getWeekendHolidays(free1, free2).length;
  }
  countHolidays() {
    return holidays[this.country].length || 0;
  }
  getWorkingDayHolidays(free1, free2) {
    return this.countHolidays() - this.countWeekendHolidays(free1, free2);
  }
}
module.exports = { FreeDays };
