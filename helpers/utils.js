const {days} = require("../data/holidays")
 function getHolidayDate(holidayStr,year){
    return new Date(`${year}-${holidayStr}`);
}
function generateDayObject(holiday,year){
    const holidayDate = getHolidayDate(holiday,year);
    const dayName = days[holidayDate.getDay()];
    return {
         date: holidayDate,
          formatted: holidayDate.toDateString(),
          day: dayName,
    }
}
module.exports = {getHolidayDate,generateDayObject}
