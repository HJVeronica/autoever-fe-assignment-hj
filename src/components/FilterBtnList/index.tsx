import styles from './FilterBtnList.module.scss';

interface FilterBtnListProps {
  filterList: string[];
  onFilterSelect: (index: number) => void;
  selectedIndex: number;
}

export default function FilterBtnList({
  filterList,
  onFilterSelect,
  selectedIndex = -1,
}: FilterBtnListProps) {
  // 필터 선택 핸들러
  const handleFilterClick = (index: number) => {
    onFilterSelect(index);
  };

  return (
    <div className={styles.filterBtnList}>
      {/* 전체 버튼 */}
      <div
        className={styles.filterBtn}
        onClick={(e) => {
          e.stopPropagation();
          handleFilterClick(-1);
        }}
      >
        <input
          type="radio"
          name="filter"
          id="filter-all"
          checked={selectedIndex === -1}
          onChange={() => {}}
        />
        <label htmlFor="filter-all" onClick={(e) => e.stopPropagation()}>
          전체
        </label>
      </div>

      {/* 필터 버튼 목록 */}
      {filterList.map((filterTitle, index) => (
        <div
          className={styles.filterBtn}
          key={filterTitle}
          onClick={(e) => {
            e.stopPropagation();
            handleFilterClick(index);
          }}
        >
          <input
            type="radio"
            name="filter"
            id={`filter-${index}`}
            checked={index === selectedIndex}
            onChange={() => {}}
          />
          <label
            htmlFor={`filter-${index}`}
            onClick={(e) => e.stopPropagation()}
          >
            {filterTitle}
          </label>
        </div>
      ))}
    </div>
  );
}
