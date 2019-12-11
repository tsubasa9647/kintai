<template>
  <v-app>
    <app-header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from '~/components/AppHeader'

export default {
  head () {
    const { meta } = this.$nuxtI18nSeo()
    const APP_NAME = this.$t('APP_NAME')
    const APP_DESCRIPTION = this.$t('APP_DESCRIPTION')
    return {
      title: `${APP_NAME}: ${APP_DESCRIPTION}`,
      meta: [
        { hid: 'description', name: 'description', content: APP_DESCRIPTION },
        ...meta
      ]
    }
  },
  components: {
    AppHeader
  }
}
</script>
