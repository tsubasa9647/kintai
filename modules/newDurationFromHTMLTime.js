import { Duration } from 'luxon'

/*
* see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times
*/
function newDurationFromHTMLTime (text) {
  const matched = text.match(/^(\d{2}):(\d{2})(:(\d{2}))?(\.(\d{1,3}))?$/)
  if (!matched) {
    return Duration.invalid('unparsable', `the input "${text}" can't be parsed as HTML time`)
  }
  const getValue = index => matched[index] ? Number(matched[index]) : 0
  const hours = getValue(1)
  const minutes = getValue(2)
  const seconds = getValue(4)
  const milliseconds = getValue(6)
  return Duration.fromObject({
    hours,
    minutes,
    seconds,
    milliseconds
  })
}

export default newDurationFromHTMLTime
