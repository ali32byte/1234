import { motion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { allBadges } from '../data/mockData';

export function Achievements() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-4 md:p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          <h2 className={`text-lg md:text-2xl font-bold ${currentTheme.text}`}>
            دستاوردها
          </h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs md:text-sm ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <span className={`font-semibold ${currentTheme.text}`}>
            {studentData.badgesUnlocked?.length} / {allBadges.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        {allBadges.map((badge, idx) => {
          const isUnlocked = studentData.badgesUnlocked?.includes(badge.emoji);

          return (
            <motion.div
              key={badge.emoji}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={isUnlocked ? { scale: 1.1 } : {}}
              className={`relative p-3 rounded-lg text-center transition-all ${
                isUnlocked
                  ? `${theme === 'dark' || theme === 'neon' ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'} border border-yellow-400 shadow-md cursor-pointer`
                  : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-800' : 'bg-gray-100'} opacity-40 cursor-not-allowed`
              }`}
              title={badge.description}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                  <Lock className="text-white" size={16} />
                </div>
              )}

              <motion.div
                animate={isUnlocked ? {
                  scale: [1, 1.15, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-3xl"
              >
                {badge.emoji}
              </motion.div>

              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className={`mt-4 p-3 rounded-lg ${theme === 'dark' || theme === 'neon' ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} border border-blue-200`}
      >
        <p className={`text-xs md:text-sm ${currentTheme.text} text-center`}>
          💡 نشان‌های بیشتر با ادامه تلاش و بهبود عملکرد باز خواهند شد!
        </p>
      </motion.div>
    </motion.div>
  );
}
