import { Navigate, Route, Routes } from 'react-router-dom';
import { PageMeta } from './components/PageMeta';
import { AppLayout } from './layout/AppLayout';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { FlashcardStudyPage } from './pages/FlashcardStudyPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { JsBasicsPage } from './pages/JsBasicsPage';
import { SystemDesignDetailPage } from './pages/SystemDesignDetailPage';
import { SystemDesignPage } from './pages/SystemDesignPage';
import './styles/app.css';

function App() {
  return (
    <>
      <PageMeta />
      <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/get-started" replace />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="js-basics" element={<JsBasicsPage />} />
        <Route path="challenges" element={<ChallengesPage />} />
        <Route path="challenges/:difficulty/:slug" element={<ChallengeDetailPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="flashcards/:slug" element={<FlashcardStudyPage />} />
        <Route path="system-design" element={<SystemDesignPage />} />
        <Route path="system-design/:slug" element={<SystemDesignDetailPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
