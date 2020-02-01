<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-table :records="records" />
    </v-flex>
  </v-layout>
</template>

<script>
import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'
import newDate from '~/modules/newDate'
import AppTable from '~/components/AppTable'

export default {
  components: {
    AppTable
  },
  data () {
    return {
      records: []
    }
  },
  computed: {
    query () {
      return this.$route.query
    },
    date () {
      if (this.query.month) {
        const year = Number(this.query.month.substr(0, 4))
        const month = Number(this.query.month.substr(4, 2))
        return newDate({ year, month })
      } else {
        return new Date()
      }
    },
    startDate () {
      return startOfMonth(this.date)
    },
    endDate () {
      return endOfMonth(this.date)
    },
    state () {
      return this.$store.state
    },
    db () {
      return this.state.db
    },
    config () {
      return this.state.config
    }
  },
  watch: {
    records: {
      handler (records) {
        this.saveRecords(records)
      },
      deep: true
    }
  },
  async created () {
    const records = await this.getRecordsOrCreate()
    records.forEach((record) => {
      this.records.push(record)
    })
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
        .map((date) => {
          return {
            date,
            stayingTime: '',
            breakTime: '',
            actualWorkingTime: '',
            workingTimeUnit: '',
            workingTime: '',
            standardWorkingTime: '',
            overtime: ''
          }
        })
    },
    async saveRecords (records) {
      for (const record of records) {
        await this.db.putRecord('times', record)
      }
    }
  }
}
</script>
