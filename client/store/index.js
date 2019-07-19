import feathersClient from '../feathers-client';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

export const state = () => ({
  locales: ['hu', 'en'],
  locale: 'hu'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  }
};

export const plugins = [
  service('users'),
  auth({
    state: { publicPages: ['index', 'authenticate', 'products'] },
    userService: 'users'
  })
];
