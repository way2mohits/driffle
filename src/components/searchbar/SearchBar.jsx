import { useContext } from "react";
import style from "./SearchBar.module.css";
import { SearchContext } from "../../Context/SearchContext";
import { getTranslatedLanguage } from "../../utils/language";
const SearchBar = () => {
  const handleSearch = useContext(SearchContext);
  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder={getTranslatedLanguage("Search products")}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
