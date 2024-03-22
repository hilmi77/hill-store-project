// hooks/useCategories.ts
import { useQuery } from 'react-query';
import { fetchCategories } from '../api/api';

export const useCategories = () => {
  return useQuery('categories', fetchCategories);
};
