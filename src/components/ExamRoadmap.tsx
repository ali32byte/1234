import { motion } from 'framer-motion';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { Calendar } from 'lucide-react';

export function ExamRoadmap() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const getNodeColor = (taz: number) => {
    if (taz === 0) return 'bg-gray-300';
    if (taz >= 10000) return 'bg-green-500';
    if (taz >= 9000) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getNodeEmoji = (taz: number) => {
    if (taz === 0) return '🔒';
    if (taz >= 10000) return '🟢';
    if (taz >= 9000) return '🟡';
    return '🔴';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-blue-500" size={24} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
          مسیر آزمون‌ها
        </h2>
      </div>

      <div className="relative">
        <div className={`absolute top-1/2 left-0 right-0 h-1 ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-300'} transform -translate-y-1/2`} />

        <div className="flex justify-between items-center relative">
          {studentData.exams.map((exam, index) => {
            const isCompleted = exam.taz > 0;
            const nodeColor = getNodeColor(exam.taz);
            const nodeEmoji = getNodeEmoji(exam.taz);

            return (
              <motion.div
                key={exam.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`${nodeColor} w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                    isCompleted ? 'ring-4 ring-white' : ''
                  } transition-all`}
                >
                  {nodeEmoji}
                </motion.div>

                <div className={`mt-3 text-center ${currentTheme.text}`}>
                  <p className="font-bold text-sm">{exam.name}</p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>{exam.date}</p>
                  {isCompleted && (
                    <p className="text-xs font-semibold mt-1">
                      {exam.taz.toLocaleString('fa-IR')}
                    </p>
                  )}
                </div>

                {isCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className={`absolute top-20 mt-16 ${currentTheme.card} ${currentTheme.border} border rounded-lg shadow-xl p-4 z-10 opacity-0 group-hover:opacity-100 transition-all pointer-events-none`}
                  >
                    <p className={`text-sm ${currentTheme.text} font-semibold`}>
                      تراز: {exam.taz.toLocaleString('fa-IR')}
                    </p>
                    {index > 0 && studentData.exams[index - 1].taz > 0 && (
                      <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>
                        تغییر: {((exam.taz - studentData.exams[index - 1].taz) / studentData.exams[index - 1].taz * 100).toFixed(1)}%
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          <span className={currentTheme.textSecondary}>عالی (۱۰۰۰۰+)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className={currentTheme.textSecondary}>خوب (۹۰۰۰-۹۹۹۹)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className={currentTheme.textSecondary}>نیاز به بهبود (&lt;۹۰۰۰)</span>
        </div>
      </div>
    </motion.div>
  );
}
