<template>
  <v-btn
    :disabled="disabled"
    @click="click"
    icon
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
