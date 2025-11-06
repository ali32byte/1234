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
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-500" size={24} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            دستاوردها و نشان‌ها
          </h2>
        </div>
        <div className={`px-4 py-2 rounded-full ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <span className={`text-sm font-semibold ${currentTheme.text}`}>
            {studentData.badgesUnlocked?.length} / {allBadges.length} باز شده
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allBadges.map((badge, idx) => {
          const isUnlocked = studentData.badgesUnlocked?.includes(badge.emoji);

          return (
            <motion.div
              key={badge.emoji}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={isUnlocked ? { scale: 1.1, rotate: 5 } : {}}
              className={`relative p-6 rounded-xl text-center transition-all ${
                isUnlocked
                  ? `${theme === 'dark' || theme === 'neon' ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'} ${currentTheme.border} border-2 border-yellow-400 shadow-lg cursor-pointer`
                  : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-800' : 'bg-gray-100'} opacity-50 cursor-not-allowed`
              }`}
              title={badge.description}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                  <Lock className="text-white" size={32} />
                </div>
              )}

              <motion.div
                animate={isUnlocked ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-5xl mb-3"
              >
                {badge.emoji}
              </motion.div>

              <h3 className={`font-bold text-sm mb-1 ${isUnlocked ? currentTheme.text : 'text-gray-400'}`}>
                {badge.name}
              </h3>
              <p className={`text-xs ${isUnlocked ? currentTheme.textSecondary : 'text-gray-500'}`}>
                {badge.description}
              </p>

              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
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
        transition={{ delay: 1 }}
        className={`mt-6 p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} border border-blue-200`}
      >
        <p className={`text-sm ${currentTheme.text} text-center`}>
          💡 نشان‌های بیشتر با ادامه تلاش و بهبود عملکرد باز خواهند شد!
        </p>
      </motion.div>
    </motion.div>
  );
}
