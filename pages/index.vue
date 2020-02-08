<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-icon-link
        :to="prevPagePath"
        :icon="icons.left"
      />
      <span>{{ date | formatDate }}</span>
      <app-icon-link
        :to="nextPagePath"
        :icon="icons.right"
      />
    </v-flex>
    <v-flex>
      <app-table :records="records" />
    </v-flex>
  </v-layout>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isSameDay
} from 'date-fns'
import clearArray from '~/modules/clearArray'
import createDateFromYearMonthString from '~/modules/createDateFromYearMonthString'
import formatDate from '~/modules/formatDate'
import icons from '~/modules/icons'
import AppIconLink from '~/components/AppIconLink'
import AppTable from '~/components/AppTable'

export default {
  filters: {
    formatDate (date) {
      return formatDate(date, 'yyyy年M月')
    }
  },
  components: {
    AppIconLink,
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
    },
    prevPagePath () {
      const date = subMonths(this.date, 1)
      const month = formatDate(date, 'yyyyMM')
      return `/?month=${month}`
    },
    nextPagePath () {
      const date = addMonths(this.date, 1)
      const month = formatDate(date, 'yyyyMM')
      return `/?month=${month}`
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
      const dates = eachDayOfInterval({
        start: this.startDate,
        end: this.endDate
      })
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
