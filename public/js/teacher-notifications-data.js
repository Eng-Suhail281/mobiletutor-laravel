window.SD_NOTIFICATIONS = {
  items: [
    {
      id: 'tn1',
      category: 'students',
      group: 'today',
      iconType: 'user',
      avatar: 'images/courses/details/student-ahmed.jpg',
      badgeIcon: 'person-plus',
      time: 'منذ دقيقتين',
      title: 'سيف العامري',
      desc: 'قام بالتسجيل في دورة «أساسيات الفيزياء المتقدمة».',
      unread: true,
      dropdown: true
    },
    {
      id: 'tn2',
      category: 'assignments',
      group: 'today',
      iconType: 'system',
      icon: 'clipboard-check',
      time: 'منذ ساعة',
      title: 'تسليم تكليف جديد',
      desc: 'أرسل 15 طالباً حلول اختبار «الميكانيكا الحيوية — الجزء الأول».',
      unread: true,
      dropdown: true
    },
    {
      id: 'tn3',
      category: 'messages',
      group: 'today',
      iconType: 'user',
      avatar: 'images/shared/avatars/sara.jpg',
      badgeIcon: 'envelope-fill',
      time: 'منذ 3 ساعات',
      title: 'سارة محمود',
      desc: '«أستاذ أحمد، هل يمكنني الحصول على مراجعة إضافية لدرس اليوم؟»',
      unread: true,
      dropdown: true
    },
    {
      id: 'tn4',
      category: 'system',
      group: 'yesterday',
      iconType: 'system',
      icon: 'clock-history',
      time: 'أمس',
      title: 'تحديث النظام',
      desc: 'تم إضافة ميزات جديدة لتقارير أداء الطلاب السنوية.',
      unread: false,
      dropdown: true
    },
    {
      id: 'tn5',
      category: 'assignments',
      group: 'today',
      iconType: 'user',
      avatar: 'images/shared/avatars/sara.jpg',
      time: 'منذ 5 دقائق',
      title: 'تسليم واجب جديد: سارة السعيد',
      desc: 'قامت سارة بتسليم واجب العروض «بحر الكامل» للمراجعة والتقييم النهائي.',
      action: { label: 'عرض الواجب', href: 'teacher-assignments.html' },
      secondaryAction: { label: 'تجاهل' },
      unread: true,
      dropdown: false
    },
    {
      id: 'tn6',
      category: 'messages',
      group: 'today',
      iconType: 'system',
      icon: 'envelope',
      time: 'منذ ساعتين',
      title: 'رسالة جديدة من إدارة المنصة',
      desc: 'تذكير: سيتم إجراء صيانة دورية للخوادم غداً في تمام الساعة 3 فجراً.',
      action: { label: 'رد على الرسالة', href: 'teacher-messages.html' },
      secondaryAction: { label: 'تجاهل' },
      unread: true,
      dropdown: false
    },
    {
      id: 'tn7',
      category: 'exams',
      group: 'yesterday',
      iconType: 'user',
      avatar: 'images/courses/details/student-sara.jpg',
      time: 'أمس، 8:45 م',
      title: 'إتمام اختبار: سارة المنصور',
      desc: 'أكملت سارة اختبار «البلاغة المتقدمة — الفصل الأول» بنسبة نجاح 95%.',
      action: { label: 'عرض النتائج', href: 'teacher-exams.html' },
      unread: false,
      dropdown: false
    }
  ]
};
