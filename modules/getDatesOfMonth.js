import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'

function getDatesOfMonth (date) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({
    start,
    end
  })
}

export default getDatesOfMonth
