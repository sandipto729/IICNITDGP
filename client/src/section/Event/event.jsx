import React, { useState, useEffect } from 'react';
import EventCard from './../../component/ReadMore/readmore';
// import newsData from '../../data/SchoolMedia.json';
import Events from './../../../public/data/events.json';
import styles from './styles/events.module.scss';
import GradientText from '../../component/Core/TextStyle';
import API from '../../common/api';
import PageLoading from '../../layouts/PageLoading/Loading';

const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNewsData = async () => {
        setLoading(true);
        const response= await fetch(API.WebinarFetch.url, {
            method: API.WebinarFetch.method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setNewsList(data);
        } else {
            console.error("Failed to fetch news data");
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchNewsData();
    }, []);
    

    return (
        <>
            <center className={styles.newsTitle}>
               
                    <div >Our <span style={{
                        background: "var(--primary)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}>Events</span></div>
                    <div className={styles.bottomLine}></div>
              
            </center>
            {loading ? <PageLoading /> : <div className={styles.newsContainer}>

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
            </div>}
        </>
    );
};

export default NewsEvent;


