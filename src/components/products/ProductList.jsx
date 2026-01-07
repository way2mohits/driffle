import { getTranslatedLanguage } from '../../utils/language';
import ProductCard from './ProductCard';
import style from './ProductList.module.css'

const ProductList = ({ products }) => {
  if (!products?.length) {
    return <p className="emptyState">{getTranslatedLanguage('No products found')}</p>;
  }

  return (
    <section className={style.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
