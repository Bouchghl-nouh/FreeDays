
 function getHolidayDate(holidayStr,year){
    return new Date(`${year}-${holidayStr}`);
}
module.exports = {getHolidayDate}
