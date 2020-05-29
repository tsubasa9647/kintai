<template>
  <v-text-field
    v-model="_value"
    :rules="rules"
    :label="label"
    type="time"
  />
</template>

<script>
import {
  isHTMLTime
} from '~/modules'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      rules: [
        value => isHTMLTime(value) || this.$t('ERROR_MESSAGE_NOT_TIME')
      ]
    }
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
