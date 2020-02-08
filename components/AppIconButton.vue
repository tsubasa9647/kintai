<template>
  <v-btn
    :disabled="disabled"
    @click="click"
    icon
  >
    <v-icon>
      <slot />
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
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
