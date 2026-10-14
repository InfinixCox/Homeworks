import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC9LHeb2G7WIMZcd_3HX_7xjgPCvNAYpN4',
  authDomain: 'repaso-edya2.firebaseapp.com',
  databaseURL: 'https://repaso-edya2-default-rtdb.firebaseio.com',
  projectId: 'repaso-edya2',
  storageBucket: 'repaso-edya2.firebasestorage.app',
  messagingSenderId: '32840788360',
  appId: '1:32840788360:web:9026bc531182b9b99ef23d'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };