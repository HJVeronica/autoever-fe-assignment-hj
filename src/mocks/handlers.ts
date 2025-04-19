import { http, HttpResponse } from 'msw';
import faqData from './data/faq.json';
import categoryData from './data/category.json';

export const handlers = [
  // 카테고리 데이터를 가져오는 핸들러
  http.get('/api/category', () => {
    return HttpResponse.json(categoryData);
  }),

  // FAQ 데이터를 페이지네이션으로 가져오는 핸들러
  http.get('/api/faq', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    const category = url.searchParams.get('category');
    const query = url.searchParams.get('query');

    let filteredData = [...faqData];

    // 카테고리 필터링
    if (category) {
      // CONSULT나 USAGE와 같은 상위 카테고리인 경우
      if (category === 'CONSULT') {
        filteredData = filteredData.filter(
          (item) => item.categoryName === '도입문의',
        );
      } else if (category === 'USAGE') {
        filteredData = filteredData.filter(
          (item) =>
            item.categoryName === '가입문의' ||
            item.categoryName === '예약/결제' ||
            item.categoryName === '비즈니스(업무용)' ||
            item.categoryName === '사고/보험' ||
            item.categoryName === '차량문의' ||
            item.categoryName === '충전' ||
            item.categoryName === '쿠폰/기타',
        );
      }
      // 카테고리 ID로 필터링 (PRODUCT, COUNSELING, CONTRACT 등)
      else if (
        [
          'PRODUCT',
          'COUNSELING',
          'CONTRACT',
          'SIGN_UP',
          'BUSINESS',
          'ACCIDENT',
          'RESERVATION',
          'VEHICLE',
          'REFUEL',
          'COUPON',
        ].includes(category)
      ) {
        // 각 카테고리 ID에 해당하는 카테고리명 매핑
        const categoryMap: Record<string, string> = {
          PRODUCT: '서비스 상품',
          COUNSELING: '도입 상담',
          CONTRACT: '계약',
          SIGN_UP: '가입문의',
          BUSINESS: '비즈니스(업무용)',
          ACCIDENT: '사고/보험',
          RESERVATION: '예약/결제',
          VEHICLE: '차량문의',
          REFUEL: '충전',
          COUPON: '쿠폰/기타',
        };

        if (categoryMap[category]) {
          filteredData = filteredData.filter(
            (item) =>
              item.categoryName === categoryMap[category] ||
              item.subCategoryName === categoryMap[category],
          );
        }
      }
      // 특정 카테고리명으로 필터링 (도입문의, 가입문의 등)
      else {
        filteredData = filteredData.filter(
          (item) =>
            item.categoryName === category || item.subCategoryName === category,
        );
      }
    }

    // 검색어 필터링
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredData = filteredData.filter((item) => {
        return (
          item.question.toLowerCase().includes(searchQuery) ||
          item.answer.toLowerCase().includes(searchQuery) ||
          item.categoryName.toLowerCase().includes(searchQuery) ||
          item.subCategoryName.toLowerCase().includes(searchQuery)
        );
      });
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    });
  }),
];
