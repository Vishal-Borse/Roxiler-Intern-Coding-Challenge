function getMonthNumberFromName(monthName) {
  return new Date(`${monthName} 1, 2022`).getMonth() + 1;
}

module.exports = getMonthNumberFromName;
