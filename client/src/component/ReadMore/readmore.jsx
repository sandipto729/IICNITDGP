import React, { useEffect, useState } from 'react';
import styles from './styles/readmore.module.scss';
import Button from '../Core/Button';
import { Blurhash } from "react-blurhash";
import GradientText from "../../component/Core/TextStyle";

const NewsCard = ({ image, title, date, time, content }) => {
    const [showModal, setShowModal] = useState(false);

    // Enhanced modal handlers with body scroll lock
    const handleReadMore = () => {
        setShowModal(!showModal);
        if (!showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const handleModalClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleModalClose(e);
        }
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const truncatedContent = (html, length) => {
        const text = stripHtml(html);
        return text.length > length ? text.slice(0, length) + "..." : text;
    };

    const [cardImageLoaded, setCardImageLoaded] = useState(false);
    const [modalImageLoaded, setModalImageLoaded] = useState(false);

    return (
        <div className={styles.newsCard}>
            {/* <img src={image} alt={title} className={styles.newsCardImage} /> */}


            <div className={styles.imageContainer}>
                {!cardImageLoaded && (
                    <Blurhash
                        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" // Replace with actual Blurhash
                        width="100%"
                        height={180} // Adjust height as needed
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                        className={styles.newsCardImage}
                    />
                )}
                <img
                    src={image}
                    alt={title}
                    className={styles.newsCardImage}
                    onLoad={() => setCardImageLoaded(true)}
                    style={{ display: cardImageLoaded ? "block" : "none" }} // Hide image until loaded
                />
            </div>
            <div className={styles.newsCardContent}>
                <h4 className={styles.schoolName}>National Institute Of Technology, Durgapur</h4> {/* Constant school name */}
                <h4 className={styles.schoolName}></h4> {/* Constant school name */} 
                <h3 className={styles.newsTitle}>{title}</h3>
                <p className={styles.newsDateTime}>
                    {date} - {time}
                </p>
                <p className={styles.newsDescription}>
                    {/* {content.slice(0, 100)} */}
                    <div dangerouslySetInnerHTML={{ __html: truncatedContent(content, 57) }} />
                </p>
                <Button className={styles.readMoreBtn} onClick={handleReadMore}>Read More</Button>
            </div>

            {/* Modal for full news/blog content */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                    <div className={styles.modalContent} onClick={handleContentClick}>
                        {/* Image at the top */}
                        <div className={styles.imageContainer}>
                            {!modalImageLoaded && (
                                <Blurhash
                                    hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" // Replace with actual Blurhash
                                    width="100%"
                                    height={180} // Adjust height as needed
                                    resolutionX={32}
                                    resolutionY={32}
                                    punch={1}
                                    className={styles.newsCardImage1}
                                />
                            )}
                            <img
                                src={image}
                                alt={title}
                                className={styles.newsCardImage1}
                                onLoad={() => setModalImageLoaded(true)}
                                style={{ display: modalImageLoaded ? "block" : "none" }} // Hide image until loaded
                            />
                        </div>

                        {/* School name watermark */}
                        <div className={styles.modalWatermark}>
                            <h4 className={styles.schoolNameModal}>School Name</h4>
                        </div>

                        {/* Title and content */}
                        <h3 style={{ textAlign: "center" , fontSize:"20px", fontWeight:"bold", margin:'1rem'}}>{title}</h3>
                        {/* <p>{content}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: content }} className={styles.HTML_content}/>

                        {/* Date at the bottom */}
                        <p className={styles.modalDate}>
                            {date} - {time}
                        </p>

                        <button className={styles.closeBtn} onClick={handleModalClose}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsCard;




// import React, { useEffect, useState } from 'react';
// import styles from './styles/readmore.module.scss';
// import Button from '../Core/Button';
// import { Blurhash } from "react-blurhash";

// const NewsCard = ({ image, title, date, time, content }) => {
//     const [showModal, setShowModal] = useState(false);
//     // useEffect(()=>{
//     //     console.log('date',date)
//     // },[])

//     // Toggle modal visibility
//     const handleReadMore = () => {
//         setShowModal(!showModal);
//     };

//     const stripHtml = (html) => {
//         const doc = new DOMParser().parseFromString(html, "text/html");
//         return doc.body.textContent || "";
//     };

//     const truncatedContent = (html, length) => {
//         const text = stripHtml(html);
//         return text.length > length ? text.slice(0, length) + "..." : text;
//     };

//     const [imageLoaded, setImageLoaded] = useState(false);

//     return (
//         <div className={styles.newsCard}>
//             <div className={styles.imageContainer}>
//                 {/* Show Blurhash until image is loaded */}
//                 {!imageLoaded && (
//                     <Blurhash
//                         hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" // Replace with actual Blurhash
//                         width="100%"
//                         height={180} // Adjust height as needed
//                         resolutionX={32}
//                         resolutionY={32}
//                         punch={1}
//                         className={styles.newsCardImage}
//                     />
//                 )}
//                 <img
//                     src={image}
//                     alt={title}
//                     className={styles.newsCardImage}
//                     onLoad={() => setImageLoaded(true)}
//                     style={{ display: imageLoaded ? "block" : "none" }} // Hide image until loaded
//                 />
//             </div>

//             <div className={styles.newsCardContent}>
//                 <h4 className={styles.schoolName}>National Institute of Technology, Durgapur</h4> {/* Constant school name */}
//                 <h3 className={styles.newsTitle}>{title}</h3>
//                 <p className={styles.newsDateTime}>
//                     {date} - {time}
//                 </p>
//                 <p className={styles.newsDescription}>
//                     <div dangerouslySetInnerHTML={{ __html: truncatedContent(content, 57) }} />
//                 </p>
//                 <Button className={styles.readMoreBtn} onClick={handleReadMore}>Read More</Button>
//             </div>

//             {/* Modal for full news/blog content */}
//             {showModal && (
//                 <div className={styles.modalOverlay} onClick={handleReadMore}>
//                     <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                         {/* Image at the top with Blurhash */}
//                         <div className={styles.imageContainer}>
//                             {!imageLoaded && (
//                                 <Blurhash
//                                     hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
//                                     width="100%"
//                                     height={250}
//                                     resolutionX={32}
//                                     resolutionY={32}
//                                     punch={1}
//                                     className={styles.modalImage}
//                                 />
//                             )}
//                             <img
//                                 src={image}
//                                 alt={title}
//                                 className={styles.modalImage}
//                                 onLoad={() => setImageLoaded(true)}
//                                 style={{ display: imageLoaded ? "block" : "none" }}
//                             />
//                         </div>

//                         {/* School name watermark */}
//                         <div className={styles.modalWatermark}>
//                             <h4 className={styles.schoolNameModal}>School Name</h4>
//                         </div>

//                         {/* Title and content */}
//                         <h3>{title}</h3>
//                         <div dangerouslySetInnerHTML={{ __html: content }} />

//                         {/* Date at the bottom */}
//                         <p className={styles.modalDate}>
//                             {date} - {time}
//                         </p>

//                         <button className={styles.closeBtn} onClick={handleReadMore}>X</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
// <GradientText text={"National Institute of Technology, Durgapur"} gradient={"linear-gradient(to right, #ffbe0b, #c55a44)"}/>
// export default NewsCard;