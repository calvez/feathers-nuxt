<template>
  <section class="products">
    <!-- Switchers for filter products by their status -->
    <div class="columns is-mobile is-multiline is-centered">
      <div class="column is-narrow">
        <div class="field">
          <p class="menu-label">{{$t("filter")}}</p>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <b-switch
            size="is-small"
            v-if="$store.getters.loggedIn == true"
            @input="submitFilters"
            v-model="filters.isBiddedProductsSwitched"
          >{{$t("bidded_products")}}</b-switch>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <b-switch
            size="is-small"
            v-if="$store.getters.loggedIn == true"
            @input="submitFilters"
            v-model="filters.isFavoritesProductsSwitched"
          >{{$t("favorite_products")}}</b-switch>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <b-switch
            size="is-small"
            v-if="$store.getters.loggedIn == true"
            @input="submitFilters"
            v-model="filters.isUploadedProductsSwitched"
          >{{$t("users_products")}}</b-switch>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <b-switch
            size="is-small"
            @input="submitFilters"
            v-model="filters.isFinshedProductsSwitched"
          >{{$t("expired_products")}}</b-switch>
        </div>
      </div>
    </div>
    <!-- End of Switchers -->
    <div class="column is-multiline raw is-vcentered"></div>
    <div class="columns">
      <div class="columns features is-multiline">
        <div
          class="column is-three-quarters-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-one-fifth-fullhd"
          v-for="(product, index) in wholeResponse"
          :key="index"
        >
          <div
            v-bind:class="[ isActive ? 'card card-is-shady' : 'card has-background-white-ter', hasFinished ]"
          >
            <div class="card-image">
              <figure class="image is-4by3" @click="singleProduct(product.id)">
                <img
                  v-if="product.Images.path"
                  :src="backendUrl + '/' +  product.Images[0].path"
                  aspect-ratio="1"
                  :alt="product.name"
                  :title="product.name"
                >
                <img
                  v-else
                  src="https://placehold.co/300x200/EEE/31343C"
                  :alt="product.name"
                  :title="product.name"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h4>{{product.name}}</h4>
                <strong
                  v-if="time.diff(product.Bid.finish) < 0"
                  class="text-muted"
                >{{ remTimeFormat(time, product.Bid.finish) }}</strong>
                <strong v-else class="text-muted">{{$t("auction_is_closed")}}</strong>
                <hr>
                <template>
                  <b-taglist>
                    <b-tag
                      rounded
                      v-for="(category, index) in product.Categories"
                      :key="index"
                    >{{ category.name }}</b-tag>
                  </b-taglist>
                </template>
                <p class="small">{{product.description}}</p>
                <hr>
                <p class="is-info">{{ $t('bid_step')}}: {{product.Bid.bid_step }}</p>
                <h5 class="primary">{{$t("price")}}: {{product.Bid.price}}</h5>
              </div>
            </div>
            <footer class="card-footer">
              <a
                href="#"
                class="card-footer-item is-secondary"
                @click="singleProduct(product.id)"
              >Részletek</a>
            </footer>
            <b-collapse :open="false" aria-id="fastBid">
              <span
                class="card-footer-item button is-primary"
                v-if="$store.getters.loggedIn == true && time.diff(product.Bid.finish) < 0"
                aria-controls="fastBid"
                slot="trigger"
              >Licitálok</span>
              <div class="notification">
                <div class="content">
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded">
                        <input class="input" type="number" placeholder>
                      </p>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <div class="control">
                          <button class="button is-primary">{{$t('place_bid')}}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  name: 'Home',
  layout: 'default',
  data() {
    return {
      isConnected: false,
      socketMessage: "",
      msg: "response",
      products: null,
      //time: this.$moment(),
      user: Math.floor(Math.random() * 100),
      loading: true,
      backendUrl: this.$backendUrl,
      wholeResponse: [],
      loading: true,
      filters: {
        isBiddedProductsSwitched: 0,
        isFavoritesProductsSwitched: 0,
        isUploadedProductsSwitched: 0,
        isFinshedProductsSwitched: 0
      },
      isActive: true,
      hasFinished: true
    };
  },
  mounted() {
    this.submitFilters();
  },
  methods: {
    singleProduct(id) {
      this.$router.push({ name: "Product", params: { id } });
    },
    submitFilters() {
      console.log("submitFilters", this.filters);
      this.$http
        .get("products/" + this.filterParams)
        .then(response => {
          this.wholeResponse = response.data.products;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    filterParams: function() {
      let param = 0;
      if (this.filters.isFavoritesProductsSwitched) {
        param |= 1;
      }
      if (this.filters.isBiddedProductsSwitched) {
        param |= 2;
      }
      if (this.filters.isFinshedProductsSwitched) {
        param |= 4;
      }
      if (this.filters.isUploadedProductsSwitched) {
        param |= 8;
      }
      return param ? param : "";
    },
    bidFinished() {
      if (this.time.diff(product.Bid.finish) < 0) return "hasFinished: true";
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log("connect");
    },

    disconnect() {
      this.isConnected = false;
      console.log("disconnect");
    },

    respLicit(data) {
      console.log("data");
      this.socketMessage = data;
    },
    serverTime(data) {
      //this.time = this.$moment(data); //.format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

