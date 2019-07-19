<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="~/assets/images/logo.png" height="40" alt="Aukciók  - Helytörténet Webshop" />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <n-link class="navbar-item" to="/about">Home</n-link>

        <n-link class="navbar-item" to="/products">{{$t("all_products")}}</n-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light">Log in</a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Docs</a>

          <div class="navbar-dropdown is-right">
            <a class="navbar-item">Overview</a>
            <a class="navbar-item">Elements</a>
            <a class="navbar-item">Components</a>
            <hr class="navbar-divider" />
            <div class="navbar-item">Version 0.7.5</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navigation",

  computed: {
    ...mapState("auth", ["accessToken"]),
    isAuthenticated() {
      return this.accessToken;
    }
  }
};
</script>

<style>
</style>

