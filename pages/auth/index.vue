<template>
  <div>
    <login @loginSubmit="handleSubmit"></login>
  </div>
</template>
<script>
import Login from '@/components/Login'
import axios from 'axios'
export default {
  components: {
    'login': Login
  },
  middleware: ['check-auth', 'auth'],
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
