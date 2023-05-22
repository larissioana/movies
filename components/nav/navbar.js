import styles from '@/components//nav/navbar.module.css';
import { useRouter } from 'next/router';
import { useState, useContext} from 'react';
import { UserContext } from '@/context/userContext';
import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames'
import { signOutUser } from '@/utils/firebase';

const NavBar = () => {
    const router=useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext);


    console.log({currentUser})
    const handleOnClickHome = () => {
        router.push('/')
    };

    const handleSignOut = async () => {
      await signOutUser();
      setCurrentUser(null);
      router.push('/auth/login')
     
    }

    const handleOnClickSearch = () => {
        router.push('/searchMovies')
    };

    return(
        <nav className={styles.navbar}>
           
                
            <div className={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={styles.line}></div>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
            </div>
            <Link className={styles.logoLink} href='/'>
             <div className={styles.logoWrapper}>MOVIES</div>
            </Link>
            <ul className={ isMenuOpen ? cls(styles.navLinks, styles.showLinks) : styles.navLinks}>
                <li className={styles.links} onClick={handleOnClickHome}>Home</li>
                <li className={styles.links} onClick={handleOnClickSearch}>Search</li>
                
            </ul>
            <div className={styles.btnContainer}>
                    <button className={styles.loginBtn} >
                   {!currentUser ?
                   <div className={styles.login}>
                   <Link className={styles.signIn} href='/auth/login'>Sign in</Link>
                   {/* <Link className={styles.signUp} href='/auth/signup'>Sign up</Link> */}
                   </div>
                   :
                   <>
                   <p className={styles.userEmail}>{currentUser.email}</p> 
                   <Image onClick={() => setShowDropdown(!showDropdown)} src='/static/expand-icon.svg' alt='Expand dropdown' width='32' height='32'/>
                   </>
                   }
                    </button>
                   {showDropdown && (
                    <div className={styles.navDropdown}>
                        <div>
                        <a className={styles.linkName} 
                        href='/auth/login' onClick={handleSignOut}>Sign out</a>
                        <div className={styles.lineWrapper}></div>
                       
                    </div>
                    </div>
               )}
                </div>
            
            </nav>
      
    )
};
export default NavBar;