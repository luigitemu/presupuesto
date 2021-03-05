import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7uz7iJkkOxgtNy9cOdVdVKN4kkZ07NGQ",
    authDomain: "budget-calculator-react.firebaseapp.com",
    projectId: "budget-calculator-react",
    storageBucket: "budget-calculator-react.appspot.com",
    messagingSenderId: "378571334997",
    appId: "1:378571334997:web:9e5f3129f2ed71a081bbdc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}