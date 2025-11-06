import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { useState } from 'react';

interface AIAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAnalysis({ isOpen, onClose }: AIAnalysisProps) {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const apiKey = 'AIzaSyBE-lJCcVBl2T1gBXJZL-pGvSbv9_eC98s';

      const topSubjects = [...studentData.subjects]
        .sort((a, b) => b.taz - a.taz)
        .slice(0, 3)
        .map(s => `${s.name} (تراز: ${s.taz})`)
        .join('، ');

      const weakSubjects = [...studentData.subjects]
        .sort((a, b) => a.taz - b.taz)
        .slice(0, 3)
        .map(s => `${s.name} (تراز: ${s.taz})`)
        .join('، ');

      const completedExams = studentData.exams.filter(e => e.taz > 0);
      const trendDirection = completedExams.length > 1
        ? completedExams[completedExams.length - 1].taz > completedExams[0].taz ? 'صعودی' : 'نزولی'
        : 'نامشخص';

      const prompt = `
تو یک مشاور تحصیلی حرفه‌ای هستی. یک دانش‌آموز کنکور با مشخصات زیر را تحلیل کن و گزارش جامعی ارائه بده:

نام دانش‌آموز: ${studentData.name}
تراز کل فعلی: ${studentData.totalTaz}
میانگین تراز: ${studentData.averageTaz}
رتبه کشوری: ${studentData.rank.country}
لیگ فعلی: ${studentData.league}
روند کلی: ${trendDirection}

بهترین دروس: ${topSubjects}
ضعیف‌ترین دروس: ${weakSubjects}

تعداد آزمون‌های شرکت کرده: ${completedExams.length}
تعداد غیبت: ${studentData.absenceCount}

کل پاسخ‌های صحیح: ${studentData.subjects.reduce((sum, s) => sum + s.correct, 0)}
کل پاسخ‌های غلط: ${studentData.subjects.reduce((sum, s) => sum + s.wrong, 0)}
کل پاسخ‌های خالی: ${studentData.subjects.reduce((sum, s) => sum + s.blank, 0)}

لطفاً گزارش تحلیلی کامل و جامع به فارسی ارائه بده که شامل:
1. تحلیل وضعیت کلی
2. نقاط قوت (با ذکر دقیق دروس و آمار)
3. نقاط ضعف و چالش‌ها
4. پیشنهادات عملی برای بهبود
5. استراتژی‌های خاص برای هر درس ضعیف
6. برنامه عملیاتی کوتاه‌مدت و بلندمدت

گزارش باید جامع، دقیق، حرفه‌ای و انگیزه‌بخش باشد.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('خطا در دریافت تحلیل هوشمند');
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'خطا در تولید تحلیل';

      setAnalysis(generatedText);
    } catch (err) {
      setError('متاسفانه در دریافت تحلیل هوشمند خطایی رخ داد. لطفاً دوباره تلاش کنید.');
      console.error('AI Analysis Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    if (isOpen && !analysis && !isLoading) {
      generateAnalysis();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleOpen}>
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
            className={`fixed top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl ${currentTheme.card} rounded-2xl shadow-2xl z-[60] max-h-[85vh] overflow-hidden`}
          >
            <div className={`${currentTheme.card} ${currentTheme.border} border-b p-6 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500`}>
              <div className="flex items-center gap-3">
                <Sparkles className="text-white" size={28} />
                <h2 className="text-2xl font-bold text-white">تحلیل هوشمند AI</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(85vh-140px)] overflow-y-auto">
              {!analysis && !isLoading && !error && (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <Sparkles size={64} className="mx-auto text-purple-500" />
                  </motion.div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-3`}>
                    آماده دریافت تحلیل هوشمند؟
                  </h3>
                  <p className={`${currentTheme.textSecondary} mb-6`}>
                    هوش مصنوعی با تحلیل دقیق عملکرد شما، پیشنهادات سفارشی برای بهبود ارائه می‌دهد
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateAnalysis}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    تولید تحلیل هوشمند
                  </motion.button>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <Loader2 className="animate-spin mx-auto text-purple-500 mb-4" size={48} />
                  <p className={`text-lg font-semibold ${currentTheme.text}`}>
                    در حال تحلیل داده‌های شما...
                  </p>
                  <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>
                    این ممکن است چند لحظه طول بکشد
                  </p>
                </div>
              )}

              {error && (
                <div className={`p-6 rounded-xl ${theme === 'dark' || theme === 'neon' ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'} border border-red-200 text-center`}>
                  <p className="text-red-600 font-medium mb-4">{error}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateAnalysis}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    تلاش مجدد
                  </motion.button>
                </div>
              )}

              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${theme === 'dark' || theme === 'neon' ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6`}
                >
                  <div className={`prose prose-lg max-w-none ${currentTheme.text}`}>
                    {analysis.split('\n').map((paragraph, idx) => {
                      if (!paragraph.trim()) return null;

                      if (paragraph.startsWith('#')) {
                        return (
                          <h3 key={idx} className={`text-xl font-bold ${currentTheme.text} mt-6 mb-3`}>
                            {paragraph.replace(/^#+\s*/, '')}
                          </h3>
                        );
                      }

                      if (paragraph.match(/^\d+\./)) {
                        return (
                          <p key={idx} className={`${currentTheme.text} mb-2 font-medium`}>
                            {paragraph}
                          </p>
                        );
                      }

                      return (
                        <p key={idx} className={`${currentTheme.text} mb-3 leading-relaxed`}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            <div className={`${currentTheme.card} ${currentTheme.border} border-t p-6 flex gap-3`}>
              {analysis && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateAnalysis}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  تولید تحلیل جدید
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`flex-1 ${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-200'} ${currentTheme.text} py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors`}
              >
                بستن
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
