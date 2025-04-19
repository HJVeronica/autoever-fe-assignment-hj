import { Link } from 'react-router';

import styles from './TopNavBar.module.scss';

import logo from '@logos/logo_kia-biz.svg';

const MENU_TITLE = [
  {
    title: '서비스 소개',
    href: 'https://wiblebiz.kia.com/Guide',
  },
  {
    title: '자주 묻는 질문',
    href: '/',
  },
  {
    title: '새소식',
    href: 'https://wiblebiz.kia.com/News',
  },
  {
    title: '상담문의',
    href: 'https://wiblebiz.kia.com/Counsel',
  },
];

const TopNavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link to="/" style={{ height: '100%' }}>
          <img className={styles.logo} src={logo} alt="KIA BIZ" />
        </Link>

        <nav className={styles.nav}>
          <ul>
            {MENU_TITLE.map((menu) => (
              <a href={menu.href} key={menu.title} target={'_self'}>
                <li>{menu.title}</li>
              </a>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopNavBar;
