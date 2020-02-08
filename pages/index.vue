<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <span>{{ date | formatDate }}</span>
    </v-flex>
    <v-flex>
      <app-table :records="records" />
    </v-flex>
  </v-layout>
</template>

<script>
import clearArray from '~/modules/clearArray'
import createDateFromYearMonthString from '~/modules/createDateFromYearMonthString'
import endOfMonth from '~/modules/endOfMonth'
import formatDate from '~/modules/formatDate'
import getDatesOfRange from '~/modules/getDatesOfRange'
import icons from '~/modules/icons'
import isSameDay from '~/modules/isSameDay'
import startOfMonth from '~/modules/startOfMonth'
import AppTable from '~/components/AppTable'

export default {
  filters: {
    formatDate (date) {
      return formatDate(date, 'yyyy年M月')
    }
  },
  components: {
    AppTable
  },
  data () {
    return {
      icons,
      date: createDateFromYearMonthString(this.$route.query.month),
      records: []
    }
  },
  computed: {
    state () {
      return this.$store.state
    },
    timeRepo () {
      return this.state.repository.time
    },
    startDate () {
      return startOfMonth(this.date)
    },
    endDate () {
      return endOfMonth(this.date)
    }
  },
  watch: {
    records: {
      async handler (records) {
        await this.saveRecords(records)
      },
      deep: true
    }
  },
  async created () {
    const records = await this.getRecordsOrCreate()
    records.forEach(record => this.records.push(record))
  },
  async beforeRouteUpdate (to, from, next) {
    this.date = createDateFromYearMonthString(to.query.month)
    clearArray(this.records)
    const records = await this.getRecordsOrCreate()
    records.forEach(record => this.records.push(record))
    next()
  },
  methods: {
    async getRecordsOrCreate () {
      const oldRecords = await this.getRecords()
      const newRecords = this.createRecords()
      const records = newRecords.map((newRecord) => {
        const oldRecord = oldRecords.find(oldRecord => isSameDay(oldRecord.date, newRecord.date))
        return oldRecord || newRecord
      })
      return records
    },
    async getRecords () {
      const records = await this.timeRepo.getByDateRange(this.startDate, this.endDate)
      return records
    },
    createRecords () {
      const dates = getDatesOfRange(this.startDate, this.endDate)
      return dates
        .map(date => ({
          date,
          stayingTime: '',
          breakTime: '',
          actualWorkingTime: '',
          workingTimeUnit: '',
          workingTime: '',
          standardWorkingTime: '',
          overtime: ''
        }))
    },
    async saveRecords (records) {
      for (const record of records) {
        await this.timeRepo.put(record)
      }
    }
  }
}
</script>
