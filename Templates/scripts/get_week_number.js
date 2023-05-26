function getWeekNumber(dayOfWeek = "mon") {
  const dayOfWeekIndex = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thur: 4,
    fri: 5,
    sat: 6,
  };

  const DAYS_TO_MILLISECONDS = 60 * 60 * 24 * 1000;
  const currentDate = new Date();
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((currentDate - yearStart) / DAYS_TO_MILLISECONDS);

  let dayOfThisWeek =
    dayOfYear + dayOfWeekIndex[dayOfWeek] - currentDate.getDay();

  if (currentDate.getDay() < dayOfWeekIndex[dayOfWeek]) dayOfThisWeek -= 7;

  return dayOfThisWeek < 0 ? 52 : Math.ceil(dayOfThisWeek / 7);
}

module.exports = getWeekNumber;
