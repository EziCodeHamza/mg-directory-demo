import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import TherapistPage from '@/pages/TherapistPage';
import ApplyPage from '@/pages/ApplyPage';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? 'h-screen flex flex-col bg-cream overflow-hidden' : 'min-h-screen flex flex-col bg-cream'}>
      <Header />
      <main className={isHomePage ? 'flex-1 flex flex-col overflow-hidden' : 'flex-1 flex flex-col'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/therapist/:slug" element={<TherapistPage />} />
          <Route path="/apply" element={<ApplyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
