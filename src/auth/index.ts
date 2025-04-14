import { initializeApp } from "firebase/app"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB43Sa2mXbqiae0zjBa5oVHh-QWS8ccoq8",
    authDomain: "olinks-firestore.firebaseapp.com",
    projectId: "olinks-firestore",
    storageBucket: "olinks-firestore.firebasestorage.app",
    messagingSenderId: "126461930097",
    appId: "1:126461930097:web:393c60cacc78d25214c9d0",
    measurementId: "G-V4NK541H92"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
// window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});