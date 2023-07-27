import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC4nKE9YlvfLsEqj68FtB9O1q08vduwTGc",
    authDomain: "maintenance-app-438a0.firebaseapp.com",
    projectId: "maintenance-app-438a0",
    storageBucket: "maintenance-app-438a0.appspot.com",
    messagingSenderId: "660632104155",
    appId: "1:660632104155:web:2ed50a3849a560106230fe",
    measurementId: "G-YND5Z9VH6B"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export { firebase };