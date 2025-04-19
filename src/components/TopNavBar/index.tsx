import { useState, useEffect } from 'react';
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
  // 스크롤 위치 상태 추가
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 10px 이상이면 스크롤된 것으로 간주
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 페이지 로드 시 초기 스크롤 상태 확인
    handleScroll();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
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
