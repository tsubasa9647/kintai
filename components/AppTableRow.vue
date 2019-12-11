<template>
  <tr>
    <td>
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
      return formatDate(date, 'yyyy/M/d(EEEEE)')
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
    times () {
      return calcTimes({
        stayingTime: this.mutableStayingTime,
        breakTime: this.breakTime,
        standardWorkingTime: this.standardWorkingTime,
        workingTimeUnits: this.workingTimeUnits
      })
    },
    mutableStayingTime: {
      get () {
        return this.stayingTime
      },
      set (stayingTime) {
        this.$emit('update:staying-time', stayingTime)
      }
    },
    stayingTimeDuration () {
      return this.times.stayingTime.duration
    },
    actualWorkingTime () {
      return this.times.actualWorkingTime.value
    },
    actualWorkingTimeDuration () {
      return this.times.actualWorkingTime.duration
    },
    workingTime () {
      return this.times.workingTime.value
    },
    workingTimeDuration () {
      return this.times.workingTime.duration
    },
    overtime () {
      return this.times.overtime.value
    },
    overtimeDuration () {
      return this.times.overtime.duration
    }
  },
  watch: {
    stayingTimeDuration (stayingTimeDuration) {
      this.$emit('update:staying-time-duration', stayingTimeDuration)
    },
    actualWorkingTimeDuration (actualWorkingTimeDuration) {
      this.$emit('update:actual-working-time-duration', actualWorkingTimeDuration)
    },
    workingTimeDuration (workingTimeDuration) {
      this.$emit('update:working-time-duration', workingTimeDuration)
    },
    overtimeDuration (overtimeDuration) {
      this.$emit('update:overtime-duration', overtimeDuration)
    }
  }
}
</script>
