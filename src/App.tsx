import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { ThemeProvider, useTheme, themes } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { ProfileCustomization } from './components/ProfileCustomization';
import { ExamRoadmap } from './components/ExamRoadmap';
import { ExamProgress } from './components/ExamProgress';
import { SubjectGrid } from './components/SubjectGrid';
import { SubjectComparisonChart } from './components/SubjectComparisonChart';
import { SkillTree } from './components/SkillTree';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { LeagueBoard } from './components/LeagueBoard';
import { Achievements } from './components/Achievements';
import { ExportMenu } from './components/ExportMenu';
import { motion } from 'framer-motion';

function AppContent() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`}>
      <Header onProfileClick={() => setShowProfileModal(true)} />

      <ProfileCustomization
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <ExportMenu
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowExportMenu(true)}
        className="fixed bottom-8 left-8 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-colors z-40"
        title="دانلود تصویر"
      >
        <Share2 size={24} />
      </motion.button>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div id="profile-section">
          <h2 className={`text-2xl font-bold ${currentTheme.text} mb-4`}>وضعیت کلی شما</h2>
          <ProfileCard />
        </div>

        <div id="progress-section">
          <ExamProgress />
        </div>

        <div id="roadmap-section">
          <ExamRoadmap />
        </div>

        <div id="analytics-section">
          <AnalyticsCharts />
        </div>

        <div id="subjects-section">
          <SubjectGrid />
        </div>

        <div id="comparison-chart-section">
          <SubjectComparisonChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="league-section">
            <LeagueBoard />
          </div>

          <div id="achievements-section">
            <Achievements />
          </div>
        </div>

        <div id="skill-tree-section">
          <SkillTree />
        </div>
      </main>

      <footer className={`${currentTheme.card} ${currentTheme.border} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`text-center md:text-right ${currentTheme.text}`}>
              <p className="font-bold text-lg mb-1">کارنامه ماز</p>
              <p className={`text-sm ${currentTheme.textSecondary}`}>
                تحلیل هوشمند عملکرد تحصیلی
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <a
                href="https://biomaze.ir"
                target="_blank"
                rel="noopener noreferrer"
                className={`${currentTheme.textSecondary} hover:text-blue-500 transition-colors`}
              >
                biomaze.ir
              </a>
              <a
                href="#"
                className={`${currentTheme.textSecondary} hover:text-blue-500 transition-colors`}
              >
                پشتیبانی
              </a>
              <a
                href="#"
                className={`${currentTheme.textSecondary} hover:text-blue-500 transition-colors`}
              >
                شرایط استفاده
              </a>
            </div>

            <div className={`text-sm ${currentTheme.textSecondary}`}>
              © 1404 - نسخه 1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ThemeProvider>
  );
}
