import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { toggleTheme } = useTheme();
  const [currentImage, setCurrentImage] = useState('/assets/me.png');

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.oneLine}>
      <div className={`${styles.header} ${styles.profile}`}>
        <h1>Aaron Feleke</h1>
        
        <h3 className={styles.getInTouch}>Let's Get In Touch ↓</h3>
        
        <div className={styles.socialMedia}>
          <img 
            src="/assets/goodreads.png" 
            onClick={() => handleSocialClick('https://www.goodreads.com/feleke')}
            alt="My Goodreads" 
            className={styles.socialIcon}
          />
          <img 
            src="/assets/github.png" 
            onClick={() => handleSocialClick('https://www.github.com/Aaron98990')}
            alt="My GitHub" 
            className={styles.socialIcon}
          />
          <img 
            src="/assets/linkedin.png" 
            alt="My LinkedIn" 
            onClick={() => handleSocialClick('https://www.linkedin.com/in/feleke')}
            className={`${styles.socialIcon} ${styles.linkedinIcon}`}
          />
        </div>
        
        <div className={styles.themeButtonContainer}>
          <button onClick={toggleTheme} className={styles.themeButton}>
            Change Theme
          </button>
        </div>
      </div>
      
      <div className={styles.pictures}>
        <img 
          className={`${styles.profileImage} ${styles.firstImage}`} 
          src="/assets/me.png" 
          alt="Aaron Feleke" 
        />    
        <img 
          className={`${styles.profileImage} ${styles.secondImage}`} 
          src={currentImage} 
          alt="Aaron Feleke" 
        />   
        <img 
          className={`${styles.profileImage} ${styles.thirdImage}`} 
          src="/assets/me.png" 
          alt="Aaron Feleke" 
        />   
      </div>
    </div>
  );
};

export default Header;