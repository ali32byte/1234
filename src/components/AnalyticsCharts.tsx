import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

export function AnalyticsCharts() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const examTrendData = studentData.exams
    .filter(e => e.taz > 0)
    .map(exam => ({
      name: exam.name,
      تراز: exam.taz,
      میانگین: studentData.averageTaz
    }));

  const topSubject = [...studentData.subjects].sort((a, b) => b.taz - a.taz)[0];
  const weakestSubject = [...studentData.subjects].sort((a, b) => a.taz - b.taz)[0];

  const performanceData = studentData.subjects.map(subject => ({
    name: subject.name,
    تراز: subject.taz,
    'درصد صحیح': ((subject.correct / (subject.correct + subject.wrong + subject.blank)) * 100).toFixed(0)
  }));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500" size={24} />
            <h2 className={`text-xl font-bold ${currentTheme.text}`}>
              روند کلی تراز
            </h2>
          </div>

          <div className="h-72 flex items-center justify-center py-6">
            <ResponsiveContainer width="98%" height="100%">
              <LineChart data={examTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' || theme === 'neon' ? '#374151' : '#e5e7eb'} />
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' || theme === 'neon' ? '#9ca3af' : '#6b7280'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme === 'dark' || theme === 'neon' ? '#9ca3af' : '#6b7280'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' || theme === 'neon' ? '#1f2937' : '#ffffff',
                    border: `1px solid ${theme === 'dark' || theme === 'neon' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="تراز"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="میانگین"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}>
          <h2 className={`text-xl font-bold ${currentTheme.text} mb-6`}>
            خلاصه عملکرد
          </h2>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'} border border-green-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-green-500" size={24} />
                <h3 className={`font-semibold ${currentTheme.text}`}>بهترین درس</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-bold ${currentTheme.text}`}>{topSubject.name}</p>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    {topSubject.correct} صحیح از {topSubject.correct + topSubject.wrong + topSubject.blank}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {topSubject.taz.toLocaleString('fa-IR')}
                  </p>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{topSubject.vsAverage}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'} border border-red-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className={`font-semibold ${currentTheme.text}`}>نیاز به تمرکز</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-bold ${currentTheme.text}`}>{weakestSubject.name}</p>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    {weakestSubject.correct} صحیح از {weakestSubject.correct + weakestSubject.wrong + weakestSubject.blank}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">
                    {weakestSubject.taz.toLocaleString('fa-IR')}
                  </p>
                  <p className={`text-sm ${currentTheme.textSecondary}`}>{weakestSubject.vsAverage}</p>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-white bg-opacity-50">
                <p className={`text-xs ${currentTheme.text}`}>
                  💡 پیشنهاد: تمرکز بیشتر روی این درس می‌تواند تراز کلی شما را تا 500 واحد افزایش دهد
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} border border-blue-200`}
            >
              <h3 className={`font-semibold ${currentTheme.text} mb-3`}>آمار کلی</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {studentData.subjects.reduce((sum, s) => sum + s.correct, 0)}
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>صحیح</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {studentData.subjects.reduce((sum, s) => sum + s.wrong, 0)}
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>غلط</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {studentData.subjects.reduce((sum, s) => sum + s.blank, 0)}
                  </p>
                  <p className={`text-xs ${currentTheme.textSecondary}`}>خالی</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
