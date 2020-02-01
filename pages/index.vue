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
import { startOfMonth, endOfMonth } from 'date-fns'
import getDatesOfCurrentMonth from '~/modules/getDatesOfCurrentMonth'
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
      const now = new Date()
      const records = await this.db.getRecordsByRange('times', {
        key: 'date',
        lower: startOfMonth(now),
        upper: endOfMonth(now)
      })
      return records.length ? records : this.createDefaultRecords()
    },
    createDefaultRecords () {
      const dates = getDatesOfCurrentMonth()
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
