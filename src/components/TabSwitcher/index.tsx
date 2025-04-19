import { useState } from 'react';
import styles from './TabSwitcher.module.scss';
import { CategoryItem } from '../../hooks/useCategory';

interface TabSwitcherProps {
  tabs: CategoryItem[];
  onTabChange: (categoryID: string) => void;
}

export default function TabSwitcher({ tabs, onTabChange }: TabSwitcherProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number, categoryID: string) => {
    setActiveTabIndex(index);
    onTabChange(categoryID);
  };

  return (
    <ul className={styles.tabs}>
      {tabs.map((tab, index) => (
        <li
          key={tab.categoryID}
          className={index === activeTabIndex ? styles.active : ''}
          onClick={() => handleTabClick(index, tab.categoryID)}
        >
          {tab.name}
        </li>
      ))}
    </ul>
  );
}
