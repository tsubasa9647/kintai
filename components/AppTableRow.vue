<template>
  <tr>
    <td :class="dateClass">
      {{ date | formatDate }}
    </td>
    <td>
      <app-input-time v-model="mutableStayingTime" />
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
import AppInputTime from '~/components/AppInputTime'

export default {
  components: {
    AppInputTime
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
    workingTimeUnits: {
      type: Object,
      required: true
    }
  },
  computed: {
    mutableStayingTime: {
      get () {
        return this.stayingTime
      },
      set (stayingTime) {
        this.$emit('update:staying-time', stayingTime)
      }
    },
    time () {
      return calcTimes({
        stayingTime: this.mutableStayingTime,
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
