import style from "./Footer.module.css";
import { getTranslatedLanguage } from "../../utils/language";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <nav>
        <ul className={style.footerList}>
          <li>{getTranslatedLanguage("About")}</li>
          <li className="separator">|</li>
          <li>{getTranslatedLanguage("Contact")}</li>
          <li className="separator">|</li>
          <li>{getTranslatedLanguage("Privacy policy")}</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
