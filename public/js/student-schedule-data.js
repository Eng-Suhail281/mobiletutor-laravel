window.SD_SCHEDULE = {
  defaultDay: 'mon',
  days: [
    { id: 'sat', label: 'السبت', title: 'حصص اليوم — السبت 13 مايو 2025', count: 0, next: '—' },
    { id: 'sun', label: 'الأحد', title: 'حصص اليوم — الأحد 14 مايو 2025', count: 0, next: '—' },
    { id: 'mon', label: 'الاثنين', title: 'حصص اليوم — الاثنين 15 مايو 2025', count: 3, next: 'رياضيات' },
    { id: 'tue', label: 'الثلاثاء', title: 'حصص اليوم — الثلاثاء 16 مايو 2025', count: 2, next: 'فيزياء' },
    { id: 'wed', label: 'الأربعاء', title: 'حصص اليوم — الأربعاء 17 مايو 2025', count: 4, next: 'كيمياء' },
    { id: 'thu', label: 'الخميس', title: 'حصص اليوم — الخميس 18 مايو 2025', count: 1, next: 'لغة عربية' }
  ],
  classes: {
    sat: [],
    sun: [],
    mon: [
      { subject: 'رياضيات', teacher: 'أ. أحمد حمد', time: '10:00 - 11:00', period: 'صباحاً', duration: '60', btn: 'انضم الآن' },
      { subject: 'فيزياء', teacher: 'أ. وحيد نصار', time: '12:30 - 02:30', period: 'مساءً', duration: '120', btn: 'انضم الآن' },
      { subject: 'لغة عربية', teacher: 'أ. سارة محمود', time: '03:00 - 04:00', period: 'مساءً', duration: '60', btn: 'انضم الآن' }
    ],
    tue: [
      { subject: 'كيمياء', teacher: 'أ. ليلى عمر', time: '09:00 - 10:30', period: 'صباحاً', duration: '90', btn: 'انضم الآن' },
      { subject: 'فيزياء', teacher: 'أ. وحيد نصار', time: '11:00 - 12:00', period: 'صباحاً', duration: '60', btn: 'انضم الآن' }
    ],
    wed: [
      { subject: 'رياضيات', teacher: 'أ. محمد خالد', time: '08:30 - 09:30', period: 'صباحاً', duration: '60', btn: 'انضم الآن' },
      { subject: 'لغة إنجليزية', teacher: 'أ. رنا حسن', time: '10:00 - 11:00', period: 'صباحاً', duration: '60', btn: 'انضم الآن' },
      { subject: 'كيمياء', teacher: 'أ. ليلى عمر', time: '12:00 - 01:00', period: 'مساءً', duration: '60', btn: 'انضم الآن' },
      { subject: 'تربية إسلامية', teacher: 'أ. خالد يوسف', time: '02:00 - 03:00', period: 'مساءً', duration: '60', btn: 'انضم الآن' }
    ],
    thu: [
      { subject: 'لغة عربية', teacher: 'أ. سارة محمود', time: '10:00 - 11:00', period: 'صباحاً', duration: '60', btn: 'انضم الآن' }
    ]
  }
};
