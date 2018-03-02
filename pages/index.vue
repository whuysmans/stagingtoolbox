<template>
  <div>
    <div v-if="isAuthenticated" class="home">
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
    <div v-else>
      <login @loginSubmit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import Filter from '../components/Filter'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import axios from 'axios'
export default {
  components: {
    'toolbox-filter': Filter,
    'nav-bar': Navbar,
    'login': Login
  },
  middleware: ['check-auth'],
  data () {
    return {
    }
  },
  computed: {
    themas () {
      return this.$store.getters.getKernThemas
    },
    homeInfo () {
      return this.$store.getters.getHomeInfo
    },
    fiches () {
      return this.$store.getters.getInfoFiches
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    handleSubmit (password) {
      axios.post('https://us-central1-fev-auth.cloudfunctions.net/authenticateMe', {
        data: {
          jwt: password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((result) => {
        this.$store.dispatch('authenticate', result.data).then(() => {
          this.$router.push('/')
        })
      }).catch((error) => console.log(error))
    }
  }
}
</script>

<style scoped>

.links {
  padding-top: 15px;
}

</style>
