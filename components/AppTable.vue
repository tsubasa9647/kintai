<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <template v-for="header in headers">
            <th>
              {{ $t(header.i18n) }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="record in records">
          <app-table-row
            :date="record.date"
            :staying-time.sync="record.stayingTime"
            :staying-time-duration.sync="record.stayingTimeDuration"
            :break-time="record.breakTime"
            :actual-working-time-duration.sync="record.actualWorkingTimeDuration"
            :working-time-duration.sync="record.workingTimeDuration"
            :standard-working-time="record.standardWorkingTime"
            :overtime-duration.sync="record.overtimeDuration"
            :working-time-units="workingTimeUnits"
          />
        </template>
      </tbody>
      <tfoot>
        <tr>
          <th>
            {{ $t('TOTAL') }}
          </th>
          <td>
            {{ stayingTimeDuration | formatDuration }}
          </td>
          <td />
          <td>
            {{ actualWorkingTimeDuration | formatDuration }}
          </td>
          <td>
            {{ workingTimeDuration | formatDuration }}
          </td>
          <td />
          <td>
            {{ overtimeDuration | formatDuration }}
          </td>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
import formatDuration from '~/modules/formatDuration'
import sumDurations from '~/modules/sumDurations'
import AppTableRow from '~/components/AppTableRow'

export default {
  components: {
    AppTableRow
  },
  filters: {
    formatDuration (duration) {
      return duration.isValid ? formatDuration(duration, 'hh:mm') : ''
    }
  },
  props: {
    records: {
      type: Array,
      required: true
    },
    workingTimeUnits: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      headers: [
        {
          key: 'date',
          i18n: 'HEADER_DATE'
        },
        {
          key: 'staying_time',
          i18n: 'HEADER_STAYING_TIME'
        },
        {
          key: 'break_time',
          i18n: 'HEADER_BREAK_TIME'
        },
        {
          key: 'actual_working_time',
          i18n: 'HEADER_ACTUAL_WORKING_TIME'
        },
        {
          key: 'working_time',
          i18n: 'HEADER_WORKING_TIME'
        },
        {
          key: 'standard_working_time',
          i18n: 'HEADER_STANDARD_WORKING_TIME'
        },
        {
          key: 'overtime',
          i18n: 'HEADER_OVERTIME'
        }
      ]
    }
  },
  computed: {
    stayingTimeDuration () {
      return this.sumDurations('stayingTimeDuration')
    },
    actualWorkingTimeDuration () {
      return this.sumDurations('actualWorkingTimeDuration')
    },
    workingTimeDuration () {
      return this.sumDurations('workingTimeDuration')
    },
    overtimeDuration () {
      return this.sumDurations('overtimeDuration')
    }
  },
  methods: {
    sumDurations (key) {
      const durations = this.records
        .map(record => record[key])
        .filter(duration => duration.isValid)
      return sumDurations(...durations)
    }
  }
}
</script>
