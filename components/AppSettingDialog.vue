<template>
  <app-fullscreen-dialog :show.sync="_show">
    <v-card>
      <v-toolbar
        color="primary"
        dark
      >
        <app-icon-button
          :icon="icons.close"
          @click="onClickCloseButton"
        />
        <v-toolbar-title>{{ $t('SETTING') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          @click="onClickSaveIcon"
          :icon="icons.save"
          :disabled="!valid"
        />
      </v-toolbar>
      <v-card-text>
        <app-setting-form
          :valid.sync="valid"
          :breakTime.sync="config.breakTime"
          :standardWorkingTime.sync="config.standardWorkingTime"
          :workingTimeUnit.sync="config.workingTimeUnit"
        />
      </v-card-text>
    </v-card>
  </app-fullscreen-dialog>
</template>

<script>
import icons from '~/modules/icons'
import AppFullscreenDialog from '~/components/AppFullscreenDialog'
import AppIconButton from '~/components/AppIconButton'
import AppSettingForm from '~/components/AppSettingForm'

export default {
  components: {
    AppFullscreenDialog,
    AppIconButton,
    AppSettingForm
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    const { breakTime, standardWorkingTime, workingTimeUnit } = this.$store.state.config
    return {
      icons,
      valid: false,
      initialConfig: {
        breakTime,
        standardWorkingTime,
        workingTimeUnit
      },
      config: {
        breakTime,
        standardWorkingTime,
        workingTimeUnit
      }
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
  },
  methods: {
    onClickCloseButton () {
      this.reset()
      this.close()
    },
    onClickSaveIcon () {
      this.save()
      this.close()
    },
    close () {
      this._show = false
    },
    save () {
      this.$store.dispatch('updateConfig', this.config)
    },
    reset () {
      const { breakTime, standardWorkingTime, workingTimeUnit } = this.initialConfig
      this.config = {
        breakTime,
        standardWorkingTime,
        workingTimeUnit
      }
    }
  }
}
</script>
