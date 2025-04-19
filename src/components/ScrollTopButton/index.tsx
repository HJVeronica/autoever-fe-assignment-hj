import { useState, useEffect } from 'react';
import styles from './ScrollTopButton.module.scss';

// 수정된 아이콘 경로
import topIcon from '@icons/ic_top.svg';

const ScrollTopButton = () => {
  // 버튼 표시 여부를 결정하는 상태
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 감지하여 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 300px 이상이면 버튼 표시
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 초기 스크롤 상태 확인
    handleScroll();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 클릭 시 페이지 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 버튼이 보이지 않을 때는 null 반환
  if (!isVisible) return null;

  return (
    <button
      className={styles.scrollTopButton}
      onClick={scrollToTop}
      aria-label="페이지 상단으로 이동"
    >
      <img src={topIcon} alt="위로 이동" />
    </button>
  );
};

export default ScrollTopButton;
