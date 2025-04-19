import styles from './AppInfo.module.scss';

export default function AppInfo() {
  return (
    <div className={styles.appInfo}>
      <h2>기아 비즈 App 지금 만나보세요!</h2>
      <div className={styles.appInfoBtnContainer}>
        <a
          href="https://play.google.com/store/apps/details?id=kor.mop.user.app"
          target="_blank"
          rel="noreferrer"
          className={`${styles.linkButton} ${styles.playstore}`}
        >
          Google Play
        </a>
        <a
          href="https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794"
          target="_blank"
          rel="noreferrer"
          className={`${styles.linkButton} ${styles.appstore}`}
        >
          App Store
        </a>
      </div>
    </div>
  );
}
