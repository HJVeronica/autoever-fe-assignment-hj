import styles from './ServiceInquiry.module.scss';
import icDownload from '@/assets/images/icons/ic_download.svg';
import icWrite from '@/assets/images/icons/ic_write.svg';
import icTalk from '@/assets/images/icons/ic_talk.svg';

export default function ServiceInquiry() {
  const INQUIRY_LIST = [
    {
      href: '',
      icon: 'ic_download',
      title: '서비스 제안서 다운로드',
    },
    {
      href: 'https://wiblebiz.kia.com/Counsel',
      icon: 'ic_write',
      title: '상담문의 등록하기',
    },
    {
      href: 'https://pf.kakao.com/_xfLxjdb',
      icon: 'ic_talk',
      title: '카톡으로 문의하기',
      subtitle: 'ID : 기아 비즈',
    },
  ];

  return (
    <div className={styles.serviceInquiry}>
      <h2 className="sectionTitle">서비스 문의</h2>

      <div className={styles.serviceInquiryContent}>
        {INQUIRY_LIST.map((item) => (
          <a
            href={item.href}
            key={item.href}
            className={styles.serviceInquiryItem}
          >
            <img
              src={
                item.icon === 'ic_download'
                  ? icDownload
                  : item.icon === 'ic_write'
                    ? icWrite
                    : icTalk
              }
              alt={item.title}
            />
            <span>
              {item.title}
              {item.subtitle && (
                <span className={styles.serviceInquiryItemSubtitle}>
                  {item.subtitle}
                </span>
              )}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
