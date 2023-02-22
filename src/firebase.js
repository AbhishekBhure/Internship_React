import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAz2azaDACWM2w4X83LA7zsu5kU5OyuSDI",
  authDomain: "internship-67bff.firebaseapp.com",
  projectId: "internship-67bff",
  storageBucket: "internship-67bff.appspot.com",
  messagingSenderId: "611156607926",
  appId: "1:611156607926:web:ac124ce99e86921512b717",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
