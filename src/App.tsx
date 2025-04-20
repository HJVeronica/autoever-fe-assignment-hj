import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import { Routes, Route } from 'react-router';
import FAQPage from '@/pages/FAQ';

const App = () => {
  return (
    <>
      <TopNavBar />

      <Routes>
        <Route path="/" element={<FAQPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
