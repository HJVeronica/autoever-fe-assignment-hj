import { useState } from 'react';
import styles from './CollapseList.module.scss';
import { FaqItem } from '@/hooks/useFaq';

interface CollapseListProps {
  list: FaqItem[];
  subCategoryOn?: boolean; // USAGE 카테고리인지 여부
}

const CollapseList = ({ list, subCategoryOn = false }: CollapseListProps) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  if (list.length === 0) {
    return <div>표시할 FAQ 항목이 없습니다.</div>;
  }

  return (
    <ul className={styles.collapseList}>
      {list.map((item) => (
        <li key={item.id} className={styles.collapseItem}>
          <div
            className={`${styles.collapseItemHeader} ${openItemId === item.id ? styles.active : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            {subCategoryOn && (
              <h4 className={styles.collapseItemCategory}>
                {item.categoryName}
              </h4>
            )}
            <h4 className={styles.collapseItemCategory}>
              {item.subCategoryName}
            </h4>
            <h4 className={styles.collapseItemTitle}>{item.question}</h4>
          </div>

          {openItemId === item.id && (
            <div className={styles.collapseItemContent}>
              <p
                className={styles.collapseItemContentText}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CollapseList;
