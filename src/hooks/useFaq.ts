import { useInfiniteQuery } from '@tanstack/react-query';

export interface FaqItem {
  id: number;
  categoryName: string;
  subCategoryName: string;
  question: string;
  answer: string;
}

export interface FaqResponse {
  data: FaqItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// InfiniteData 인터페이스 추가
export interface InfiniteFaqResponse {
  pages: FaqResponse[];
  pageParams: number[];
}

export interface FaqParams {
  limit?: number;
  category?: string;
  query?: string;
}

interface FetchFaqsParams extends FaqParams {
  pageParam?: number;
}

const fetchFaqs = async ({
  pageParam = 1,
  limit = 10,
  category,
  query,
}: FetchFaqsParams): Promise<FaqResponse> => {
  const params = new URLSearchParams();
  params.append('page', pageParam.toString());
  params.append('limit', limit.toString());

  if (category) {
    params.append('category', category);
  }

  if (query) {
    params.append('query', query);
  }

  const response = await fetch(`/api/faq?${params.toString()}`);
  if (!response.ok) {
    throw new Error('FAQ 데이터를 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  return data;
};

export const useFaq = ({ limit = 10, category, query }: FaqParams = {}) => {
  // 필터링 조건마다 고유한 queryKey 사용 - 캐싱 최적화
  const queryKey = [
    'faqs',
    {
      limit,
      category: category || 'all',
      query: query || '',
    },
  ] as const;

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchFaqs({ pageParam, limit, category, query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분 (이전의 cacheTime)
  });
};
