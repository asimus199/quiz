import extend from '../utils/extend-vue-app'

export default async function ({ app }) {
  extend(app, {
    mounted () {
      if (this.$nuxt.$route.query && this.$nuxt.$route.query.ref_id) {
        localStorage.setItem('ref_id', this.$nuxt.$route.query.ref_id)
      }
    }
  })
}
