import styles from './Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerInfo}>
          <div className={styles.footerTerms}>
            <a href="https://privacy.kia.com/overview/full-policy">
              개인정보 처리방침
            </a>
            <a href="#terms">이용약관</a>
          </div>

          <div className={styles.footerInfoText}>
            <p>
              서울특별시 서초구 헌릉로 12 <span>기아 (주)</span>
            </p>
            <p>대표: 송호성, 최준영</p>
            <p>사업자등록번호: 119-81-02316</p>
            <p>통신판매번호: 2006-07935</p>
            <p>고객센터: 1833-4964</p>
            <p>
              제휴문의: <a href="mailto:kiabiz@kia.com">kiabiz@kia.com</a>
            </p>
          </div>
        </div>
        <div className={styles.footerLogo}>
          &copy; {year} KIA CORP. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
