import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export function SubjectComparisonChart() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    studentData.subjects.slice(0, 4).map(s => s.name)
  );

  const toggleSubject = (name: string) => {
    if (selectedSubjects.includes(name)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== name));
    } else {
      setSelectedSubjects([...selectedSubjects, name]);
    }
  };

  const chartData = studentData.exams
    .filter(exam => exam.taz > 0)
    .map(exam => {
      const dataPoint: any = { name: exam.name };
      selectedSubjects.forEach(subjectName => {
        const subject = studentData.subjects.find(s => s.name === subjectName);
        if (subject) {
          const examIndex = studentData.exams.findIndex(e => e.name === exam.name);
          if (examIndex >= 0 && examIndex < subject.history.length) {
            dataPoint[subjectName] = subject.history[examIndex];
          }
        }
      });
      return dataPoint;
    });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-500" size={24} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
          مقایسه روند دروس
        </h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {studentData.subjects.map((subject, idx) => (
          <motion.button
            key={subject.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleSubject(subject.name)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSubjects.includes(subject.name)
                ? 'text-white shadow-lg'
                : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text}`
            }`}
            style={selectedSubjects.includes(subject.name) ? { backgroundColor: colors[idx % colors.length] } : {}}
          >
            {subject.name}
          </motion.button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            {selectedSubjects.map((subjectName, idx) => (
              <Line
                key={subjectName}
                type="monotone"
                dataKey={subjectName}
                stroke={colors[studentData.subjects.findIndex(s => s.name === subjectName) % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
