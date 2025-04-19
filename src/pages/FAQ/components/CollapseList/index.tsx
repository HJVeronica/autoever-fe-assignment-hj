import styles from './CollapseList.module.scss';

export default function CollapseList({
  list,
}: {
  list: {
    id: number;
    categoryName: string;
    subCategoryName: string;
    question: string;
    answer: string;
  }[];
}) {
  return (
    <ul className={styles.collapseList}>
      {list.map((item) => (
        <li key={item.id} className={styles.collapseItem}>
          <div className={styles.collapseItemHeader}>
            <h4 className={styles.collapseItemCategory}>
              {item.subCategoryName}
            </h4>
            <h4 className={styles.collapseItemTitle}>{item.question}</h4>
          </div>

          <div className={styles.collapseItemContent}>
            <p
              className={styles.collapseItemContentText}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
            <p className={styles.emptyPharagraph} />
          </div>
        </li>
      ))}
    </ul>
  );
}
