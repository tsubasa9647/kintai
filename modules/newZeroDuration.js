import { Duration } from 'luxon'

function newZeroDuration () {
  return Duration.fromMillis(0)
}

export default newZeroDuration
