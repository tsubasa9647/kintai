import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

function formatDate (date, pattern) {
  return format(date, pattern, {
    locale: ja
  })
}

export default formatDate
