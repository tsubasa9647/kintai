<template>
  <v-footer
    color="primary"
    dark
    class="app-footer"
  >
    <v-spacer />
    <div>
      <i18n
        tag="span"
        path="FOOTER_CREATOR"
      >
        <a
          :href="$t('FOOTER_CREATOR_URL')"
          target="_blank"
          place="creator"
        >{{ $t('FOOTER_CREATOR_LABEL') }}</a>
      </i18n>
      <span>-</span>
      <i18n
        tag="span"
        path="FOOTER_HOSTING_SITE"
      >
        <a
          :href="$t('FOOTER_HOSTING_SITE_URL')"
          target="_blank"
          place="site"
        >{{ $t('FOOTER_HOSTING_SITE_LABEL') }}</a>
      </i18n>
    </div>
    <v-spacer />
  </v-footer>
</template>

<style lang="scss" scoped>
.app-footer {
  a {
    color: inherit;
    text-decoration: inherit;
  }
}
</style>
