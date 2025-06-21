import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Blurhash } from "react-blurhash";
import styles from "./styles/Card.module.scss";
import { motion } from "framer-motion";


const TeamCard = ({ member,intern, customStyles = {} }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const extraData = member?.extra || {
        linkedin: "",
        github: "",
        designation: "",
    };

    const handleLink = (url) => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        } else {
            return "https://" + url;
        }
    };

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className={`${styles.teamMember} ${customStyles.teamMember || ""}`}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
            {/* <motion.div
                className={`${styles.teamMemberInner}`}
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 180 }}
                whileFocus={{rotateY:180}}
                transition={{ duration: 0.4 }}
            > */}
            <motion.div
                className={`${styles.teamMemberInner}`}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsFlipped((prev) => !prev)}
                onMouseEnter={() => {
                    if (window.innerWidth > 768) setIsFlipped(true);
                }}
                onMouseLeave={() => {
                    if (window.innerWidth > 768) setIsFlipped(false);
                }}
            >
                {/* Front Side */}
                <motion.div
                    className={`${styles.teamMemberFront} ${customStyles.teamMemberFront || ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.ImgDiv}>
                        {!imageLoaded && (
                            <Blurhash
                                hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                                width={260}
                                height={300}
                                resolutionX={32}
                                resolutionY={32}
                                punch={1}
                                className={styles.profilePic}
                            />
                        )}
                        <motion.img
                            src={member?.img}
                            alt={`Profile of ${member?.name}`}
                            className={styles.teamMemberImg}
                            onLoad={() => setImageLoaded(true)}
                            style={{ display: imageLoaded ? "block" : "none" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: imageLoaded ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className={`${styles.teamMemberInfo} ${customStyles.teamMemberInfo || ""}`}>
                        <h4 className={styles.memName} style={{ color: "#fff" }}>
                            {member?.name}
                        </h4>
                    </div>
                </motion.div>

                {/* Back Side */}
                <motion.div
                    className={`${styles.teamMemberBack} ${customStyles.teamMemberBack || ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {extraData.designation && (
                        <h5 className={`${styles.teamMemberBackh5} ${customStyles.teamMemberBackh5 || ""}`} style={{ color: "#fff" }}>
                            {extraData.designation}
                        </h5>
                    )}
                    <div className={`${styles.socialLinks} ${customStyles.socialLinks || ""}`}>
                        {extraData?.linkedin && (
                            <motion.a
                                href={extraData?.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.socialLinksa} ${customStyles.socialLinksa || ""}`}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaLinkedin />
                            </motion.a>
                        )}
                        {extraData?.github && (
                            <motion.a
                                href={extraData?.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.socialLinksa} ${customStyles.socialLinksa || ""}`}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaGithub />
                            </motion.a>
                        )}

                    </div>
                    {
                        member.branch && (
                            <motion.p
                                className={`${styles.branch} ${customStyles.branch || ""}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                                style={{ color: "#fff" }}
                            >
                                {member.branch}
                            </motion.p>
                        )
                    }
                    {
                        intern&&member.type && (
                            <motion.p
                                className={`${styles.type} ${customStyles.type || ""}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                                style={{ color: "#fff" }}
                                
                            >
                                {member.type}
                            </motion.p>
                        )
                    }
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TeamCard;
