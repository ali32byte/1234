import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BookOpen, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { useState } from 'react';
import { Subject } from '../types';

type SortType = 'taz' | 'improvement';

export function SubjectGrid() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];
  const [sortBy, setSortBy] = useState<SortType>('taz');

  const sortedSubjects = [...studentData.subjects].sort((a, b) => {
    if (sortBy === 'taz') {
      return b.taz - a.taz;
    }
    if (sortBy === 'improvement') {
      const aImprovement = a.history[a.history.length - 1] - a.history[0];
      const bImprovement = b.history[b.history.length - 1] - b.history[0];
      return bImprovement - aImprovement;
    }
    return 0;
  });

  const topSubjects = sortedSubjects.slice(0, 3);
  const weakSubjects = sortedSubjects.slice(-3).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-500" size={24} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            عملکرد دروس
          </h2>
        </div>

        <div className="flex gap-2">
          {[
            { key: 'taz' as SortType, label: 'تراز' },
            { key: 'improvement' as SortType, label: 'پیشرفت' }
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === key
                  ? 'bg-blue-500 text-white'
                  : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text}`
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'} ${currentTheme.border} border border-green-200`}>
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${currentTheme.text}`}>
            <TrendingUp className="text-green-500" size={20} />
            بهترین دروس
          </h3>
          <div className="space-y-2">
            {topSubjects.map((subject, idx) => (
              <div key={subject.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{['🥇', '🥈', '🥉'][idx]}</span>
                  <span className={`text-sm ${currentTheme.text}`}>{subject.name}</span>
                </div>
                <span className={`text-sm font-bold ${currentTheme.text}`}>
                  {subject.taz.toLocaleString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'} ${currentTheme.border} border border-red-200`}>
          <h3 className={`font-semibold mb-3 flex items-center gap-2 ${currentTheme.text}`}>
            <TrendingDown className="text-red-500" size={20} />
            نیاز به توجه
          </h3>
          <div className="space-y-2">
            {weakSubjects.map((subject) => (
              <div key={subject.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{subject.statusEmoji}</span>
                  <span className={`text-sm ${currentTheme.text}`}>{subject.name}</span>
                </div>
                <span className={`text-sm font-bold text-red-600`}>
                  {subject.taz.toLocaleString('fa-IR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSubjects.map((subject, index) => (
          <SubjectCard key={subject.name} subject={subject} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const totalQuestions = subject.correct + subject.wrong + subject.blank;
  const percentage = totalQuestions > 0 ? ((subject.correct / totalQuestions) * 100).toFixed(0) : '0';
  const improvement = subject.history[subject.history.length - 1] - subject.history[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`${currentTheme.card} rounded-xl shadow-lg p-4 ${currentTheme.border} border hover:shadow-2xl transition-all cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`font-semibold ${currentTheme.text} text-sm mb-1`}>
            {subject.name}
          </h3>
          <p className={`text-2xl font-bold ${currentTheme.text}`}>
            {subject.taz.toLocaleString('fa-IR')}
          </p>
        </div>
        <div className="text-3xl">
          {subject.statusEmoji}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <CheckCircle size={14} className="text-green-500" />
            <span className={currentTheme.textSecondary}>صحیح: {subject.correct}</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle size={14} className="text-red-500" />
            <span className={currentTheme.textSecondary}>غلط: {subject.wrong}</span>
          </div>
          <div className="flex items-center gap-1">
            <MinusCircle size={14} className="text-gray-400" />
            <span className={currentTheme.textSecondary}>خالی: {subject.blank}</span>
          </div>
        </div>

        <div className={`w-full h-2 ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={`${currentTheme.textSecondary}`}>
          نسبت به میانگین: <span className={`font-bold ${subject.vsAverage.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {subject.vsAverage}
          </span>
        </span>
        {improvement !== 0 && (
          <span className={`flex items-center gap-1 ${improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {improvement > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(improvement)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
