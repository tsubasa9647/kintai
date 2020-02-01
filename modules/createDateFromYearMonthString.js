import newDate from './newDate'

function createDateFromYearMonthString (yearMonthString) {
  if (yearMonthString) {
    const year = Number(yearMonthString.substr(0, 4))
    const month = Number(yearMonthString.substr(4, 2))
    return newDate({ year, month })
  } else {
    return new Date()
  }
}

export default createDateFromYearMonthString
