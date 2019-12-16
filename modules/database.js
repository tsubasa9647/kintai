const DB_NAME = 'kintai'
const DB_VERSION = 1

/**
* Wrapper of IndexedDB
*/
class Database {
  constructor (indexedDB) {
    this.indexedDB = indexedDB
  }

  initialize () {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        const timeStore = db.createObjectStore('times', { keyPath: 'date' })
        timeStore.createIndex('date', 'date', { unique: true })
      }
      request.onsuccess = (event) => {
        const db = event.target.result
        this.db = db
        resolve()
      }
      request.onerror = (event) => {
        reject(event)
      }
    })
  }

  getRecordsByRange (table, { key, lower, upper }) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(table, 'readonly')
      const store = tx.objectStore(table)
      const index = store.index(key)
      const range = IDBKeyRange.bound(lower, upper)
      const request = index.openCursor(range)
      const records = []
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          const record = cursor.value
          records.push(record)
          cursor.continue()
        } else {
          resolve(records)
        }
      }
      request.onerror = (event) => {
        reject(event)
      }
    })
  }

  putRecord (table, record) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(table, 'readwrite')
      const store = tx.objectStore(table)
      const request = store.put(record)
      request.onsuccess = (event) => {
        resolve()
      }
      request.onerror = (event) => {
        reject(event)
      }
    })
  }
}

export default Database
