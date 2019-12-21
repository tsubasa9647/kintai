<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title>
      {{ $t('APP_NAME') }}
    </v-toolbar-title>
    <v-spacer />
    <app-icon-button
      @click="openSettingDialog"
      :icon="icons.settings"
    />
    <app-setting-dialog :show.sync="showSettingDialog" />
  </v-app-bar>
</template>

<script>
import icons from '~/modules/icons'
import AppIconButton from '~/components/AppIconButton'
import AppSettingDialog from '~/components/AppSettingDialog'

export default {
  components: {
    AppIconButton,
    AppSettingDialog
  },
  data: () => ({
    icons,
    showSettingDialog: false
  }),
  methods: {
    openSettingDialog () {
      this.showSettingDialog = true
    }
  }
}
</script>
