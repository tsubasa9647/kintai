import { Duration } from 'luxon'

function parseDuration (text) {
  const matched = text.match(/^(-)?(\d{2}):(\d{2})(:(\d{2}))?(\.(\d{1,3}))?$/)
  if (!matched) {
    return Duration.invalid('unparsable', `the input "${text}" can't be parsed`)
  }
  const isNegative = matched[1]
  const getNumber = index => matched[index] ? Number(matched[index]) : 0
  const hours = getNumber(2)
  const minutes = getNumber(3)
  const seconds = getNumber(5)
  const milliseconds = getNumber(7)
  const duration = Duration.fromObject({
    hours,
    minutes,
    seconds,
    milliseconds
  })
  if (isNegative) {
    return duration.negate()
  } else {
    return duration
  }
}

export default parseDuration
