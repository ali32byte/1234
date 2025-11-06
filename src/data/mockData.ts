import { StudentReport } from '../types';

export const mockStudentData: StudentReport = {
  name: "حسین ذاکری",
  city: "سمنان",
  region: "2",
  examDate: "1404/07/03 - 14:29",
  status: "عالی",
  statusEmoji: "😍",
  totalTaz: 9918,
  rank: { country: 219, region: 124 },
  averageTaz: 9143,
  league: "Silver",
  avatar: "🎓",
  profileColor: "#3b82f6",
  totalCorrect: 64,
  totalWrong: 17,
  totalBlank: 44,
  totalParticipants: 11902,
  absenceCount: 6,
  subjects: [
    {
      name: "ریاضی و آمار",
      taz: 12654,
      history: [11800, 12050, 12300, 12600, 12654],
      correct: 9,
      wrong: 0,
      blank: 6,
      percentWithNegative: 60,
      percentWithoutNegative: 60,
      vsAverage: "+47%",
      statusEmoji: "😍",
      tazIfNoWrong: 12654,
      rank: 30,
      skillTree: [
        {
          id: "math-1",
          name: "معادله درجه دوم",
          mastery: 50,
          children: []
        },
        {
          id: "math-2",
          name: "مفهوم و ضابطه تابع",
          mastery: 100,
          children: []
        },
        {
          id: "math-3",
          name: "نمودار تابع",
          mastery: 0,
          children: []
        },
        {
          id: "math-4",
          name: "گردآوری داده ها",
          mastery: 100,
          children: []
        },
        {
          id: "math-5",
          name: "خلاصه عددی دادهها",
          mastery: 66.67,
          children: []
        },
        {
          id: "math-6",
          name: "نمایش داده ها",
          mastery: 66.67,
          children: []
        }
      ]
    },
    {
      name: "زبان و ادبیات فارسی",
      taz: 10349,
      history: [9800, 9950, 10100, 10200, 10349],
      correct: 13,
      wrong: 4,
      blank: 3,
      percentWithNegative: 58.33,
      percentWithoutNegative: 65,
      vsAverage: "+34%",
      statusEmoji: "😍",
      tazIfNoWrong: 10836,
      rank: 232,
      skillTree: [
        { id: "lit-1", name: "فصل اول", mastery: 100 },
        { id: "lit-2", name: "فصل دوم", mastery: 26.67 },
        { id: "lit-3", name: "فصل سوم", mastery: 61.11 },
        { id: "lit-4", name: "فصل چهارم", mastery: 70.83 }
      ]
    },
    {
      name: "علوم اجتماعی",
      taz: 9383,
      history: [8900, 9000, 9100, 9250, 9383],
      correct: 11,
      wrong: 2,
      blank: 2,
      percentWithNegative: 68.89,
      percentWithoutNegative: 73.33,
      vsAverage: "+26%",
      statusEmoji: "🙂",
      tazIfNoWrong: 9644,
      rank: 624,
      skillTree: [
        { id: "social-1", name: "اجتماع", mastery: 100 },
        { id: "social-2", name: "جهان اجتماعی", mastery: 100 },
        { id: "social-3", name: "پیامدها و ارزیابی جهان اجتماعی", mastery: 33.33 },
        { id: "social-4", name: "هویت فردی و اجتماعی", mastery: 66.67 },
        { id: "social-5", name: "علل تحوالت هویتی", mastery: 100 },
        { id: "social-6", name: "هویت فرهنگی، تاریخی", mastery: -16.67 },
        { id: "social-7", name: "هویت سیاسی اقتصادی", mastery: 100 }
      ]
    },
    {
      name: "روانشناسی",
      taz: 9717,
      history: [9200, 9350, 9500, 9600, 9717],
      correct: 7,
      wrong: 3,
      blank: 0,
      percentWithNegative: 60,
      percentWithoutNegative: 70,
      vsAverage: "+32%",
      statusEmoji: "😍",
      tazIfNoWrong: 10300,
      rank: 480,
      skillTree: [
        { id: "psych-1", name: "تعریف و روش مورد مطالعه", mastery: 100 },
        { id: "psych-2", name: "روانشناسی رشد", mastery: 100 },
        { id: "psych-3", name: "احساس، توجه و ادراک", mastery: 100 },
        { id: "psych-4", name: "حافظه", mastery: 100 },
        { id: "psych-5", name: "حل مسئله", mastery: -33.33 },
        { id: "psych-6", name: "تصمیمگیری", mastery: 33.33 },
        { id: "psych-7", name: "انگیزه و نگرش", mastery: 100 },
        { id: "psych-8", name: "روانشناسی سلامت", mastery: -33.33 }
      ]
    },
    {
      name: "زبان عربی",
      taz: 9920,
      history: [9400, 9500, 9650, 9800, 9920],
      correct: 10,
      wrong: 3,
      blank: 2,
      percentWithNegative: 60,
      percentWithoutNegative: 66.67,
      vsAverage: "+34%",
      statusEmoji: "😍",
      tazIfNoWrong: 10324,
      rank: 403,
      skillTree: [
        { id: "arab-1", name: "درس اول", mastery: 100 },
        { id: "arab-2", name: "درس دوم", mastery: 100 },
        { id: "arab-3", name: "درس سوم", mastery: -33.33 },
        { id: "arab-4", name: "درس چهارم", mastery: 66.67 },
        { id: "arab-5", name: "درس پنجم", mastery: 50 },
        { id: "arab-6", name: "درس ششم", mastery: 100 },
        { id: "arab-7", name: "درس هفتم", mastery: 100 },
        { id: "arab-8", name: "درس هشتم", mastery: 11.11 }
      ]
    },
    {
      name: "تاریخ و جغرافیا",
      taz: 6169,
      history: [6700, 6500, 6400, 6300, 6169],
      correct: 0,
      wrong: 0,
      blank: 20,
      percentWithNegative: 0,
      percentWithoutNegative: 0,
      vsAverage: "-23%",
      statusEmoji: "😞",
      tazIfNoWrong: 6169,
      rank: 7052,
      skillTree: [
        { id: "hist-1", name: "تاریخ شناسی", mastery: 0 },
        { id: "hist-2", name: "جهان در عصر باستان", mastery: 0 },
        { id: "hist-3", name: "ایران تا ساسانیان", mastery: 0 },
        { id: "hist-4", name: "جامعه و حکومت در ایران باستان", mastery: 0 },
        { id: "hist-5", name: "فرهنگ ایران باستان", mastery: 0 },
        { id: "hist-6", name: "جغرافیا چیست", mastery: 0 },
        { id: "hist-7", name: "جغرافیا و ناهمواریهای ایران", mastery: 0 },
        { id: "hist-8", name: "آب و هوای ایران", mastery: 0 },
        { id: "hist-9", name: "منابع آب ایران", mastery: 0 },
        { id: "hist-10", name: "جمعیت و تقسیمات کشوری", mastery: 0 },
        { id: "hist-11", name: "توانهای اقتصادی ایران", mastery: 0 }
      ]
    },
    {
      name: "فلسفه و منطق",
      taz: 10790,
      history: [10200, 10350, 10500, 10650, 10790],
      correct: 11,
      wrong: 3,
      blank: 6,
      percentWithNegative: 50,
      percentWithoutNegative: 55,
      vsAverage: "+34%",
      statusEmoji: "😍",
      tazIfNoWrong: 11222,
      rank: 178,
      skillTree: [
        { id: "phil-1", name: "منطق و معنا و مفهوم", mastery: -33.33 },
        { id: "phil-2", name: "منطق و معنا و مفهوم", mastery: 100 },
        { id: "phil-3", name: "تعریف", mastery: 0 },
        { id: "phil-4", name: "تعریف", mastery: 100 },
        { id: "phil-5", name: "استدلال استقرایی", mastery: 0 },
        { id: "phil-6", name: "قضیه حملی و احکام قضایا", mastery: 50 },
        { id: "phil-7", name: "قیاس اقترانی", mastery: 100 },
        { id: "phil-8", name: "قضیه شرطی و قیاس استثنایی", mastery: 100 },
        { id: "phil-9", name: "منطق کاربردی", mastery: 100 },
        { id: "phil-10", name: "تعریف و ریشه فلسفه", mastery: 50 },
        { id: "phil-11", name: "زندگی و فلسفه", mastery: 11.11 },
        { id: "phil-12", name: "امکان و ابزار شناخت", mastery: 100 },
        { id: "phil-13", name: "تاریخچه معرفت", mastery: 0 },
        { id: "phil-14", name: "انسان و فلسفه", mastery: 0 },
        { id: "phil-15", name: "اخلاق و فلسفه", mastery: 100 }
      ]
    },
    {
      name: "اقتصاد",
      taz: 8707,
      history: [8200, 8350, 8500, 8600, 8707],
      correct: 3,
      wrong: 2,
      blank: 5,
      percentWithNegative: 23.33,
      percentWithoutNegative: 30,
      vsAverage: "+10%",
      statusEmoji: "😐",
      tazIfNoWrong: 9298,
      rank: 995,
      skillTree: [
        { id: "econ-1", name: "اصول انتخاب در کسب و کار", mastery: 100 },
        { id: "econ-2", name: "بازار", mastery: 0 },
        { id: "econ-3", name: "دولت و اقتصاد و تجارت بین الملل", mastery: -16.67 },
        { id: "econ-4", name: "رکود و تورم", mastery: 0 },
        { id: "econ-5", name: "اقتصاد مقاومتی و رشد و پیشرفت", mastery: 0 },
        { id: "econ-6", name: "اقتصاد در خانواده", mastery: 33.33 }
      ]
    }
  ],
  achievements: ["Top 10%", "Perfect Subject", "Consistency", "Fast Learner", "Subject Master"],
  badgesUnlocked: ["🏅", "💯", "⚡", "🧠", "🎯"],
  visibleBadges: ["🏅", "💯", "⚡"],
  exams: [
    { name: "تابستان", taz: 9200, date: "1404/05/10" },
    { name: "شهریور", taz: 9500, date: "1404/06/15" },
    { name: "مهر", taz: 9918, date: "1404/07/03" },
    { name: "آبان", taz: 0, date: "1404/08/12" },
    { name: "آذر", taz: 0, date: "1404/09/20" },
    { name: "دی", taz: 0, date: "1404/10/15" },
    { name: "بهمن", taz: 0, date: "1404/11/10" },
    { name: "اسفند", taz: 0, date: "1404/12/05" },
    { name: "فروردین", taz: 0, date: "1405/01/15" },
    { name: "اردیبهشت", taz: 0, date: "1405/02/10" },
    { name: "خرداد", taz: 0, date: "1405/03/05" },
    { name: "کنکور", taz: 0, date: "1405/03/20" }
  ]
};

