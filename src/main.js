import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)

const firebaseConfig = {
  apiKey: "AIzaSyBXUo5msrS94WawE9kS2D7BUG-NZQIBpBk",
  authDomain: "rumbling-roar.firebaseapp.com",
  databaseURL: "https://rumbling-roar.firebaseio.com",
  projectId: "rumbling-roar",
  storageBucket: "rumbling-roar.appspot.com",
  messagingSenderId: "244133182678",
  appId: "1:244133182678:web:aa822a303604cb8676dd77",
  measurementId: "G-1H0D7SEDVQ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth()
export const db = firebase.firestore()

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
