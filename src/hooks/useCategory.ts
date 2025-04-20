import { useQuery } from '@tanstack/react-query';

export interface CategoryItem {
  categoryID: string;
  name: string;
}

export interface CategoryData {
  CONSULT: CategoryItem[];
  USAGE: CategoryItem[];
  [key: string]: CategoryItem[];
}

const fetchCategories = async (): Promise<CategoryData> => {
  const response = await fetch('/api/category');
  if (!response.ok) {
    throw new Error('카테고리 데이터를 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const useCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐싱
  });
};
