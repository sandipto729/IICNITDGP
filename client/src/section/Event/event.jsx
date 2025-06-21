// import React, { useState, useEffect } from 'react';
// import EventCard from './../../component/ReadMore/readmore';
// // import newsData from '../../data/SchoolMedia.json';
// import Events from './../../../public/data/events.json';
// import styles from './styles/events.module.scss';
// import GradientText from '../../component/Core/TextStyle';
// import API from '../../common/api';
// import PageLoading from '../../layouts/PageLoading/Loading';

// const NewsEvent = () => {
//     const [newsList, setNewsList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchNewsData = async () => {
//         setLoading(true);
//         const response= await fetch(API.WebinarFetch.url, {
//             method: API.WebinarFetch.method,
//             mode: "cors",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (response.ok) {
//             const data = await response.json();
//             setNewsList(data.reverse());
//         } else {
//             console.error("Failed to fetch news data");
//         }
//         setLoading(false);
//     }
//     useEffect(() => {
//         fetchNewsData();
//     }, []);


//     return (
//         <>
//             <center className={styles.newsTitle}>

//                     <div >Our <span style={{
//                         background: "var(--primary)",
//                         WebkitBackgroundClip: "text",
//                         color: "transparent",
//                     }}>Events</span></div>
//                     <div className={styles.bottomLine}></div>

//             </center>
//             {loading ? <PageLoading /> : <div className={styles.newsContainer}>

//                 {newsList.map((news, index) => (
//                     <EventCard
//                         key={index}
//                         image={news.photo}
//                         title={news.name}
//                         date={news.date}
//                         time={news.time ? news.time : new Date().toLocaleTimeString()}
//                         content={news.details}
//                     />
//                 ))}
//             </div>}
//         </>
//     );
// };

// export default NewsEvent;


import React, { useState, useEffect } from 'react';
import EventCard from './../../component/ReadMore/readmore';
import styles from './styles/events.module.scss';
import GradientText from '../../component/Core/TextStyle';
import API from '../../common/api';
import PageLoading from '../../layouts/PageLoading/Loading';

const NewsEvent = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'past'

    const fetchNewsData = async () => {
        setLoading(true);
        const response = await fetch(API.WebinarFetch.url, {
            method: API.WebinarFetch.method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setNewsList(data.reverse());
        } else {
            console.error("Failed to fetch news data");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNewsData();
    }, []);

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const filteredNews = newsList.filter((news) => {
        const eventDate = new Date(news.date);
        eventDate.setHours(0, 0, 0, 0);
        console.log('Event Date:', eventDate, "Current Date:", now);

        return filter === 'upcoming' ? eventDate >= now : eventDate < now;
    });

    return (
        <>
            <center className={styles.newsTitle}>
                <div>
                    Our <span style={{
                        background: "var(--primary)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}>Events</span>
                </div>
                <div className={styles.bottomLine}></div>
            </center>

            <div className={styles.filterTabs}>
                <button
                    onClick={() => setFilter('upcoming')}
                    className={filter === 'upcoming' ? styles.active : ''}
                >
                    Upcoming Events
                </button>
                <button
                    onClick={() => setFilter('past')}
                    className={filter === 'past' ? styles.active : ''}
                >
                    Past Events
                </button>
            </div>


            {loading ? (
                <PageLoading />
            ) : (
                <div className={styles.newsContainer}>
                    {filteredNews.length > 0 ? (
                        filteredNews.map((news, index) => (
                            <EventCard
                                key={index}
                                image={news.photo}
                                title={news.name}
                                date={news.date}
                                time={news.time ? news.time : new Date().toLocaleTimeString()}
                                content={news.details}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', margin: 'auto' }}>
                            No {filter} events found.
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default NewsEvent;
