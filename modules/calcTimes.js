import floorDuration from './floorDuration'
import formatDuration from './formatDuration'
import newDurationFromHTMLTime from './newDurationFromHTMLTime'

function calcTimes ({ stayingTime, breakTime, standardWorkingTime, workingTimeUnits }) {
  const stayingTimeDuration = newDurationFromHTMLTime(stayingTime)
  const breakTimeDuration = newDurationFromHTMLTime(breakTime)
  const actualWorkingTimeDuration = stayingTimeDuration.minus(breakTimeDuration)
  const workingTimeDuration = floorDuration(actualWorkingTimeDuration, workingTimeUnits)
  const standardWorkingTimeDuration = newDurationFromHTMLTime(standardWorkingTime)
  const overtimeDuration = workingTimeDuration.minus(standardWorkingTimeDuration)
  return {
    stayingTime: {
      value: stayingTime,
      duration: stayingTimeDuration
    },
    breakTime: {
      value: breakTime,
      duration: breakTimeDuration
    },
    actualWorkingTime: {
      value: toHTMLTime(actualWorkingTimeDuration),
      duration: actualWorkingTimeDuration
    },
    workingTime: {
      value: toHTMLTime(workingTimeDuration),
      duration: workingTimeDuration
    },
    standardWorkingTime: {
      value: standardWorkingTime,
      duration: standardWorkingTimeDuration
    },
    overtime: {
      value: toHTMLTime(overtimeDuration),
      duration: overtimeDuration
    }
  }
}

function toHTMLTime (duration) {
  return duration.isValid ? formatDuration(duration, 'hh:mm') : ''
}

export default calcTimes
