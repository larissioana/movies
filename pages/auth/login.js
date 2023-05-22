import Head from "next/head";
import styles from '../../styles/login.module.css';
import { useRouter } from "next/router";
import {useState, useContext} from "react";
import { UserContext } from "@/context/userContext";
import { signinUser} from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/components/loading/loading";
import FormInput from "@/components/formInput/formInput";

const initialFormFields = {
    email: '',
    password: ''
};

const Login = () => {
   const router = useRouter();
   const [userMsg, setUserMsg] = useState('');
   const [formFields, setFormFields] = useState(initialFormFields);
   const {email, password} = formFields;
   const {setCurrentUser} = useContext(UserContext);

   const handleOnSubmit = async (event) => {
    event.preventDefault();
    
    try{
    const {user} = await signinUser(email, password);
    setCurrentUser(user);
    resetFormFields();
    router.push('/')
    } catch(error) {
      if(error.code === 'auth/wrong-password') {
        setUserMsg('Incorrect password for this email')
      } else if(error.code === 'auth/user-not-found') {
        setUserMsg('No user associated with this password')
      } 
     console.log('Error logging in', error)
        
     }
   };

   const resetFormFields = () => {
    setFormFields(initialFormFields);
   };

   const handleOnChange = (event) => {
    setUserMsg("");
    const {name, value} = event.target;
    setFormFields({...formFields, [name] : value})
   }

    return (
        <>
        <Head>
            <title>SignIn</title>
        </Head>
        <div className={styles.container}>
          <form  onSubmit={handleOnSubmit} className={styles.main}>
          <div className={styles.mainWrapper}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.text}>Don't have an account?</p>
          <p className={styles.text2} onClick={() => router.push('/auth/signUp')}>Register </p>
          <div className={styles.signIn}>
          <FormInput required type='email' onChange={handleOnChange} className={styles.input} placeholder="Email" name='email' value={email}/>
          <FormInput required type='password' onChange={handleOnChange} className={styles.input} placeholder="Password" name='password' value={password}/>
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn}>Sign in</button>
          </div>
          </div>
          </form>
          </div>
    
        </>
    )
};

export default Login;