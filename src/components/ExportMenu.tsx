import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Check } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { toPng } from 'html-to-image';
import { useState } from 'react';

interface ExportSection {
  id: string;
  title: string;
  elementId: string;
}

interface ExportMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const exportSections: ExportSection[] = [
  { id: 'profile', title: 'پروفایل و وضعیت کلی', elementId: 'profile-section' },
  { id: 'progress', title: 'میانگین پیشرفت تراز', elementId: 'progress-section' },
  { id: 'roadmap', title: 'مسیر آزمون‌ها', elementId: 'roadmap-section' },
  { id: 'summary', title: 'خلاصه عملکرد', elementId: 'analytics-section' },
  { id: 'subjects', title: 'عملکرد دروس', elementId: 'subjects-section' },
  { id: 'comparison', title: 'مقایسه روند دروس', elementId: 'comparison-chart-section' },
  { id: 'league', title: 'لیگ و رتبه‌بندی', elementId: 'league-section' },
  { id: 'achievements', title: 'دستاوردها', elementId: 'achievements-section' },
  { id: 'skillTree', title: 'درخت مهارت', elementId: 'skill-tree-section' }
];

export function ExportMenu({ isOpen, onClose }: ExportMenuProps) {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const toggleSection = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const selectAll = () => {
    setSelectedSections(exportSections.map(s => s.id));
  };

  const deselectAll = () => {
    setSelectedSections([]);
  };

  const handleExport = async () => {
    if (selectedSections.length === 0) return;

    setIsExporting(true);

    try {
      for (const sectionId of selectedSections) {
        const section = exportSections.find(s => s.id === sectionId);
        if (!section) continue;

        const element = document.getElementById(section.elementId);
        if (!element) continue;

        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: theme === 'dark' || theme === 'neon' ? '#1f2937' : '#ffffff'
        });

        const link = document.createElement('a');
        link.download = `${section.title}-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error exporting:', error);
    } finally {
      setIsExporting(false);
      onClose();
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
            className={`fixed top-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl ${currentTheme.card} rounded-2xl shadow-2xl z-[60] max-h-[90vh] overflow-hidden`}
          >
            <div className={`${currentTheme.card} ${currentTheme.border} border-b p-6 flex items-center justify-between`}>
              <h2 className={`text-2xl font-bold ${currentTheme.text}`}>انتخاب بخش‌ها برای دانلود</h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${currentTheme.text} hover:bg-red-500 hover:text-white transition-colors`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  {selectedSections.length} بخش انتخاب شده
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className={`text-sm px-3 py-1 rounded ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text} hover:bg-blue-500 hover:text-white transition-colors`}
                  >
                    انتخاب همه
                  </button>
                  <button
                    onClick={deselectAll}
                    className={`text-sm px-3 py-1 rounded ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text} hover:bg-red-500 hover:text-white transition-colors`}
                  >
                    حذف همه
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exportSections.map((section) => {
                  const isSelected = selectedSections.includes(section.id);

                  return (
                    <motion.button
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSection(section.id)}
                      className={`relative p-4 rounded-xl text-right transition-all ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300'
                          : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'} ${currentTheme.text}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{section.title}</span>
                        {isSelected && (
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <Check size={16} className="text-blue-500" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className={`${currentTheme.card} ${currentTheme.border} border-t p-6 flex gap-3`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                disabled={selectedSections.length === 0 || isExporting}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال دانلود...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    دانلود {selectedSections.length > 0 && `(${selectedSections.length})`}
                  </>
                )}
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
