<template>
  <v-text-field
    v-model.number="_value"
    :rules="rules"
    :label="label"
    :suffix="suffix"
    type="number"
  />
</template>

<script>
import isNumber from '~/modules/isNumber'

export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rules: [
        value => isNumber(value) || this.$t('ERROR_MESSAGE_NOT_NUMBER')
      ]
    }
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        const num = isNumber(value) ? value : 0
        this.$emit('input', num)
      }
    }
  }
}

</script>
