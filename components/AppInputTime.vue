<template>
  <input
    v-model="mutableValue"
    type="time"
  >
</template>

<script>
import isHTMLTime from '~/modules/isHTMLTime'

export default {
  props: {
    value: {
      type: String,
      required: true,
      validator: value => value === '' || isHTMLTime(value)
    }
  },
  computed: {
    mutableValue: {
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
