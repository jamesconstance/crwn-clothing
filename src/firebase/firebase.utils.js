import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyDKadFymQ8O2Rcsn4AFX8c8Iu-SdLsz_Ug',
  authDomain: 'crwn-db-121fc.firebaseapp.com',
  projectId: 'crwn-db-121fc',
  storageBucket: 'crwn-db-121fc.appspot.com',
  messagingSenderId: '799710443108',
  appId: '1:799710443108:web:160fa129b8a218caa49171',
  measurementId: 'G-6MJRXCT6CK',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
