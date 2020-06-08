define([], function () {

  function getDateFromDays(startYear, startMonth, days) {
    return new Date(startYear, startMonth, days);
  }

  function getDateString(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) {
      day = ''.concat(0, day);
    }
    if (month < 10) {
      month = ''.concat(0, month);
    }
    return ''.concat(year, '-', month, '-', day);
  }

  function getDaysBetween(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.ceil(difference_ms / one_day);
  }

  function getId() {
    var min = 1000;
    var max = 100000000;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString() + result;
  }

  return {
    getDateFromDays: getDateFromDays,
    getDateString: getDateString,
    getDaysBetween: getDaysBetween,
    getId: getId
  };

});
