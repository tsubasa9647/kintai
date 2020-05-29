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
    <app-icon-button @click="toPrevMonthPage">
      {{ icons.left }}
    </app-icon-button>
    <app-text-button @click="toCurrentMonthPage">
      {{ $t('CURRENT_MONTH') }}
    </app-text-button>
    <app-icon-button @click="toNextMonthPage">
      {{ icons.right }}
    </app-icon-button>
    <app-icon-button @click="openSettingDialog">
      {{ icons.settings }}
    </app-icon-button>
    <app-setting-dialog :show.sync="showSettingDialog" />
  </v-app-bar>
</template>

<script>
import {
  addMonth,
  createDateFromYearMonthString,
  formatDate,
  icons,
  subMonth
} from '~/modules'
import AppIconButton from '~/components/AppIconButton'
import AppTextButton from '~/components/AppTextButton'
import AppSettingDialog from '~/components/AppSettingDialog'

export default {
  components: {
    AppIconButton,
    AppTextButton,
    AppSettingDialog
  },
  data () {
    return {
      icons,
      showSettingDialog: false,
      date: createDateFromYearMonthString(this.$route.query.month)
    }
  },
  computed: {
    month () {
      return formatDate(this.date, 'yyyyMM')
    }
  },
  methods: {
    openSettingDialog () {
      this.showSettingDialog = true
    },
    toPrevMonthPage () {
      this.date = subMonth(this.date, 1)
      this.$router.push({ query: { month: this.month } })
    },
    toCurrentMonthPage () {
      this.date = new Date()
      this.$router.push({ query: { month: this.month } })
    },
    toNextMonthPage () {
      this.date = addMonth(this.date, 1)
      this.$router.push({ query: { month: this.month } })
    }
  }
}
</script>
