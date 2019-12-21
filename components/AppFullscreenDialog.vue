<template>
  <v-dialog
    v-model="_show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <slot />
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    _show: {
      get () {
        return this.show
      },
      set (show) {
        this.$emit('update:show', show)
      }
    }
  }
}
</script>
