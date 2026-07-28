window.SD_NOTIFICATIONS = {
  items: [
    {
      id: 'sn1',
      category: 'assignments',
      group: 'today',
      iconType: 'system',
      icon: 'clipboard-check',
      time: 'منذ ساعة',
      title: 'واجب جديد',
      desc: 'تم إرسال واجب جديد من معلم اللغة العربية.',
      unread: true,
      dropdown: true
    },
    {
      id: 'sn2',
      category: 'messages',
      group: 'today',
      iconType: 'user',
      avatar: 'images/shared/avatars/ahmed.jpg',
      badgeIcon: 'envelope-fill',
      time: 'منذ 3 ساعات',
      title: 'أ. أحمد المصري',
      desc: '«سوف نتناقش في هذا الموضوع في الحصة القادمة»',
      unread: true,
      dropdown: true
    },
    {
      id: 'sn3',
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
      id: 'sn4',
      category: 'assignments',
      group: 'today',
      iconType: 'system',
      icon: 'clipboard-check',
      time: 'منذ 5 دقائق',
      title: 'تم رفع واجب جديد في مادة الرياضيات',
      desc: 'واجب التفاضل والتكامل — موعد التسليم 20 مايو 2025.',
      action: { label: 'عرض الواجب', href: 'student-assignment.html?id=math' },
      secondaryAction: { label: 'تجاهل' },
      unread: true,
      dropdown: false
    },
    {
      id: 'sn5',
      category: 'messages',
      group: 'today',
      iconType: 'system',
      icon: 'envelope',
      time: 'منذ ساعتين',
      title: 'رسالة جديدة من إدارة المنصة',
      desc: 'تذكير: سيتم إجراء صيانة دورية للخوادم غداً في تمام الساعة 3 فجراً.',
      action: { label: 'رد على الرسالة', href: 'student-messages.html?id=platform' },
      secondaryAction: { label: 'تجاهل' },
      unread: true,
      dropdown: false
    },
    {
      id: 'sn6',
      category: 'exams',
      group: 'yesterday',
      iconType: 'user',
      avatar: 'images/courses/details/instructor-khaled.png',
      time: 'أمس، 8:45 م',
      title: 'نتيجة اختبار الفيزياء',
      desc: 'حصلت على 92% — أداء ممتاز، استمر!',
      action: { label: 'عرض النتائج', href: 'student-exams.html?id=physics&view=result' },
      unread: false,
      dropdown: false
    }
  ]
};
