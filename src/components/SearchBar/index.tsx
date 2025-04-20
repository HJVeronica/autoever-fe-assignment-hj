import { useState, FormEvent } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleReset = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <div className={styles.wrapper}>
          <input
            type="text"
            placeholder="찾으시는 내용을 입력해 주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className={styles.reset}
              onClick={handleReset}
            >
              초기화
            </button>
          )}
          <button type="submit" className={styles.submit}>
            검색
          </button>
        </div>
      </div>
    </form>
  );
}
