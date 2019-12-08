/*
* see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#times
*/
function isHTMLTime (text) {
  const matched = text.match(/^\d{2}:\d{2}(:\d{2})?(\.\d{1,3})?$/)
  return !!matched
}

export default isHTMLTime
