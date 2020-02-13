<template>
  <tr>
    <td :class="dateClass">
      {{ date | formatDate }}
    </td>
    <td>
      <app-table-row-input-time v-model="_stayingTime" />
    </td>
    <td>
      <app-table-row-input-time v-model="_breakTime" />
    </td>
    <td>
      {{ actualWorkingTime }}
    </td>
    <td>
      <input
        v-model.number="_workingTimeUnit"
        type="number"
        min="0"
        class="working-time-unit"
      >
      {{ $t('MINUTES') }}
    </td>
    <td>
      {{ workingTime }}
    </td>
    <td>
      <app-table-row-input-time v-model="_standardWorkingTime" />
    </td>
    <td>
      {{ overtime }}
    </td>
  </tr>
</template>

<script>
import floorDuration from '~/modules/floorDuration'
import formatDate from '~/modules/formatDate'
import formatDuration from '~/modules/formatDuration'
import isHoliday from '~/modules/isHoliday'
import isHTMLTime from '~/modules/isHTMLTime'
import isNumber from '~/modules/isNumber'
import isSaturday from '~/modules/isSaturday'
import isSunday from '~/modules/isSunday'
import parseDuration from '~/modules/parseDuration'
import AppTableRowInputTime from '~/components/AppTableRowInputTime'

export default {
  components: {
    AppTableRowInputTime
  },
  filters: {
    formatDate (date) {
      return formatDate(date, 'M/d(EEEEE)')
    }
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    stayingTime: {
      type: String,
      required: true,
      validator: value => value === '' || isHTMLTime(value)
    },
    breakTime: {
      type: String,
      required: true,
      validator: value => value === '' || isHTMLTime(value)
    },
    standardWorkingTime: {
      type: String,
      required: true,
      validator: value => value === '' || isHTMLTime(value)
    },
    workingTimeUnit: {
      type: [Number, String], // NOTE: String is type for empty value
      required: true
    }
  },
  computed: {
    state () {
      return this.$store.state
    },
    config () {
      return this.state.config
    },
    _stayingTime: {
      get () {
        return this.stayingTime
      },
      set (value) {
        this.$emit('update:staying-time', value)
      }
    },
    _breakTime: {
      get () {
        return this.breakTime
      },
      set (value) {
        this.$emit('update:break-time', value)
      }
    },
    _standardWorkingTime: {
      get () {
        return this.standardWorkingTime
      },
      set (value) {
        this.$emit('update:standard-working-time', value)
      }
    },
    _workingTimeUnit: {
      get () {
        return this.workingTimeUnit
      },
      set (value) {
        const num = isNumber(value) ? value : 0
        this.$emit('update:working-time-unit', num)
      }
    },
    stayingTimeDuration () {
      return parseDuration(this._stayingTime)
    },
    breakTimeDuration () {
      return parseDuration(this._breakTime)
    },
    actualWorkingTimeDuration () {
      return this.stayingTimeDuration.minus(this.breakTimeDuration)
    },
    actualWorkingTime () {
      return toHTMLTime(this.actualWorkingTimeDuration)
    },
    workingTimeDuration () {
      return floorDuration(this.actualWorkingTimeDuration, {
        minutes: this._workingTimeUnit
      })
    },
    workingTime () {
      return toHTMLTime(this.workingTimeDuration)
    },
    standardWorkingTimeDuration () {
      return parseDuration(this._standardWorkingTime)
    },
    overtimeDuration () {
      return this.workingTimeDuration.minus(this.standardWorkingTimeDuration)
    },
    overtime () {
      return toHTMLTime(this.overtimeDuration)
    },
    isSaturday () {
      return isSaturday(this.date)
    },
    isSunday () {
      return isSunday(this.date)
    },
    isHoliday () {
      return isHoliday(this.date)
    },
    dateClass () {
      return {
        saturday: this.isSaturday,
        sunday: this.isSunday,
        holiday: this.isHoliday
      }
    }
  },
  watch: {
    _stayingTime (newValue, oldValue) {
      // set default values
      if (!oldValue && newValue) {
        this._breakTime = this.config.breakTime
        this._workingTimeUnit = this.config.workingTimeUnit
        this._standardWorkingTime = this.config.standardWorkingTime
      }
      // clear values
      if (oldValue && !newValue) {
        this._breakTime = ''
        this._workingTimeUnit = ''
        this._standardWorkingTime = ''
      }
    },
    actualWorkingTime (value) {
      this.$emit('update:actual-working-time', value)
    },
    workingTime (value) {
      this.$emit('update:working-time', value)
    },
    overtime (value) {
      this.$emit('update:overtime', value)
    }
  }
}

function toHTMLTime (duration) {
  return duration.isValid ? formatDuration(duration, 'hh:mm') : ''
}
</script>

<style lang="scss" scoped>
.saturday {
  color: #2196f3;
}

.sunday {
  color: #f44336;
}

.holiday {
  color: #f44336;
}

.working-time-unit {
  width: 30px;
}
</style>
