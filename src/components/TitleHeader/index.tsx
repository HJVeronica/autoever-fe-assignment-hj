import styles from './TitleHeader.module.scss';

export default function TitleHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h1 className={styles.description}>{description}</h1>
    </div>
  );
}
