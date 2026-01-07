import { useEffect, useState, useCallback} from "react";

const LIMIT = 10;
const SCROLL_THRESHOLD = 20;

export const useInfiniteProducts = (searchQuery, fetchFn) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const hasMore = total === null || skip < total;

  const fetchPage = useCallback(
    async (pageSkip) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        const result = await fetchFn({
          searchQuery,
          skip: pageSkip,
          limit: LIMIT,
        });

        setProducts((prev) =>
          pageSkip === 0
            ? result.products
            : [...prev, ...result.products]
        );

        setTotal(result.total);
        setSkip(pageSkip + LIMIT);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line
    [fetchFn, searchQuery]
  );


  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setTotal(null);

    fetchPage(0);
  }, [searchQuery, fetchPage]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;

    if (
      scrollHeight - (scrollTop + clientHeight) < SCROLL_THRESHOLD &&
      hasMore &&
      !isLoading
    ) {
      fetchPage(skip);
    }
    // eslint-disable-next-line
  }, [skip, hasMore, fetchPage]);

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
