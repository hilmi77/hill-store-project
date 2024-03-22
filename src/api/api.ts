import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export const fetchProductsPage = async ({pageParam = 1}) => {
  const perPage=20;
  const response= await axios.get(`${API_BASE_URL}/products?limit=${perPage}&offset=${(pageParam-1)*perPage}`);
  return {data: response.data, nextPage: pageParam+1, totalPages:100};
}

export const fetchProductDetails = async(id: number) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
}