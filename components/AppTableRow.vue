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
      {{ breakTime }}
    </td>
    <td>
      {{ actualWorkingTime }}
    </td>
    <td>
      {{ workingTime }}
    </td>
    <td>
      {{ standardWorkingTime }}
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
    }
  },
  computed: {
    config () {
      return this.$store.state.config
    },
    _stayingTime: {
      get () {
        return this.stayingTime
      },
      set (stayingTime) {
        this.$emit('update:staying-time', stayingTime)
      }
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
    breakTime () {
      return this.isWorkDay ? this.config.breakTime : ''
    },
    standardWorkingTime () {
      return this.isWorkDay ? this.config.standardWorkingTime : ''
    },
    workingTimeUnit () {
      return this.config.workingTimeUnit
    },
    workingTimeUnits () {
      return {
        minutes: this.workingTimeUnit
      }
    },
    time () {
      return calcTimes({
        stayingTime: this._stayingTime,
        breakTime: this.breakTime,
        standardWorkingTime: this.standardWorkingTime,
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

</style>
