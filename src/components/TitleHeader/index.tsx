import styles from './TitleHeader.module.scss';

interface TitleHeaderProps {
  title: string;
  description: string;
}

const TitleHeader = ({ title, description }: TitleHeaderProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h1 className={styles.description}>{description}</h1>
    </div>
  );
};

export default TitleHeader;
