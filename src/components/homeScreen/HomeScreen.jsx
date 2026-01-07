import { useEffect, useState } from "react";
import Header from "../header/Header";
import ProductList from "../products/ProductList";
import { getProductList } from "../../api/getProductList";
import { SearchContext } from "../../Context/SearchContext";
import { debounce } from "../../utils/debounceUtils";
import { getTranslatedLanguage } from "../../utils/language";
import Footer from "../footer/Footer";
import style from './HomeScreen.module.css'
export const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 1000);
  const fetchProducts = async (searchQuery) => {
    setIsLoading(true);
    try {
      const result = await getProductList(searchQuery);
      setProducts(result.products);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);
  return (
    <>
      <SearchContext.Provider value={handleSearch}>
        <Header />
      </SearchContext.Provider>
      <section className={style.contentSection}>
      {isLoading && <h3>{getTranslatedLanguage('Loading')}...</h3>}
      {!isLoading && searchQuery.length > 0 && products.length !== 0 && (
        <h3>
          {getTranslatedLanguage("Search results for")} "{searchQuery}"
        </h3>
      )}
      {!isLoading && searchQuery.length === 0 && (
        <h3>{getTranslatedLanguage("All products list")}</h3>
      )}
      {!isLoading && <ProductList products={products} />}
      </section>
      <Footer />
    </>
  );
};
