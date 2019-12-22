<template>
  <tr>
    <td :class="dateClass">
      {{ date | formatDate }}
    </td>
    <td>
      <input
        v-model="_stayingTime"
        type="time"
      >
    </td>
    <td>
      <input
        v-model="_breakTime"
        type="time"
      >
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
      {{ $t('WORKING_TIME_UNIT_SUFFIX') }}
    </td>
    <td>
      {{ workingTime }}
    </td>
    <td>
      <input
        v-model="_standardWorkingTime"
        type="time"
      >
    </td>
    <td>
      {{ overtime }}
    </td>
  </tr>
</template>

<script>
import { isSunday, isSaturday } from 'date-fns'
import { isHoliday } from '@holiday-jp/holiday_jp'
import calcTimes from '~/modules/calcTimes'
import formatDate from '~/modules/formatDate'
import isHTMLTime from '~/modules/isHTMLTime'
import isNumber from '~/modules/isNumber'

export default {
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
    workingTimeUnit: {
      type: Number,
      required: true
    },
    standardWorkingTime: {
      type: String,
      required: true,
      validator: value => value === '' || isHTMLTime(value)
    }
  },
  computed: {
    _stayingTime: {
      get () {
        return this.stayingTime
      },
      set (stayingTime) {
        this.$emit('update:staying-time', stayingTime)
      }
    },
    _breakTime: {
      get () {
        return this.breakTime
      },
      set (breakTime) {
        this.$emit('update:break-time', breakTime)
      }
    },
    _workingTimeUnit: {
      get () {
        return this.workingTimeUnit
      },
      set (workingTimeUnit) {
        const num = isNumber(workingTimeUnit) ? workingTimeUnit : 0
        this.$emit('update:working-time-unit', num)
      }
    },
    _standardWorkingTime: {
      get () {
        return this.standardWorkingTime
      },
      set (standardWorkingTime) {
        this.$emit('update:standard-working-time', standardWorkingTime)
      }
    },
    config () {
      return this.$store.state.config
    },
    isWorkDay () {
      return this._stayingTime !== ''
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
    },
    workingTimeUnits () {
      return {
        minutes: this._workingTimeUnit
      }
    },
    time () {
      return calcTimes({
        stayingTime: this._stayingTime,
        breakTime: this._breakTime,
        standardWorkingTime: this._standardWorkingTime,
        workingTimeUnits: this.workingTimeUnits
      })
    },
    actualWorkingTime () {
      return this.time.actualWorkingTime
    },
    workingTime () {
      return this.time.workingTime
    },
    overtime () {
      return this.time.overtime
    }
  },
  watch: {
    actualWorkingTime (actualWorkingTime) {
      this.$emit('update:actual-working-time', actualWorkingTime)
    },
    workingTime (workingTime) {
      this.$emit('update:working-time', workingTime)
    },
    overtime (overtime) {
      this.$emit('update:overtime', overtime)
    }
  }
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
