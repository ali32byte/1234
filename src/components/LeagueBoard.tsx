import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { LeagueType } from '../types';

export function LeagueBoard() {
  const { theme } = useTheme();
  const { studentData } = useData();
  const currentTheme = themes[theme];

  const leagues: LeagueType[] = ['Bronze', 'Silver', 'Gold', 'Diamond'];

  const getLeagueInfo = (league: LeagueType) => {
    const configs = {
      Bronze: { emoji: '🥉', color: 'from-orange-700 to-orange-900', border: 'border-orange-500', nextThreshold: 8000 },
      Silver: { emoji: '🥈', color: 'from-gray-400 to-gray-600', border: 'border-gray-400', nextThreshold: 10000 },
      Gold: { emoji: '🥇', color: 'from-yellow-400 to-yellow-600', border: 'border-yellow-400', nextThreshold: 12000 },
      Diamond: { emoji: '💎', color: 'from-blue-400 to-purple-600', border: 'border-blue-400', nextThreshold: null }
    };
    return configs[league];
  };

  const currentLeagueIndex = leagues.indexOf(studentData.league);
  const leagueInfo = getLeagueInfo(studentData.league);
  const previousLeague = currentLeagueIndex > 0 ? leagues[currentLeagueIndex - 1] : null;
  const nextLeague = currentLeagueIndex < leagues.length - 1 ? leagues[currentLeagueIndex + 1] : null;
  const nearbyRanks = [
    { rank: studentData.rank.country - 2, name: 'محمد رضایی', taz: studentData.totalTaz + 150, avatar: '👨‍🎓' },
    { rank: studentData.rank.country - 1, name: 'فاطمه احمدی', taz: studentData.totalTaz + 50, avatar: '👩‍🎓' },
    { rank: studentData.rank.country, name: studentData.name, taz: studentData.totalTaz, avatar: studentData.avatar!, isMe: true },
    { rank: studentData.rank.country + 1, name: 'علی محمدی', taz: studentData.totalTaz - 30, avatar: '👨‍💼' },
    { rank: studentData.rank.country + 2, name: 'زهرا کریمی', taz: studentData.totalTaz - 80, avatar: '👩‍💼' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className={`${currentTheme.card} rounded-2xl shadow-xl p-6 ${currentTheme.border} border overflow-hidden`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
          لیگ و رتبه‌بندی
        </h2>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative bg-gradient-to-br ${leagueInfo.color} rounded-xl p-6 mb-6 text-white overflow-hidden`}
      >
        <div className="absolute top-0 right-0 text-9xl opacity-10">
          {leagueInfo.emoji}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">لیگ فعلی</p>
              <div className="flex items-center gap-3">
                {previousLeague && (
                  <span className="text-xl opacity-50">{getLeagueInfo(previousLeague).emoji}</span>
                )}
                <span className="text-4xl">{leagueInfo.emoji}</span>
                {nextLeague && (
                  <span className="text-xl opacity-50">{getLeagueInfo(nextLeague).emoji}</span>
                )}
                <h3 className="text-3xl font-bold">{studentData.league}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">تراز فعلی</p>
              <p className="text-3xl font-bold">{studentData.totalTaz.toLocaleString('fa-IR')}</p>
            </div>
          </div>

          {leagueInfo.nextThreshold && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>پیشرفت تا لیگ بعدی</span>
                <span>
                  {leagueInfo.nextThreshold - studentData.totalTaz > 0
                    ? `${(leagueInfo.nextThreshold - studentData.totalTaz).toLocaleString('fa-IR')} تراز مانده`
                    : 'آماده ارتقا!'
                  }
                </span>
              </div>
              <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((studentData.totalTaz / leagueInfo.nextThreshold) * 100, 100)}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className={currentTheme.text} size={20} />
          <h3 className={`font-semibold ${currentTheme.text}`}>
            رقبای نزدیک در لیگ
          </h3>
        </div>

        <div className="space-y-2">
          {nearbyRanks.map((player, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                player.isMe
                  ? 'bg-blue-500 text-white ring-4 ring-blue-300'
                  : `${theme === 'dark' || theme === 'neon' ? 'bg-gray-700' : 'bg-gray-100'}`
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.isMe ? 'bg-white text-blue-500' : 'bg-gray-300 text-gray-700'
                }`}>
                  {player.rank}
                </div>
                <span className="text-2xl">{player.avatar}</span>
                <span className={`font-medium ${player.isMe ? 'text-white' : currentTheme.text}`}>
                  {player.name}
                  {player.isMe && ' (شما)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${player.isMe ? 'text-white' : currentTheme.text}`}>
                  {player.taz.toLocaleString('fa-IR')}
                </span>
                {!player.isMe && player.rank < studentData.rank.country && (
                  <TrendingUp size={16} className="text-green-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
