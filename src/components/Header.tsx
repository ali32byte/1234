import { motion } from 'framer-motion';
import { Bell, ChevronDown } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { ThemeType } from '../types';
import { useState } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
}

export function Header({ onProfileClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { studentData } = useData();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const currentTheme = themes[theme];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${currentTheme.card} ${currentTheme.border} border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <motion.img
              src="/logo.png"
              alt="لوگو ماز"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 object-contain"
            />
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
              کارنامه ماز
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg ${currentTheme.text} hover:${currentTheme.accent} hover:text-white transition-colors relative`}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.card} ${currentTheme.border} border ${currentTheme.text} hover:shadow-lg transition-all`}
              >
                <span>🎨</span>
                <span className="text-sm font-medium">{currentTheme.name}</span>
                <ChevronDown size={16} />
              </motion.button>

              {showThemeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute left-0 mt-2 w-40 ${currentTheme.card} ${currentTheme.border} border rounded-lg shadow-xl overflow-hidden`}
                >
                  {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => {
                        setTheme(themeKey);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full text-right px-4 py-2 ${currentTheme.text} hover:${currentTheme.accent} hover:text-white transition-colors ${
                        theme === themeKey ? currentTheme.accent + ' text-white' : ''
                      }`}
                    >
                      {themes[themeKey].name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProfileClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentTheme.card} ${currentTheme.border} border hover:shadow-lg transition-all`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{studentData.avatar}</span>
                <div className="text-right hidden md:block">
                  <p className={`text-sm font-medium ${currentTheme.text}`}>
                    {studentData.name}
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>
                    {studentData.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {studentData.visibleBadges?.slice(0, 3).map((badge, idx) => (
                  <span key={idx} className="text-sm">{badge}</span>
                ))}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
