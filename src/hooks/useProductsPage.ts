import { useInfiniteQuery } from "react-query";
import { fetchProductsPage } from "../api/api";



export const useProductsPage = () => {
  return useInfiniteQuery("products", fetchProductsPage, {
    getNextPageParam: (lastPage, pages)=> {
      if(pages.length < lastPage.totalPages) {
        return pages.length + 1
      }
    }
  })
}