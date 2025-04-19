import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// MSW 워커 생성
export const worker = setupWorker(...handlers);
