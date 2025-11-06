import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { toPng } from 'html-to-image';
import { useState } from 'react';

interface ShareButtonProps {
  elementId: string;
  title: string;
}

export function ShareButton({ elementId, title }: ShareButtonProps) {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error('Element not found');
        return;
      }

      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: theme === 'dark' || theme === 'neon' ? '#1f2937' : '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${title}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isSharing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">در حال ایجاد...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span className="text-sm font-medium">دانلود تصویر</span>
        </>
      )}
    </motion.button>
  );
}
