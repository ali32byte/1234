import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';

export function ExamProgress() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const completedExams = studentData.exams.filter(e => e.taz > 0);

  const improvements = completedExams.slice(1).map((exam, idx) => ({
    examName: exam.name,
    previousTaz: completedExams[idx].taz,
    currentTaz: exam.taz,
    improvement: exam.taz - completedExams[idx].taz,
    improvementPercent: ((exam.taz - completedExams[idx].taz) / completedExams[idx].taz * 100).toFixed(1)
  }));

  const totalImprovement = completedExams.length > 1
    ? completedExams[completedExams.length - 1].taz - completedExams[0].taz
    : 0;

  const averageImprovement = improvements.length > 0
    ? improvements.reduce((sum, imp) => sum + imp.improvement, 0) / improvements.length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-blue-500" size={24} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
          میانگین پیشرفت تراز
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} ${currentTheme.border} border border-blue-200`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>پیشرفت کل</span>
          </div>
          <p className={`text-3xl font-bold ${totalImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalImprovement >= 0 ? '+' : ''}{totalImprovement.toLocaleString('fa-IR')}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
            از {completedExams[0]?.taz.toLocaleString('fa-IR')} تا {completedExams[completedExams.length - 1]?.taz.toLocaleString('fa-IR')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-50 to-green-100'} ${currentTheme.border} border border-green-200`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>میانگین بهبود</span>
          </div>
          <p className={`text-3xl font-bold ${averageImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {averageImprovement >= 0 ? '+' : ''}{Math.round(averageImprovement).toLocaleString('fa-IR')}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
            به ازای هر آزمون
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gradient-to-br from-purple-900 to-purple-800' : 'bg-gradient-to-br from-purple-50 to-purple-100'} ${currentTheme.border} border border-purple-200`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-purple-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>تعداد آزمون‌ها</span>
          </div>
          <p className={`text-3xl font-bold ${currentTheme.text}`}>
            {completedExams.length.toLocaleString('fa-IR')}
          </p>
          <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
            آزمون شرکت کرده
          </p>
        </motion.div>
      </div>

      {improvements.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-3`}>
            تغییرات تراز در هر آزمون
          </h3>
          <div className="space-y-2">
            {improvements.map((imp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {imp.improvement >= 0 ? (
                    <TrendingUp className="text-green-500" size={20} />
                  ) : (
                    <TrendingDown className="text-red-500" size={20} />
                  )}
                  <div>
                    <p className={`font-medium ${currentTheme.text}`}>{imp.examName}</p>
                    <p className={`text-xs ${currentTheme.textSecondary}`}>
                      {imp.previousTaz.toLocaleString('fa-IR')} → {imp.currentTaz.toLocaleString('fa-IR')}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`font-bold text-lg ${imp.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {imp.improvement >= 0 ? '+' : ''}{imp.improvement.toLocaleString('fa-IR')}
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    ({imp.improvement >= 0 ? '+' : ''}{imp.improvementPercent}%)
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
