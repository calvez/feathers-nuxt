<template>
  <section>
    <h1>Authenticate!</h1>
    <form class="auth-form">
      <ul>
        <li><input v-model="email" placeholder="email" /></li>
        <li><input v-model="password" placeholder="password" type="password" /></li>
      </ul>
      <button @click.prevent="login">Login</button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      email: 'e-mail',
      password: 'password'
    };
  },

  methods: {
    ...mapActions('auth', ['authenticate']),

    async login() {
      const credentials = { email: this.email, password: this.password };
      await this.authenticate({ ...credentials, strategy: 'local' });
      this.$router.push('/secret');
    }
  }
}
</script>

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>

