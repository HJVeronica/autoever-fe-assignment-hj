import { useQuery } from '@tanstack/react-query';

interface CategoryItem {
  categoryID: string;
  name: string;
}

interface CategoryData {
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
  });
};

export type { CategoryData, CategoryItem };
