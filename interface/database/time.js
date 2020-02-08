const TABLE_NAME = 'times'
const KEY_DATE = 'date'

class TimeRepository {
  constructor (db) {
    this.db = db
  }

  getByDateRange (lower, upper) {
    return this.db.getRecordsByRange(TABLE_NAME, {
      key: KEY_DATE,
      lower,
      upper
    })
  }

  put (record) {
    return this.db.putRecord(TABLE_NAME, record)
  }
}

export default TimeRepository
