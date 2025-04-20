import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import styles from './TopNavBar.module.scss';

import logo from '@logos/logo_kia-biz.svg';

interface MenuItem {
  title: string;
  href: string;
}

const MENU_TITLE: MenuItem[] = [
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // 메뉴 열림 상태 추가
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  // 햄버거 메뉴 클릭 이벤트 핸들러
  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);

    // body 태그에 'menu-opened' 클래스 토글
    if (newMenuState) {
      document.body.classList.add('menu-opened');
    } else {
      document.body.classList.remove('menu-opened');
    }
  };

  return (
    <div className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" style={{ height: '100%' }}>
          <img className={styles.logo} src={logo} alt="KIA BIZ" />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.opened : ''}`}>
          <ul>
            {MENU_TITLE.map((menu) => (
              <a href={menu.href} key={menu.title} target={'_self'}>
                <li>{menu.title}</li>
              </a>
            ))}
          </ul>
        </nav>

        {/* 모바일 햄버거 메뉴 */}
        <span className={styles.hamburgerMenu}>
          <button
            type="button"
            onClick={toggleMenu}
            className={isMenuOpen ? styles.opened : ''}
            aria-label="메뉴 열기/닫기"
          >
            메뉴 열기/닫기
          </button>
        </span>
      </div>
    </div>
  );
};

export default TopNavBar;
