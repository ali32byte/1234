import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Target } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { useState } from 'react';
import { SkillNode } from '../types';

export function SkillTree() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([studentData.subjects[0]?.name]);

  const toggleSubject = (name: string) => {
    if (expandedSubjects.includes(name)) {
      setExpandedSubjects(expandedSubjects.filter(s => s !== name));
    } else {
      setExpandedSubjects([...expandedSubjects, name]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-blue-500" size={24} />
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            درخت مهارت
          </h2>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedSubjects(studentData.subjects.map(s => s.name))}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text}`}
          >
            بازکردن همه
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedSubjects([])}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text}`}
          >
            بستن همه
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        {studentData.subjects.map((subject, idx) => (
          <div key={subject.name}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleSubject(subject.name)}
              className={`w-full flex items-center justify-between p-4 rounded-xl ${
                theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'
              } hover:shadow-lg transition-all`}
            >
              <div className="flex items-center gap-3">
                {expandedSubjects.includes(subject.name) ? (
                  <ChevronDown size={20} className={currentTheme.text} />
                ) : (
                  <ChevronRight size={20} className={currentTheme.text} />
                )}
                <span className="text-xl">{subject.statusEmoji}</span>
                <span className={`font-semibold ${currentTheme.text}`}>{subject.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${currentTheme.textSecondary}`}>
                  {subject.skillTree && Math.round(
                    subject.skillTree.reduce((sum, skill) => sum + skill.mastery, 0) / subject.skillTree.length
                  )}% تسلط
                </span>
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedSubjects.includes(subject.name) && subject.skillTree && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pr-8 pt-3 space-y-2">
                    {subject.skillTree.map(skill => (
                      <SkillNodeComponent key={skill.id} node={skill} level={0} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillNodeComponent({ node, level }: { node: SkillNode; level: number }) {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [expanded, setExpanded] = useState(false);

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 85) return 'bg-green-500';
    if (mastery >= 70) return 'bg-blue-500';
    if (mastery >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div style={{ marginRight: `${level * 24}px` }}>
      <motion.div
        whileHover={{ scale: 1.02, x: 5 }}
        className={`flex items-center justify-between p-3 rounded-lg ${
          theme === 'dark' || theme === 'neon' ? 'bg-gray-800' : 'bg-white'
        } ${currentTheme.border} border cursor-pointer`}
        onClick={() => node.children && setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 flex-1">
          {node.children && (
            expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
          <span className={`text-sm ${currentTheme.text}`}>{node.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold ${currentTheme.text}`}>
            {node.mastery}%
          </span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${node.mastery}%` }}
              className={`h-full ${getMasteryColor(node.mastery)} rounded-full`}
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 space-y-2"
          >
            {node.children.map(child => (
              <SkillNodeComponent key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
