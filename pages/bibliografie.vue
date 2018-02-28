<template>
  <section class="container content">
    <nav-bar parent="biblio"></nav-bar>
    <div class="main fiche-content">
      <h2>{{ biblio.Titel }}</h2>
      <div v-html="biblio.Content"></div>
    </div>
  </section>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
  components: {
    'nav-bar': Navbar
  },
  asyncData ({store, params}) {
    return {
      title: 'Bibliografie',
      biblio: store.getters.getBiblio[0]
    }
  }
}
</script>