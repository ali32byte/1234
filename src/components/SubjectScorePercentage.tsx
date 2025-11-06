import { motion } from 'framer-motion';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { BarChart3 } from 'lucide-react';

export function SubjectScorePercentage() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const subjectScores = studentData.subjects.map(subject => {
    const total = subject.correct + subject.wrong + subject.blank;
    const percentage = total > 0 ? Math.round((subject.correct / total) * 100) : 0;
    return {
      name: subject.name,
      percentage,
      taz: subject.taz,
      correct: subject.correct,
      total: total
    };
  }).sort((a, b) => b.percentage - a.percentage);

  const getColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-400 to-green-500';
    if (percentage >= 60) return 'from-blue-400 to-blue-500';
    if (percentage >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-500" size={24} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
          درصد درستی دروس
        </h2>
      </div>

      <div className="space-y-3">
        {subjectScores.map((subject, idx) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-semibold ${currentTheme.text}`}>
                {subject.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${currentTheme.text}`}>
                  {subject.percentage}%
                </span>
                <span className={`text-xs ${currentTheme.textSecondary}`}>
                  ({subject.correct}/{subject.total})
                </span>
              </div>
            </div>

            <div className={`relative h-3 rounded-full overflow-hidden ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.percentage}%` }}
                transition={{ delay: idx * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${getColor(subject.percentage)} shadow-lg`}
              />
            </div>

            <div className={`flex items-center justify-between mt-1 text-xs ${currentTheme.textSecondary} opacity-0 group-hover:opacity-100 transition-opacity`}>
              <span>تراز: {subject.taz.toLocaleString('fa-IR')}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-6 p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} border border-blue-200`}
      >
        <p className={`text-sm ${currentTheme.text}`}>
          <span className="font-semibold">نکته:</span> درصد درستی بر اساس تعداد پاسخ‌های صحیح نسبت به کل پرسش‌ها محاسبه شده است.
        </p>
      </motion.div>
    </motion.div>
  );
}
