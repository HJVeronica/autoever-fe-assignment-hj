import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import FAQPage from '@/pages/FAQ';

import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <TopNavBar />

      <Routes>
        <Route path="/" element={<FAQPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
