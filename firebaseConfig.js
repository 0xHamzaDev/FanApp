// firebaseConfig.js
import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAAg8_Rw59PgQyvgxIT4BuTeeJ8laHL1js",
	authDomain: "fans-app-b2808.firebaseapp.com",
	projectId: "fans-app-b2808",
	storageBucket: "fans-app-b2808.appspot.com",
	messagingSenderId: "476654496827",
	appId: "1:476654496827:web:fb568e820730ec3323401e",
	measurementId: "G-1GX7M53D5D"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };