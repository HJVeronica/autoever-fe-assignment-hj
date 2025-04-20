import { useState, useEffect } from 'react';
import styles from './FAQ.module.scss';

import TitleHeader from '@/components/TitleHeader';
import TabSwitcher from '@/components/TabSwitcher';
import SearchBar from '@/components/SearchBar';
import FilterBtnList from '@/components/FilterBtnList';
import CollapseList from '@/pages/FAQ/components/CollapseList';
import ServiceInquiry from '@/components/ServiceInquiry';
import Process from '@/components/Process';
import AppInfo from '@/components/AppInfo';
import ScrollTopButton from '@/components/ScrollTopButton';

// React Query hooks
import { useCategory, CategoryItem } from '@/hooks/useCategory';
import { useFaq, FaqItem } from '@/hooks/useFaq';

interface FaqConstants {
  title: string;
  description: string;
}

const FAQ_CONSTANTS: FaqConstants = {
  title: '자주 묻는 질문',
  description: '궁금하신 내용을 빠르게 찾아보세요.',
};

const FAQPage = () => {
  // 상태 관리
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [filterList, setFilterList] = useState<CategoryItem[]>([]);

  // 카테고리 데이터 가져오기
  const { data: categoryData, isLoading: isCategoryLoading } = useCategory();

  // 선택된 탭/필터/검색어에 따라 FAQ 데이터 가져오기
  // React Query가 queryKey 변경을 감지하여 자동으로 새 데이터를 가져옴
  const {
    data: faqData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFaqLoading,
  } = useFaq({
    category: selectedFilter || selectedTab,
    query: searchQuery,
  });

  // 카테고리 데이터 로드 후 초기 탭 선택
  useEffect(() => {
    if (categoryData && !selectedTab) {
      // 초기 탭 설정 (CONSULT)
      const firstCategoryType = Object.keys(categoryData)[0];
      if (firstCategoryType && categoryData[firstCategoryType].length > 0) {
        setSelectedTab(firstCategoryType);
      }
    }
  }, [categoryData, selectedTab]);

  // 탭 변경 시 필터 목록 업데이트
  useEffect(() => {
    if (categoryData && selectedTab) {
      // 선택된 탭에 맞는 필터 목록 설정
      setFilterList(categoryData[selectedTab] || []);
      // 탭이 변경되면 필터 초기화
      setSelectedFilter('');
    }
  }, [categoryData, selectedTab]);

  // 탭 전환 핸들러
  const handleTabChange = (categoryType: string) => {
    setSelectedTab(categoryType);
    // 탭 변경 시 검색어 초기화
    setSearchQuery('');
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 검색 시 필터 초기화
    setSelectedFilter('');
  };

  // 필터 선택 핸들러
  const handleFilterSelect = (categoryID: string) => {
    // categoryID가 빈 문자열이거나 현재 선택된 필터와 같으면 필터를 해제
    if (categoryID === selectedFilter) {
      setSelectedFilter('');
    } else {
      setSelectedFilter(categoryID);
    }
  };

  // 더보기 버튼 핸들러
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 데이터에서 FAQ 항목 추출
  const faqItems: FaqItem[] = faqData?.pages.flatMap((page) => page.data) || [];

  // 로딩 상태 표시
  if (isCategoryLoading) {
    return <div>카테고리를 불러오는 중...</div>;
  }

  // 탭 목록 추출
  const tabs: CategoryItem[] = Object.keys(categoryData || {}).map((key) => {
    return {
      categoryID: key,
      name: key === 'CONSULT' ? '서비스 도입' : '서비스 이용',
    };
  });

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <TitleHeader
          title={FAQ_CONSTANTS.title}
          description={FAQ_CONSTANTS.description}
        />

        <TabSwitcher tabs={tabs} onTabChange={handleTabChange} />

        <SearchBar onSearch={handleSearch} />

        <FilterBtnList
          filterList={filterList.map((item) => item.name)}
          onFilterSelect={(index) => {
            // 전체 버튼인 경우 빈 문자열 전달
            if (index === -1) {
              handleFilterSelect('');
            } else {
              // 해당 인덱스의 카테고리 ID 전달
              const selectedCategoryID = filterList[index]?.categoryID || '';
              handleFilterSelect(selectedCategoryID);
            }
          }}
          selectedIndex={
            selectedFilter === ''
              ? -1
              : filterList.findIndex(
                  (item) => item.categoryID === selectedFilter,
                )
          }
        />

        {isFaqLoading ? (
          <div>FAQ를 불러오는 중...</div>
        ) : faqItems.length > 0 ? (
          <>
            <CollapseList
              list={faqItems}
              subCategoryOn={selectedTab === 'USAGE'}
            />

            {hasNextPage && (
              <button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className={styles.loadMoreBtn}
              >
                {isFetchingNextPage ? '로딩 중...' : '더보기'}
              </button>
            )}
          </>
        ) : (
          <div>표시할 FAQ 항목이 없습니다.</div>
        )}

        <ServiceInquiry />
        <Process />
        <AppInfo />
      </div>

      {/* 스크롤 상단으로 이동하는 버튼 */}
      <ScrollTopButton />
    </main>
  );
};

export default FAQPage;
