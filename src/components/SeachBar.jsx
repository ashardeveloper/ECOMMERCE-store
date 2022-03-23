import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import ModalSearch from "../UI/ModalSearch";

function SearchBar(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = props.data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input
          type="text"
          placeholder={props.placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className={styles.searchIcon}>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon className={styles.clearBtn} onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <ModalSearch onClose={props.onClose}>
          {/* <div className={styles.dataResult}> */}
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link className={styles.dataItem} to={`/products/${value.id}`}>
                <p>{value.title} </p>
              </Link>
            );
          })}
        </ModalSearch>
      )}
    </div>
  );
}

export default SearchBar;
