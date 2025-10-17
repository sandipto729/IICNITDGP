import React from 'react';
import styles from './Registration.module.scss';
import regImage from '../../../assets/ai2_reg.jpeg';

const Registration = () => {
  return (
    <section className={styles.registrationContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>
            <span
            style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Registration
          </span>
          </h2>
          {/* <div className={styles.bottomLine}></div> */}
        </div>
        
        <div className={styles.registrationContent}>
          <div className={styles.imageContainer}>
            <img 
              src={regImage} 
              alt="AI² Summit Registration Poster" 
              className={styles.registrationImage}
            />
          </div>
          
          <div className={styles.instructionsContainer}>
            <h3 className={styles.instructionsTitle}>How to Register</h3>
            <p className={styles.description}>
              Follow these simple steps to register for the AI² Summit:
            </p>
            
            <ol className={styles.instructionsList}>
              <li className={styles.instructionItem}>
                <strong>Step 1:</strong> Download and fill the conference offline form (only the upper part) - 
                enter your <strong>Name</strong> and provide your <strong>Signature</strong>.
                <br />
                <a 
                  href="https://docs.google.com/document/d/1Mr_Y_pQQ397LVu0Se8Hn7C_WWbw_3OHW6nrbV4lGUGM/edit?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.documentLink}
                >
                  📄 Download Offline Form
                </a>
              </li>
              
              <li className={styles.instructionItem}>
                <strong>Step 2:</strong> Scan the completed offline form (upper part only) and save it as a PDF or image file.
              </li>
              
              <li className={styles.instructionItem}>
                <strong>Step 3:</strong> Fill out the online Google Form using the QR code on the poster or the link below.
              </li>
              
              <li className={styles.instructionItem}>
                <strong>Step 4:</strong> Upload the scanned copy of your completed offline form when prompted in the Google Form.
              </li>
            </ol>
            
            <div className={styles.actionSection}>
              <p className={styles.helpText}>
                Need help? Contact the organizers if you face any issues during registration.
              </p>
              
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSc4-fAiiM-HFIodR-d8ge9Lgny0xym7ckkWSZtmU-9Hz7ufEg/viewform" 
                target="_blank" 
                rel="noreferrer"
                className={styles.registrationButton}
              >
                🚀 Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;