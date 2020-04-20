import Vue from 'vue'

import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firestore'

import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: "AIzaSyDJYbXGpV-Q-MmviQ7RkQb7-8PzRZUHaXg",
    authDomain: "chat-4c88d.firebaseapp.com",
    databaseURL: "https://chat-4c88d.firebaseio.com",
    projectId: "chat-4c88d",
    storageBucket: "chat-4c88d.appspot.com",
    messagingSenderId: "521920975346",
    appId: "1:521920975346:web:ae5767c1e89bd12f801b6b"
}

firebase.initializeApp(firebaseConfig)
const ui = new firebaseui.auth.AuthUI(firebase.auth())

Vue.prototype.$firebase = firebase
Vue.prototype.$firebaseui = ui

export const db = firebase.firestore()