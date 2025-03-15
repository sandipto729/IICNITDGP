import React from 'react';

import styles from './styles/newsletter.module.scss';

const Newsletter = () => {
    const [email, setEmail] = React.useState('');


    const handleSubscribe = () => {
        // Handle subscription logic here
        console.log(`Subscribed with email: ${email}`);
    };

    return (
        <div className={styles.newsletterContainer}>
            <h2>Subscribe to our Newsletter</h2>
            <p>Stay updated with the latest news and events.</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.emailInput}
            />

            <button onClick={handleSubscribe} className={styles.subscribeButton}>Subscribe</button>
        </div>
    );
};

export default Newsletter;
