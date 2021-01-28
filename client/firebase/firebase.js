import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAMO36_sE__uE43U0uZjPnieZCjMacU_dc",
    authDomain: "tms-fileupload.firebaseapp.com",
    projectId: "tms-fileupload",
    storageBucket: "tms-fileupload.appspot.com",
    messagingSenderId: "866676628804",
    appId: "1:866676628804:web:e45e991921fe6ad1a30b11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export  {
    storage, firebase as default
  }