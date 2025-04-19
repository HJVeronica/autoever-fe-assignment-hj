import styles from './FilterBtnList.module.scss';

export default function FilterBtnList({
  filterList,
}: {
  filterList: string[];
}) {
  return (
    <div className={styles.filterBtnList}>
      <div className={styles.filterBtn}>
        <input type="radio" name="filter" checked />
        <label>전체</label>
      </div>
      {filterList.map((filterTitle) => (
        <div className={styles.filterBtn} key={filterTitle}>
          <input type="radio" name="filter" />
          <label>{filterTitle}</label>
        </div>
      ))}
    </div>
  );
}
