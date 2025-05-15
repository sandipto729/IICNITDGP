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

    const filteredNews = newsList.filter((news) => {
        const eventDate = new Date(news.date);
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

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={() => setFilter('upcoming')}
                    style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        backgroundColor: filter === 'upcoming' ? '#0070f3' : '#ccc',
                        color: filter === 'upcoming' ? 'white':'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Upcoming Events
                </button>
                <button
                    onClick={() => setFilter('past')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: filter === 'past' ? '#0070f3' : '#ccc',
                        color: filter === 'past' ? 'white':'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
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
                        <p style={{ textAlign: 'center', width: '100%' }}>
                            No {filter} events found.
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default NewsEvent;
