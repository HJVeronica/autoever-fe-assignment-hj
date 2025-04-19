import { useState } from 'react';
import styles from './CollapseList.module.scss';

interface CollapseItem {
  id: number;
  categoryName: string;
  subCategoryName: string;
  question: string;
  answer: string;
}

interface CollapseListProps {
  list: CollapseItem[];
  subCategoryOn?: boolean; // USAGE 카테고리인지 여부
}

export default function CollapseList({
  list,
  subCategoryOn = false,
}: CollapseListProps) {
  // 각 항목의 collapse 상태를 관리하는 상태
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  // collapse 토글 핸들러
  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (list.length === 0) {
    return <div>표시할 FAQ 항목이 없습니다.</div>;
  }

  return (
    <ul className={styles.collapseList}>
      {list.map((item) => (
        <li key={item.id} className={styles.collapseItem}>
          <div
            className={`${styles.collapseItemHeader} ${openItems[item.id] ? styles.active : ''}`}
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

          {openItems[item.id] && (
            <div className={styles.collapseItemContent}>
              <p
                className={styles.collapseItemContentText}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
              <p className={styles.emptyPharagraph} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
