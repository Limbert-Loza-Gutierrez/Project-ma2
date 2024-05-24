// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// apiKey: "AIzaSyBr1eo0-KSFh7g9P46o_9Es2ODAyUr0CUo",
// authDomain: "sap-app-780dd.firebaseapp.com",
// projectId: "sap-app-780dd",
// storageBucket: "sap-app-780dd.appspot.com",
// messagingSenderId: "139327639591",
// appId: "1:139327639591:web:881a51118eaf4f1a337e02",
// measurementId: "G-HW5MCPFW31",
// };
//

const firebaseConfig = {
  apiKey: "AIzaSyA4VjStHxX4xDRBRNhB4pw50GcMxS_Dxy4",
  authDomain: "sap2024-1e065.firebaseapp.com",
  projectId: "sap2024-1e065",
  storageBucket: "sap2024-1e065.appspot.com",
  messagingSenderId: "545281544466",
  appId: "1:545281544466:web:63fe440fbf6d45d1afe3cb",
  measurementId: "G-GFDC54XF8P",
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
export { appFirebase, db };
