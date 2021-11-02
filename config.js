import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDb7GjMltIXlNGzgUurzS_8bhZMf381xy0",
  authDomain: "barterapp-c35ed.firebaseapp.com",
  projectId: "barterapp-c35ed",
  storageBucket: "barterapp-c35ed.appspot.com",
  messagingSenderId: "923837536609",
  appId: "1:923837536609:web:e5c8913dc64b03d7464d20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();