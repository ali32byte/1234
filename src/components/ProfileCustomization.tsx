import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { availableAvatars, allBadges } from '../data/mockData';
import { useState } from 'react';

interface ProfileCustomizationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileCustomization({ isOpen, onClose }: ProfileCustomizationProps) {
  const { theme } = useTheme();
  const { studentData, updateStudentData } = useData();
  const currentTheme = themes[theme];

  const [selectedAvatar, setSelectedAvatar] = useState(studentData.avatar || '🎓');
  const [selectedBadges, setSelectedBadges] = useState<string[]>(studentData.visibleBadges || []);
  const [selectedColor, setSelectedColor] = useState(studentData.profileColor || '#3b82f6');

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  const handleSave = () => {
    updateStudentData({
      avatar: selectedAvatar,
      visibleBadges: selectedBadges,
      profileColor: selectedColor
    });
    onClose();
  };

  const toggleBadge = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter(b => b !== badge));
    } else if (selectedBadges.length < 3) {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed top-1/6 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl ${currentTheme.card} rounded-2xl shadow-2xl z-[60] max-h-[90vh] overflow-y-auto`}
          >
            <div className={`sticky top-0 ${currentTheme.card} ${currentTheme.border} border-b p-6 flex items-center justify-between`}>
              <h2 className={`text-2xl font-bold ${currentTheme.text}`}>سفارشی‌سازی پروفایل</h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${currentTheme.text} hover:bg-red-500 hover:text-white transition-colors`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                  انتخاب آواتار
                </h3>
                <div className="grid grid-cols-6 gap-3">
                  {availableAvatars.map((avatar) => (
                    <motion.button
                      key={avatar}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`text-4xl p-4 rounded-xl transition-all ${
                        selectedAvatar === avatar
                          ? 'bg-blue-500 shadow-lg ring-4 ring-blue-300'
                          : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} hover:bg-gray-200`
                      }`}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-2`}>
                  نشان‌های نمایشی (حداکثر 3)
                </h3>
                <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>
                  {selectedBadges.length} / 3 انتخاب شده
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {allBadges.map((badge) => {
                    const isUnlocked = studentData.badgesUnlocked?.includes(badge.emoji);
                    const isSelected = selectedBadges.includes(badge.emoji);

                    return (
                      <motion.button
                        key={badge.emoji}
                        whileHover={isUnlocked ? { scale: 1.05 } : {}}
                        whileTap={isUnlocked ? { scale: 0.95 } : {}}
                        onClick={() => isUnlocked && toggleBadge(badge.emoji)}
                        disabled={!isUnlocked}
                        className={`p-4 rounded-xl transition-all relative ${
                          isSelected
                            ? 'bg-green-500 shadow-lg ring-4 ring-green-300'
                            : isUnlocked
                            ? `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} hover:bg-gray-200`
                            : 'bg-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                        title={badge.description}
                      >
                        <div className="text-3xl mb-1">{badge.emoji}</div>
                        <div className={`text-xs ${isSelected ? 'text-white' : currentTheme.textSecondary}`}>
                          {badge.name}
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-white rounded-full p-1">
                            <Check size={12} className="text-green-500" />
                          </div>
                        )}
                        {!isUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl">🔒</span>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>
                  رنگ برجسته
                </h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full transition-all ${
                        selectedColor === color ? 'ring-4 ring-offset-2 ring-gray-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={`sticky bottom-0 ${currentTheme.card} ${currentTheme.border} border-t p-6 flex gap-3`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                ذخیره تغییرات
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`flex-1 ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-200'} ${currentTheme.text} py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors`}
              >
                انصراف
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
