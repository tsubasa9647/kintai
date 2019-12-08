import newZeroDuration from './newZeroDuration'

function sumDurations (...durations) {
  return durations.reduce((a, b) => a.plus(b), newZeroDuration())
}
export default sumDurations
