<template>
  <v-app>
    <app-header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  head () {
    const { meta } = this.$nuxtI18nSeo()
    const APP_NAME = this.$t('APP_NAME')
    const APP_DESCRIPTION = this.$t('APP_DESCRIPTION')
    return {
      title: APP_NAME,
      meta: [
        { hid: 'description', name: 'description', content: APP_DESCRIPTION },
        ...meta
      ]
    }
  },
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
