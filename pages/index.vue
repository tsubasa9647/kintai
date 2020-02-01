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
import { eachDayOfInterval, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'
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
    },
    state () {
      return this.$store.state
    },
    db () {
      return this.state.db
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
      const records = await this.getRecords()
      return records.length ? records : this.createRecords()
    },
    async getRecords () {
      const records = await this.db.getRecordsByRange('times', {
        key: 'date',
        lower: this.startDate,
        upper: this.endDate
      })
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
        await this.db.putRecord('times', record)
      }
    }
  }
}
</script>
