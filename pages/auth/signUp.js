import Head from "next/head";
import styles from '../../styles/login.module.css';
import { useState, useContext } from "react";
import {registerUserWithEmailAndPassword, createUser} from '../../utils/firebase';
import FormInput from "@/components/formInput/formInput";
import { useRouter } from "next/router";
import { UserContext } from "@/context/userContext";
import Loading from "@/components/loading/loading";

const initialFormFields = {
    name: '',
    email: '',
    password: ''
};

const SignUp = () => {
   const [formFields, setFormFields] = useState(initialFormFields);
   const [isLoading, setIsLoading] = useState(false);
   const {name, email, password} = formFields;
   const [userMsg, setUserMsg] = useState("");
   const router = useRouter();
   const {setCurrentUser} = useContext(UserContext);

   const handleOnChange = (event) => {
    setUserMsg("");
   const {name, value} = event.target;
   setFormFields({...formFields, [name] : value})
   };

   const resetFormFields = () => {
    setFormFields(initialFormFields);
   }

    const handleOnSubmit = async (event) => {
     event.preventDefault();

     try{
       setIsLoading(true);
       const {user} = await registerUserWithEmailAndPassword(email, password);
       await createUser(user);
       setCurrentUser(user);
       resetFormFields();
      
       router.push('/');
       isLoading(false);
     } catch(error) {
      setIsLoading(false);
       if(error.code === 'auth/email-already-in-use'){
        setUserMsg('Cannot create user, email already in use')
       } 
       console.log('User created encountered an error', error);
     }
    }


    return (
        <>
        <Head>
            <title>SignUp</title>
        </Head>
        {isLoading? <Loading/> :
        <div className={styles.container}>
          <form className={styles.main} onSubmit={handleOnSubmit}>
          <div className={styles.mainWrapper}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.text}>Already subscribed to Movies?</p>
          <p className={styles.text2} onClick={() => router.push('/auth/login')}>Sign In</p>
          <div className={styles.signIn}>
          <FormInput required onChange={handleOnChange} name='name' value={name} type='text' className={styles.input} placeholder="Name - Surname"/>
          <FormInput required onChange={handleOnChange} name='email' value={email} type='email' className={styles.input} placeholder="Email"/>
          <FormInput required  onChange={handleOnChange} name='password' value={password} type='password' className={styles.input}  placeholder='Password'/>
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn}> Sign up</button>
          </div>
          </div>
          </form>
          </div>
}
        </>
    )
};

export default SignUp;