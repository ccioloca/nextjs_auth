import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvoU_FYVosYszCOim0pn5edETxqMHnoVA",
  authDomain: "wdmauth.firebaseapp.com",
  projectId: "wdmauth",
  storageBucket: "wdmauth.appspot.com",
  messagingSenderId: "379330790660",
  appId: "1:379330790660:web:69f015d456f1533f06fc51"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;