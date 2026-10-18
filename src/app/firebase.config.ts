import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBilx4YF79GeCJe_F2Tu1k-7UqnW1oPvVs',
  authDomain: 'challenge-09-tareas-2c4be.firebaseapp.com',
  databaseURL: 'https://challenge-09-tareas-2c4be-default-rtdb.firebaseio.com',
  projectId: 'challenge-09-tareas-2c4be',
  storageBucket: 'challenge-09-tareas-2c4be.firebasestorage.app',
  messagingSenderId: '361055981730',
  appId: '1:361055981730:web:8e062a14a17beae2c5c7fb'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);