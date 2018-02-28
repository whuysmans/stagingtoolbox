<template>
  <section class="container content">
    <div class="main">
      <page-header :fiche="fiche" :color="backgroundColor"></page-header>
      <tags :fiche="fiche"></tags>
      <div class="section">
        <aside-menu class="sticky-menu" :fiche="fiche"></aside-menu>
        <page-content :fiche="fiche" :color="textColor"></page-content>
      </div>
    </div>
    <pagination :slug="fiche.Slug"></pagination>
  </section>
</template>
<script>
import Pagination from '../components/Pagination'
import Tags from '../components/Tags'
import PageHeader from '../components/PageHeader'
import PageContent from '../components/PageContent'
import Aside from '../components/Aside'
export default {
  components: {
    'pagination': Pagination,
    'tags': Tags,
    'page-header': PageHeader,
    'page-content': PageContent,
    'aside-menu': Aside
  },
  middleware: ['check-auth', 'auth'],
  asyncData ({store, params}) {
    return {
      title: params.slug,
      fiche: store.getters.getInfoFiche(params.slug)[0]
    }
  },
  computed: {
    backgroundColor () {
      return this.$store.getters.getClassSlug(this.fiche.Kernthemas.display)
    },
    textColor () {
      return 'tekst-' + this.$store.getters.getClassSlug(this.fiche.Kernthemas.display)
    }
  }
}
</script>