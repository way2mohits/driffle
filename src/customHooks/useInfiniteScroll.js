import { useEffect, useState, useCallback, useRef } from "react";

const LIMIT = 10;
const SCROLL_THRESHOLD = 20;

export const useInfiniteProducts = (searchQuery, fetchFn) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFetchingRef = useRef(false);

  const hasMore = total === null || skip < total;

  const loadProducts = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const result = await fetchFn({
        searchQuery,
        skip,
        limit: LIMIT,
      });

      setProducts((prev) => [...prev, ...result.products]);
      setTotal(result.total);
      setSkip((prev) => prev + LIMIT);
    } catch (e) {
      console.error(e);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [searchQuery, skip, hasMore, fetchFn]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setTotal(null);

    loadProducts();
    // eslint-disable-next-line
  }, [searchQuery]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollHeight - (scrollTop + clientHeight) < SCROLL_THRESHOLD) {
      loadProducts();
    }
  }, [loadProducts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    products,
    isLoading,
    hasMore,
  };
};
