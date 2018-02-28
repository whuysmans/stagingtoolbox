<template>
  <section class="container content">
    <div class="section">
      <div class="columns is-centered">
        <div class="column is-half is-narrow">
          <div class="field">
            <label for="email" class="label">Vul hier het wachtwoord voor de toolbox in:</label>
          </div>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input 
                type="password" 
                class="input" 
                :class="success ? 'is-success' : 'is-danger'" 
                v-model="password" 
                placeholder="wachtwoord"
                ref="pw-login"
                autofocus
                @keyup.enter="submit">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
              <span class="icon is-small is-right" >
                <i :class="success ? 'fa fa-check' : 'fa fa-warning'"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click.prevent="submit">Submit</button>
            </div>
            <div class="control">
              <button class="button is-text" @click.prevent="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      password: '',
      success: false
    }
  },
  methods: {
    submit () {
      this.$emit('loginSubmit', this.password)
    },
    cancel (event) {
      this.$refs['pw-login'].value = ''
      this.$refs['pw-login'].focus()
    }
  }
}
</script>