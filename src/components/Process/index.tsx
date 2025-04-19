import styles from './Process.module.scss';
import icProcess01 from '@/assets/images/icons/ic_process01.svg';
import icProcess02 from '@/assets/images/icons/ic_process02.svg';
import icProcess03 from '@/assets/images/icons/ic_process03.svg';
import icProcess04 from '@/assets/images/icons/ic_process04.svg';

export default function Process() {
  const PROCESS_LIST = [
    {
      icon: 'ic_process01',
      title: '문의 등록',
      description:
        '상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.',
    },
    {
      icon: 'ic_process02',
      title: '관리자 설정',
      description: '관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.',
    },
    {
      icon: 'ic_process03',
      title: '임직원 가입',
      description: '이용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.',
    },
    {
      icon: 'ic_process04',
      title: '서비스 이용',
      description: '이용자 App에서 차량 예약을 하고 K존에서 바로 이용하세요!',
    },
  ];

  return (
    <div className={styles.processContainer}>
      <h2 className="sectionTitle">이용 프로세스 안내</h2>

      <ol className={styles.processList}>
        {PROCESS_LIST.map((item, index) => (
          <li className={styles.processItem} key={index}>
            <img
              src={
                item.icon === 'ic_process01'
                  ? icProcess01
                  : item.icon === 'ic_process02'
                    ? icProcess02
                    : item.icon === 'ic_process03'
                      ? icProcess03
                      : icProcess04
              }
              alt={item.title}
            />
            <div className={styles.processItemContent}>
              <strong
                className={styles.processItemTitle}
              >{`${index + 1}. ${item.title}`}</strong>
              <span className={styles.processItemDescription}>
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
