import { getTranslatedLanguage } from "../../utils/language";
import style from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <article className={style.productCard}>
      <div className={style.imageWrapper}>
        <img
          src={product?.images?.length > 0 && product.images[0]}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className={style.cardContent}>
        <h3 className={style.title}>
          {getTranslatedLanguage(product.title ?? "")}
        </h3>
        <span className={style.price}>${product.price}</span>
      </div>
    </article>
  );
};

export default ProductCard;
