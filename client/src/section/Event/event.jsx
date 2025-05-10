import React, { useState, useEffect } from 'react';
import EventCard from './../../component/ReadMore/readmore';
// import newsData from '../../data/SchoolMedia.json';
import Events from './../../../public/data/events.json';
import styles from './styles/events.module.scss';
import GradientText from '../../component/Core/TextStyle';

const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);

    const fetchNewsData = async () => {
        try {
            const data = Events;

            const newsdata = data.events;

            setNewsList(newsdata.reverse());

        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    }
    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <>
            <center className={styles.newsTitle}>
                <h2>
                    <div >Our <span style={{
                        background: "var(--primary)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}>Events</span></div>
                </h2>
            </center>
            <div className={styles.newsContainer}>

                {newsList.map((news, index) => (
                    <EventCard
                        key={index}
                        image={news.photo}
                        title={news.name}
                        date={news.date}
                        time={news.time ? new Date(news.updatedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
                        content={news.details}
                    />
                ))}
            </div>
        </>
    );
};

export default NewsEvent;


