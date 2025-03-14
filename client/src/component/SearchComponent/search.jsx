import React, { useState, useEffect } from "react";
import styles from "./styles/search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import searchData from "./../../../public/data/searchItem.json";
import { Link } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState(searchData);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredResults(searchData);
        } else {
            const filtered = searchData.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(filtered.length > 0 ? filtered : []);
        }
        console.log(filteredResults);
    }, [query]);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <SearchIcon className={styles.searchIcon} onClick={() => setIsShow(true)}
                    />
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onClick={() => setIsShow(true)}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {isShow && <div className={styles.searchResults} onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
                {filteredResults.length > 0 ? (
                    filteredResults.map((item, index) => (
                        <div>
                            <Link to={item.link} className={styles.searchItem}>
                                {item.name}
                            </Link>
                        </div>

                    ))
                ) : (
                    <p className={styles.noResults}>No results found</p>
                )}
            </div>}
        </div>
    );
};

export default Search;
