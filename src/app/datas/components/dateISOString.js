export function dateISOString(dateTime) {

dateTime=!dateTime?new Date:dateTime
    function pad(number) {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    }
      dateTime =
        dateTime.getFullYear() +
        "-" +
        pad(dateTime.getMonth() + 1) +
        "-" +
        pad(dateTime.getDate() );
    
    return dateTime;
  }