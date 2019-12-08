<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-table
        :records="records"
        :working-time-units="workingTimeUnits"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import getDatesOfCurrentMonth from '~/modules/getDatesOfCurrentMonth'
import newZeroDuration from '~/modules/newZeroDuration'
import AppTable from '~/components/AppTable'

export default {
  components: {
    AppTable
  },
  data () {
    return {
      workingTimeUnits: {
        minutes: 15
      },
      records: createDefaultRecords()
    }
  }
}

function createDefaultRecords () {
  const dates = getDatesOfCurrentMonth()
  return dates
    .map((date) => {
      return {
        date,
        stayingTime: '',
        stayingTimeDuration: newZeroDuration(),
        breakTime: '01:00',
        actualWorkingTimeDuration: newZeroDuration(),
        workingTimeDuration: newZeroDuration(),
        standardWorkingTime: '08:00',
        overtimeDuration: newZeroDuration()
      }
    })
}
</script>
