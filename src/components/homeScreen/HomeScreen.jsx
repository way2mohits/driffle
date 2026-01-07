import { useCallback, useState } from "react";
import Header from "../header/Header";
import ProductList from "../products/ProductList";
import { getProductList } from "../../api/getProductList";
import { SearchContext } from "../../Context/SearchContext";
import { debounce } from "../../utils/debounceUtils";
import { getTranslatedLanguage } from "../../utils/language";
import Footer from "../footer/Footer";
import style from "./HomeScreen.module.css";
import { useInfiniteProducts } from "../../customHooks/useInfiniteScroll";
export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 1000);

  const fetchProducts = useCallback(
    ({ searchQuery, skip, limit }) => getProductList(searchQuery, skip, limit),
    []
  );

  const { products, isLoading } = useInfiniteProducts(
    searchQuery,
    fetchProducts
  );
  return (
    <>
      <SearchContext.Provider value={handleSearch}>
        <Header />
      </SearchContext.Provider>
      <div className={style.contentSection}>
        {!isLoading && searchQuery.length > 0 && products.length !== 0 && (
          <h3>
            {getTranslatedLanguage("Search results for")} "{searchQuery}"
          </h3>
        )}
        {!isLoading && searchQuery.length === 0 && (
          <h3>{getTranslatedLanguage("All products list")}</h3>
        )}
        {products && <ProductList products={products} isLoading={isLoading} />}
        {isLoading && <h3>{getTranslatedLanguage("Loading")}...</h3>}
      </div>
      <Footer />
    </>
  );
};
