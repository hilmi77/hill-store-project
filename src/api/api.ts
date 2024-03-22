import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

interface FetchProductsParams {
  pageParam?: number;
  category?: string;
}

// Ürünleri sayfa ve kategoriye göre çeken fonksiyon
export const fetchProductsPage = async ({ pageParam = 1, category }:FetchProductsParams ) => {
  const perPage = 20;
  let url = `${API_BASE_URL}/products?limit=${perPage}&offset=${(pageParam - 1) * perPage}`;
  if (category && category !== "All") {
    url = `${API_BASE_URL}/products/category/${category}?limit=${perPage}&offset=${(pageParam - 1) * perPage}`;
  }
  const response = await axios.get(url);
  return { data: response.data, nextPage: pageParam + 1, totalPages: 100 }; // Toplam sayfa sayısını düzeltmek için API'den gelen toplam ürün sayısına göre bir hesaplama yapılabilir.
};

// Kategorileri çeken fonksiyon
export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/products/categories`);
  return response.data;
};

export const fetchProductDetails = async(id: number) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
}


