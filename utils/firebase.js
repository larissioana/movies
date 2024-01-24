import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';


const firebaseConfig =
{
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE,
  messagingSenderId:process.env.NEXT_PUBLIC_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

export const createUser =  async (user) => 
{
 if (!user) return;
 const userDocReference = doc(db, 'users', user.uid);
 const userSnapshot = await getDoc(userDocReference);

 if (!userSnapshot.exists())
  {
    const {displayName, email} = user;

    try
    {
    await setDoc(userDocReference,
      {
        email,
        displayName
      })
    } catch(error)
    {
      console.log('Error creating the user', error)
    }
  }
  return userDocReference;
};

export const registerUserWithEmailAndPassword = async (email, password) =>
{
  if (!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password)
};

export const signinUser = async (email, password) =>
{
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth);