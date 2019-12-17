import floorDuration from './floorDuration'
import formatDuration from './formatDuration'
import parseDuration from './parseDuration'

function calcTimes ({ stayingTime, breakTime, standardWorkingTime, workingTimeUnits }) {
  const stayingTimeDuration = parseDuration(stayingTime)
  const breakTimeDuration = parseDuration(breakTime)
  const actualWorkingTimeDuration = stayingTimeDuration.minus(breakTimeDuration)
  const workingTimeDuration = floorDuration(actualWorkingTimeDuration, workingTimeUnits)
  const standardWorkingTimeDuration = parseDuration(standardWorkingTime)
  const overtimeDuration = workingTimeDuration.minus(standardWorkingTimeDuration)
  return {
    stayingTime,
    breakTime,
    actualWorkingTime: toHTMLTime(actualWorkingTimeDuration),
    workingTime: toHTMLTime(workingTimeDuration),
    standardWorkingTime,
    overtime: toHTMLTime(overtimeDuration)
  }
}

function toHTMLTime (duration) {
  return duration.isValid ? formatDuration(duration, 'hh:mm') : ''
}

export default calcTimes
