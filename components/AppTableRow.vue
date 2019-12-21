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
    breakTime () {
      return this.config.breakTime
    },
    standardWorkingTime () {
      return this.config.standardWorkingTime
    },
    workingTimeUnit () {
      return this.config.workingTimeUnit
    },
    workingTimeUnits () {
      return {
        minutes: this.workingTimeUnit
      }
    },
    _stayingTime: {
      get () {
        return this.stayingTime
      },
      set (stayingTime) {
        this.$emit('update:staying-time', stayingTime)
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
    },
    isSunday () {
      return isSunday(this.date)
    },
    isSaturday () {
      return isSaturday(this.date)
    },
    dateClass () {
      return {
        sunday: this.isSunday,
        saturday: this.isSaturday
      }
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
.sunday {
  color: #f44336;
}

.saturday {
  color: #2196f3;
}
</style>
