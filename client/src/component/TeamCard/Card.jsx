import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Blurhash } from "react-blurhash";
import styles from "./styles/Card.module.scss";

const TeamCard = ({ member, customStyles = {} }) => {
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

  return (
    <div className={`${styles.teamMember} ${customStyles.teamMember || ""}`}>
      <div className={`${styles.teamMemberInner}`}>
        <div className={`${styles.teamMemberFront} ${customStyles.teamMemberFront || ""}`}>
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
            <img
              src={member?.img}
              alt={`Profile of ${member?.name}`}
              className={styles.teamMemberImg}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }} // Hide image until loaded
            />
          </div>
          <div className={`${styles.teamMemberInfo} ${customStyles.teamMemberInfo || ""}`}>
            <h4 className={styles.memName} style={{ color: "#fff" }}>
              {member?.name}
            </h4>
          </div>
        </div>
        <div className={`${styles.teamMemberBack} ${customStyles.teamMemberBack || ""}`}>
          {extraData.designation && (
            <h5 className={`${styles.teamMemberBackh5} ${customStyles.teamMemberBackh5 || ""}`} style={{ color: "#fff" }}>
              {extraData.designation}
            </h5>
          )}
          <div className={`${styles.socialLinks} ${customStyles.socialLinks || ""}`}>
            {extraData?.linkedin && (
              <a
                href={handleLink(extraData?.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLinksa} ${customStyles.socialLinksa || ""}`}
              >
                <FaLinkedin />
              </a>
            )}
            {extraData?.github && (
              <a
                href={handleLink(extraData?.github)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLinksa} ${customStyles.socialLinksa || ""}`}
              >
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
