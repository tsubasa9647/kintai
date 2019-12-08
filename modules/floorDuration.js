function floorDuration (duration, units) {
  return duration.mapUnits((a, unit) => {
    const b = units[unit]
    return b ? (Math.floor(a / b) * b) : a
  })
}
export default floorDuration
