<template>
  <tr>
    <td>
      {{ date | formatDate }}
    </td>
    <td>
      <app-input-time v-model="mutableStayingTime" />
    </td>
    <td>
      {{ breakTimeDuration | formatDuration }}
    </td>
    <td>
      {{ actualWorkingTimeDuration | formatDuration }}
    </td>
    <td>
      {{ workingTimeDuration | formatDuration }}
    </td>
    <td>
      {{ standardWorkingTimeDuration | formatDuration }}
    </td>
    <td>
      {{ overtimeDuration | formatDuration }}
    </td>
  </tr>
</template>

<script>
import floorDuration from '~/modules/floorDuration'
import formatDate from '~/modules/formatDate'
import formatDuration from '~/modules/formatDuration'
import isHTMLTime from '~/modules/isHTMLTime'
import newDurationFromHTMLTime from '~/modules/newDurationFromHTMLTime'
import AppInputTime from '~/components/AppInputTime'

export default {
  components: {
    AppInputTime
  },
  filters: {
    formatDate (date) {
      return formatDate(date, 'yyyy/M/d(EEEEE)')
    },
    formatDuration (duration) {
      return duration.isValid ? formatDuration(duration, 'hh:mm') : ''
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
    stayingTimeDuration () {
      return newDurationFromHTMLTime(this.mutableStayingTime)
    },
    breakTimeDuration () {
      return newDurationFromHTMLTime(this.breakTime)
    },
    actualWorkingTimeDuration () {
      return this.stayingTimeDuration.minus(this.breakTimeDuration)
    },
    workingTimeDuration () {
      return floorDuration(this.actualWorkingTimeDuration, this.workingTimeUnits)
    },
    standardWorkingTimeDuration () {
      return newDurationFromHTMLTime(this.standardWorkingTime)
    },
    overtimeDuration () {
      return this.workingTimeDuration.minus(this.standardWorkingTimeDuration)
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
