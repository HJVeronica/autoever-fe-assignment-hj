import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <form>
      <div className={styles.searchBar}>
        <div className={styles.wrapper}>
          <input type="text" placeholder="찾으시는 내용을 입력해 주세요" />
          <button type="reset" className={styles.reset}>
            초기화
          </button>
          <button type="submit" className={styles.submit}>
            검색
          </button>
        </div>
      </div>
    </form>
  );
}
