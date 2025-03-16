// import React, { useState } from "react";
// import TeamCard from "./../../component/TeamCard/Card";
// import styles from "./styles/team.module.scss";
// import teamData from "../../../public/data/member.json";
// import GradientText from "../../component/Core/TextStyle";

// const Team = () => {
//     const [selectedType, setSelectedType] = useState("All"); 

//     // Group members by type
//     const groupedMembers = teamData.reduce((acc, member) => {
//         const { type } = member;
//         if (!acc[type]) acc[type] = [];
//         acc[type].push(member);
//         return acc;
//     }, {});

//     // Handler for filter buttons
//     const handleFilterClick = (type) => {
//         setSelectedType(type);
//     };

//     return (
//         <div className={styles.teamPage}>
//             <h2 className={styles.teamTitle}>
//                 Meet Our <GradientText text="Team" gradient="linear-gradient(to right, #4facfe,rgb(81,99,150))" />
//             </h2>


//             {/* Filter buttons */}
//             <div className={styles.filterButtons}>
//                 {["All", ...Object.keys(groupedMembers)].map((type) => (
//                     <button
//                         key={type}
//                         onClick={() => handleFilterClick(type)}
//                         className={`${styles.filterButton} ${selectedType === type ? styles.active : ""}`}
//                     >
//                         {type}
//                     </button>
//                 ))}
//             </div>

//             {/* Display team members based on selected type */}
//             {Object.keys(groupedMembers).map((type) => (
//                 (selectedType === "All" || selectedType === type) && (
//                     <div key={type} className={styles.teamSection}>
//                         <h3 className={styles.teamSectionTitle}><GradientText text={type} gradient={"linear-gradient(to right,rgb(26, 69, 106),rgb(77, 123, 249))"}></GradientText></h3>
//                         <div className={styles.teamGrid}>
//                             {groupedMembers[type].map((member) => (
//                                 <TeamCard key={member.id} member={member} />
//                             ))}
//                         </div>
//                     </div>
//                 )
//             ))}
//         </div>
//     );
// };

// export default Team;



import React, { useState } from "react";
import TeamCard from "../../component/TeamCard/Card";
import styles from "./styles/team.module.scss";
import teamData from "../../../public/data/member.json";
import GradientText from "../../component/Core/TextStyle";

const Team = () => {
    const [selectedType, setSelectedType] = useState("All");
    const [showFilters, setShowFilters] = useState(false); // State for showing filters

    // Group members by type
    const groupedMembers = teamData.reduce((acc, member) => {
        const { type } = member;
        if (!acc[type]) acc[type] = [];
        acc[type].push(member);
        return acc;
    }, {});

    // Handler for filter buttons
    const handleFilterClick = (type) => {
        setSelectedType(type);
    };

    return (
        <div className={styles.teamPage}>
            <h2 className={styles.teamTitle}>
                Meet Our <GradientText text="Team" gradient="linear-gradient(to right, #4facfe, rgb(81,99,150))" />
            </h2>

            {/* Show Filters Button */}
            {!showFilters && (
                <button className={styles.showAllButton} onClick={() => setShowFilters(true)}>
                    Show All Filters
                </button>
            )}

            {showFilters && (
                <button className={styles.showAllButton} onClick={() => setShowFilters(false)}>
                    Hide Filters
                </button>
            )}

            {/* Filter buttons */}
            {showFilters && (
                <div className={styles.filterButtons}>
                    {["All", ...Object.keys(groupedMembers)].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleFilterClick(type)}
                            className={`${styles.filterButton} ${selectedType === type ? styles.active : ""}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}

            {/* Display team members based on selected type */}
            {Object.keys(groupedMembers).map((type) => (
                (selectedType === "All" || selectedType === type) && (
                    <div key={type} className={styles.teamSection}>
                        <h3 className={styles.teamSectionTitle}>
                            <GradientText text={type} gradient="linear-gradient(to right, rgb(26, 69, 106), rgb(77, 123, 249))" />
                        </h3>
                        <div className={styles.teamGrid}>
                            {groupedMembers[type].map((member) => (
                                <TeamCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default Team;
