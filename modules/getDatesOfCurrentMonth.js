import getDatesOfMonth from './getDatesOfMonth'

function getDatesOfCurrentMonth () {
  const now = new Date()
  return getDatesOfMonth(now)
}

export default getDatesOfCurrentMonth
