const displayDateTimeParts = currentDateTime => {
  var year = currentDateTime.getFullYear().toString().substring(2);
  var month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2);
  var day = ('0' + currentDateTime.getDate()).slice(-2);
  var hour = ('0' + currentDateTime.getHours()).slice(-2);
  var minute = ('0' + currentDateTime.getMinutes()).slice(-2);

  return year + '.' + month + '.' + day + ' ' + hour + ':' + minute;
};

export { displayDateTimeParts };
