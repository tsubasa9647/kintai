import { eachDayOfInterval } from 'date-fns'

function getDatesOfRange (startDate, endDate) {
  return eachDayOfInterval({
    start: startDate,
    end: endDate
  })
}

export default getDatesOfRange
