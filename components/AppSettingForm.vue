<template>
  <v-form v-model="_valid">
    <v-container class="app-setting-form">
      <v-row>
        <v-col>
          <app-input-time
            v-model="_breakTime"
            :label="$t('DEFAULT_BREAK_TIME')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <app-input-time
            v-model="_standardWorkingTime"
            :label="$t('DEFAULT_STANDARD_WORKING_TIME')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <app-input-number
            v-model="_workingTimeUnit"
            :label="$t('DEFAULT_WORKING_TIME_UNIT')"
            :suffix="$t('MINUTES')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import AppInputNumber from '~/components/AppInputNumber'
import AppInputTime from '~/components/AppInputTime'

export default {
  components: {
    AppInputNumber,
    AppInputTime
  },
  props: {
    valid: {
      type: Boolean,
      default: false
    },
    breakTime: {
      type: String,
      required: true
    },
    standardWorkingTime: {
      type: String,
      required: true
    },
    workingTimeUnit: {
      type: Number,
      required: true
    }
  },
  computed: {
    _valid: {
      get () {
        return this.valid
      },
      set (valid) {
        this.$emit('update:valid', valid)
      }
    },
    _breakTime: {
      get () {
        return this.breakTime
      },
      set (breakTime) {
        this.$emit('update:breakTime', breakTime)
      }
    },
    _standardWorkingTime: {
      get () {
        return this.standardWorkingTime
      },
      set (standardWorkingTime) {
        this.$emit('update:standardWorkingTime', standardWorkingTime)
      }
    },
    _workingTimeUnit: {
      get () {
        return this.workingTimeUnit
      },
      set (workingTimeUnit) {
        this.$emit('update:workingTimeUnit', workingTimeUnit)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-setting-form {
  max-width: 600px;
}
</style>
