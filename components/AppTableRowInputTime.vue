<template>
  <input
    v-model="_value"
    type="time"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
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
