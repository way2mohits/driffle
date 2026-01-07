import { useContext} from "react";
import style from './Header.module.css'
import { LanguageContext } from "../../Context/LanguageContext";
import SearchBar from "../searchbar/SearchBar";

const Header = () => {
  const {currentLanguage,changeLanguage} = useContext(LanguageContext)
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    changeLanguage(language);
  };

  return (
    <header className={style.header}>
  <div className={style.left}>
    <img src="https://play-lh.googleusercontent.com/RbBuGVXnKXbaKa_lcMuoVwVO2H_IJcrBhPhRCGTtEJoYZbMkhd6ZUGA5gQVzzW9Uubw=w480-h960-rw" alt="MyShop" className={style.logo} />
  </div>
  <SearchBar />
  <div className={style.right}>
    <select
      className={style.langSelect}
      value={currentLanguage}
      onChange={handleLanguageChange}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  </div>
</header>

  );
};

export default Header;
