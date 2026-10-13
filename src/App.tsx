import React, { useState } from 'react';
import { Navbar, ActiveRoute } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnatomyView } from './views/AnatomyView';
import { CarePlansView } from './views/CarePlansView';
import { InjectionsView } from './views/InjectionsView';
import { TrainingView } from './views/TrainingView';
import { PharmacyView } from './views/PharmacyView';
import { FlashcardsView } from './views/FlashcardsView';
import { ClinicalToolsView } from './views/ClinicalToolsView';
import { ExamsView } from './views/ExamsView';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function MainApp() {
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>('anatomy');
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const [selectedExamCode, setSelectedExamCode] = useState<string | undefined>(undefined);

  const handleNavigateToPharmacy = (drugId: string) => {
    setSelectedDrugId(drugId);
    setActiveRoute('pharmacy');
  };

  const handleStartExam = (examCode: string) => {
    setSelectedExamCode(examCode);
    setActiveRoute('exams');
  };

  const handleNavigateToOrgan = (organId: string) => {
    setActiveRoute('anatomy');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Navbar
        activeRoute={activeRoute}
        onRouteChange={(route) => {
          setActiveRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 w-full max-w-[1720px] mx-auto overflow-hidden">
        {activeRoute === 'anatomy' && (
          <AnatomyView
            onNavigateToPharmacyWithDrug={handleNavigateToPharmacy}
            onStartQuizForOrgan={handleStartExam}
          />
        )}

        {activeRoute === 'careplans' && <CarePlansView />}

        {activeRoute === 'injections' && <InjectionsView />}

        {activeRoute === 'training' && (
          <TrainingView
            onStartExamWithCode={handleStartExam}
            onNavigateToAnatomyOrgan={handleNavigateToOrgan}
          />
        )}

        {activeRoute === 'pharmacy' && (
          <PharmacyView
            initialDrugId={selectedDrugId}
            onNavigateToOrgan={handleNavigateToOrgan}
          />
        )}

        {activeRoute === 'flashcards' && <FlashcardsView />}

        {activeRoute === 'tools' && <ClinicalToolsView />}

        {activeRoute === 'exams' && (
          <ExamsView initialExamCode={selectedExamCode} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
