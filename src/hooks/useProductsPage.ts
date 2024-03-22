// hooks/useProductsPage.ts

import { useInfiniteQuery } from 'react-query';
import { fetchProductsPage } from '../api/api';

export const useProductsPage = (category: string) => {
  return useInfiniteQuery(['products', category], ({ pageParam = 1 }) => fetchProductsPage({ pageParam, category }), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalPages) {
        return lastPage.nextPage;
      } else {
        return undefined;
      }
    },
  });
};
