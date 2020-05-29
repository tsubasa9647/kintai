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
            :break-time.sync="record.breakTime"
            :actual-working-time.sync="record.actualWorkingTime"
            :working-time-unit.sync="record.workingTimeUnit"
            :working-time.sync="record.workingTime"
            :standard-working-time.sync="record.standardWorkingTime"
            :overtime.sync="record.overtime"
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
          <td />
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
import {
  formatDuration,
  parseDuration,
  sumDurations
} from '~/modules'
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
          key: 'working_time_unit',
          i18n: 'HEADER_WORKING_TIME_UNIT'
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
      return this.sumDurations('stayingTime')
    },
    actualWorkingTimeDuration () {
      return this.sumDurations('actualWorkingTime')
    },
    workingTimeDuration () {
      return this.sumDurations('workingTime')
    },
    overtimeDuration () {
      return this.sumDurations('overtime')
    }
  },
  methods: {
    sumDurations (key) {
      const durations = this.records
        .map(record => record[key])
        .filter(value => value)
        .map(parseDuration)
        .filter(duration => duration.isValid)
      return sumDurations(...durations)
    }
  }
}
</script>
