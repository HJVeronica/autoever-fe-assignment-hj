import styles from './TabSwitcher.module.scss';

export default function TabSwitcher({ tabs }: { tabs: string[] }) {
  return (
    <ul className={styles.tabs}>
      {tabs.map((tab, index) => (
        <li key={tab} className={index === 0 ? styles.active : ''}>
          {tab}
        </li>
      ))}
    </ul>
  );
}