export const availableAvatars = ["🎓", "📚", "✏️", "🎯", "🏆", "⭐", "💡", "🚀", "🔥", "⚡", "💪", "🧠"];

export const allBadges = [
  { emoji: "🏅", name: "رتبه برتر", description: "در 10 درصد برتر کشور قرار گرفتید" },
  { emoji: "💯", name: "نمره کامل", description: "نمره کامل در یک درس" },
  { emoji: "⚡", name: "پیوستگی", description: "5 آزمون متوالی شرکت کرده‌اید" },
  { emoji: "🧠", name: "تسلط بر درس", description: "تسلط کامل بر یک درس" },
  { emoji: "🎯", name: "بهبود چشمگیر", description: "بهبود 1000 تراز نسبت به آزمون قبل" },
  { emoji: "🔥", name: "روند صعودی", description: "روند صعودی 3 آزمون" },
  { emoji: "🚀", name: "رشد سریع", description: "رشد سریع در یک ماه" },
  { emoji: "💎", name: "لیگ الماس", description: "ورود به لیگ الماس" },
  { emoji: "📈", name: "پیشرفت مداوم", description: "بهبود مستمر در 5 آزمون" },
  { emoji: "🎖️", name: "تلاش پیگیر", description: "شرکت در تمام آزمون‌ها" },
  { emoji: "💪", name: "نقطه قوت", description: "دارای 3 درس با تراز بالای 11000" },
  { emoji: "🌟", name: "درخشان", description: "میانگین تراز بالای 10000" },
  { emoji: "🏁", name: "آماده کنکور", description: "شرکت در همه آزمون‌ها تا کنکور" },
  { emoji: "📚", name: "مطالعه منظم", description: "بهبود در تمام دروس" },
  { emoji: "✨", name: "استعداد درخشان", description: "رتبه زیر 500 کشوری" }
];
