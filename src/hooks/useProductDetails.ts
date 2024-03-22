import { useQuery } from "react-query";
import { fetchProductDetails } from "../api/api";


export const useProductDetails = (id: number) => {
  return useQuery(["product", id], () => fetchProductDetails(id),{
    keepPreviousData: true // Geçişler sırasında önceki verinin korunmasını sağlar 
  });
}