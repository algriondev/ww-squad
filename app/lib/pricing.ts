// Standard membership packages
export const standardRates = [
  { name: "Day Pass", price: "1,000", validity: "Same day" },
  { name: "Weekly", price: "2,500", validity: "7 days" },
  { name: "Monthly", price: "6,000", validity: "30 days" },
  {
    name: "3 Months",
    price: "17,000",
    validity: "90 days",
    badge: "BEST VALUE",
  },
  { name: "6 Months", price: "32,000", validity: "180 days" },
  { name: "Annual", price: "59,000", validity: "365 days" },
  { name: "Annual (Couples)", price: "105,000", validity: "365 days" },
];

// Student packages
export const studentRates = [
  {
    name: "Peak (All Hours)",
    monthly: "5,000",
    firstMonth: "2,500",
    note: "Valid student ID required",
  },
  {
    name: "Peak Direct Debit",
    monthly: "4,500",
    firstMonth: null,
    note: "Min. 12 months commitment",
  },
  {
    name: "Off-Peak (8am–4:30pm)",
    monthly: "3,000",
    firstMonth: "1,500",
    note: "Weekdays only",
  },
];

// Cold plunge rates
export const coldPlungeRates = [
  { sessions: "Single Session", member: "1,500", nonMember: "2,000" },
  { sessions: "4-Session Pass", member: "5,500", nonMember: "6,500" },
  { sessions: "8-Session Pass", member: "10,000", nonMember: "12,000" },
  { sessions: "12-Session Pass", member: "13,500", nonMember: "16,000" },
];

// Class schedule
export const classSchedule = [
  {
    time: "5:45 AM – 6:30 AM",
    mon: { name: "BODYSCULPT", coach: "IGGY" },
    tue: { name: "KICKBOXING", coach: "EVANS" },
    wed: { name: "BOXING", coach: "HASSAN" },
    fri: { name: "INSANITY", coach: "HASSAN" },
  },
  {
    time: "5:50 AM – 6:35 AM",
    tue: { name: "SPIN", coach: "LINNET" },
    thu: { name: "TAEBO-CHOMA & TONING", coach: "ALVIN" },
  },
  // Add rest of schedule from your existing data
];

// Membership levels for join flow
export const membershipLevels = [
  {
    id: "monthly",
    label: "MONTHLY",
    sub: "Flexibility",
    price: 6000,
    perks: ["All Classes", "Open Gym Access", "5 Classes/Day"],
  },
  {
    id: "3month",
    label: "3-MONTH",
    sub: "Best Value",
    price: 17000,
    perks: ["Everything in Monthly", "1 Free BMI Session", "Priority Booking"],
    popular: true,
  },
  {
    id: "6month",
    label: "6-MONTH",
    sub: "Committed",
    price: 32000,
    perks: ["Everything in 3-Month", "2 Free BMI Sessions", "Guest Passes"],
  },
  {
    id: "annual",
    label: "ANNUAL",
    sub: "Full Access",
    price: 59000,
    perks: ["Everything in 6-Month", "3 Free BMI Sessions", "VIP Events"],
  },
];

// Student levels
export const studentLevels = [
  {
    id: "student-peak",
    label: "STUDENT PEAK",
    sub: "All Hours Access",
    price: 5000,
    firstMonth: 2500,
    perks: ["Unlimited Classes", "Open Gym 24/7", "Valid Student ID Required"],
  },
  {
    id: "student-peak-dd",
    label: "STUDENT PEAK DD",
    sub: "Direct Debit",
    price: 4500,
    perks: ["Same as Peak", "12-Month Commitment", "Auto-Renewal"],
  },
  {
    id: "student-offpeak",
    label: "STUDENT OFF-PEAK",
    sub: "8:00am – 4:30pm",
    price: 3000,
    firstMonth: 1500,
    perks: ["Off-Peak Hours Only", "All Classes", "Valid Student ID Required"],
  },
];

// Add-ons
export const addonOptions = [
  {
    id: "coldplunge-single",
    label: "Cold Plunge (Single Session)",
    price: 1500,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "coldplunge-4",
    label: "Cold Plunge (4 Sessions)",
    price: 5500,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "coldplunge-8",
    label: "Cold Plunge (8 Sessions)",
    price: 10000,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "physio",
    label: "Physiotherapy Session",
    price: 3500,
    icon: "🩺",
    category: "wellness",
  },
  {
    id: "bmi",
    label: "BMI Analysis",
    price: 500,
    icon: "📊",
    category: "wellness",
  },
];