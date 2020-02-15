export function getStorageDateFormat(stringDate: string) {
  let d = new Date(stringDate),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = "0" + month;
  if (day.length < 2)
    day = "0" + day;

  return [year, month, day].join("-");
}


export function getVisualDateFormat(stringDate: string) {
  let d = new Date(stringDate);
  d.setDate(d.getDate() + 1);
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = "0" + month;
  if (day.length < 2)
    day = "0" + day;

  return [day, month, year].join(".");
}
