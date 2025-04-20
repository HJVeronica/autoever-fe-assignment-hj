import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/global.scss';
import App from './App.tsx';

// MSW 설정
async function setupMocking() {
  if (import.meta.env.MODE !== 'production') {
    const { worker } = await import('./mocks/browser');
    // 리턴 타입 문제를 피하기 위해 await 사용
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});

// MSW 초기화 후 앱 렌더링
async function startApp() {
  // MSW 초기화 먼저 처리
  await setupMocking();

  // 앱 렌더링
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
}

startApp().catch((err) => {
  console.error('앱 시작 중 오류 발생:', err);
});
