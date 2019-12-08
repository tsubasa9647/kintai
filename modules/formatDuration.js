import isNegativeDuration from './isNegativeDuration'

function formatDuration (duration, pattern) {
  if (isNegativeDuration(duration)) {
    return `-${duration.negate().toFormat(pattern)}`
  } else {
    return duration.toFormat(pattern)
  }
}

export default formatDuration
