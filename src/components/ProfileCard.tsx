import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Calendar, Trophy } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';

export function ProfileCard() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const improvement = studentData.totalTaz - studentData.averageTaz;
  const improvementPercent = ((improvement / studentData.averageTaz) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-6xl"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
            }}
          >
            {studentData.avatar}
          </motion.div>
          <div>
            <h2 className={`text-3xl font-bold ${currentTheme.text} mb-1`}>
              {studentData.name}
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <span className={`flex items-center gap-1 ${currentTheme.textSecondary}`}>
                <MapPin size={14} />
                {studentData.city} - منطقه {studentData.region}
              </span>
              <span className={`flex items-center gap-1 ${currentTheme.textSecondary}`}>
                <Calendar size={14} />
                {studentData.examDate}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`px-6 py-3 rounded-full ${
            studentData.status === 'عالی' ? 'bg-green-100 text-green-700' :
            studentData.status === 'خوب' ? 'bg-blue-100 text-blue-700' :
            studentData.status === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          } font-bold text-lg flex items-center gap-2`}
        >
          <span className="text-2xl">{studentData.statusEmoji}</span>
          {studentData.status}
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-blue-100'} ${currentTheme.border} border`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={20} className="text-blue-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>تراز کل</span>
          </div>
          <p className={`text-2xl font-bold ${currentTheme.text}`}>
            {studentData.totalTaz.toLocaleString('fa-IR')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 to-green-100'} ${currentTheme.border} border`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-green-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>رتبه کشوری</span>
          </div>
          <p className={`text-2xl font-bold ${currentTheme.text}`}>
            {studentData.rank.country.toLocaleString('fa-IR')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gradient-to-br from-purple-50 to-purple-100'} ${currentTheme.border} border`}
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} className="text-purple-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>رتبه منطقه</span>
          </div>
          <p className={`text-2xl font-bold ${currentTheme.text}`}>
            {studentData.rank.region.toLocaleString('fa-IR')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gradient-to-br from-orange-50 to-orange-100'} ${currentTheme.border} border`}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-orange-500" />
            <span className={`text-sm ${currentTheme.textSecondary}`}>بهبود</span>
          </div>
          <p className={`text-2xl font-bold ${improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {improvement > 0 ? '+' : ''}{improvementPercent}%
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6"
      >
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${currentTheme.textSecondary}`}>پیشرفت نسبت به میانگین</span>
          <span className={`text-sm font-bold ${currentTheme.text}`}>
            {studentData.totalTaz.toLocaleString('fa-IR')} / {studentData.averageTaz.toLocaleString('fa-IR')}
          </span>
        </div>
        <div className={`w-full h-3 ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((studentData.totalTaz / (studentData.averageTaz * 1.2)) * 100, 100)}%` }}
            transition={{ delay: 0.7, duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
