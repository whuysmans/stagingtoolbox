<template>
  <div>
    <div class="home">
      <nav-bar></nav-bar>
      <section class="hero home-hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ homeInfo.Titel }}
            </h1>
            <h2 class="subtitle">
              {{ homeInfo.Subtitle }}
            </h2>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-half home-info">
              <div class="home-info-body" v-html="homeInfo.Beschrijving"></div>
              <article class="message is-link">
                <div class="message-body" v-html="homeInfo.Extra"></div>
              </article>
            </div>
            <toolbox-filter :themas="themas" :fiches="fiches"></toolbox-filter>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Filter from '../components/Filter'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
export default {
  components: {
    'toolbox-filter': Filter,
    'nav-bar': Navbar,
    'login': Login
  },
  middleware: ['check-auth', 'auth'],
  data () {
    return {
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    themas () {
      return this.$store.getters.getKernThemas
    },
    homeInfo () {
      return this.$store.getters.getHomeInfo[0]
    },
    fiches () {
      return this.$store.getters.getInfoFiches
    }
  }
}
</script>

<style scoped>

.links {
  padding-top: 15px;
}

</style>
