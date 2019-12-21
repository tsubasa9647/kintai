<template>
  <v-btn
    :color="color"
    @click="click"
    text
    class="app-text-button"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-text-button {
  text-transform: none;
}
</style>
