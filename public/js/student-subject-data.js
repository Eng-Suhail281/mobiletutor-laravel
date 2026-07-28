window.SD_SUBJECTS = {
  physics: {
    title: 'الفيزياء',
    image: 'images/student-dashboard/course-physics.jpg',
    teacher: { name: 'أ. وحيد نصار', avatar: 'images/shared/avatars/ahmed.jpg' },
    progress: 89,
    completedLessons: 32,
    examIn: '3 أيام',
    continue: {
      thumb: 'images/student-dashboard/course-physics.jpg',
      label: 'الدرس الحالي — الوحدة الثانية',
      title: 'المقاومة الكهربائية',
      lesson: '28 من 32',
      activity: 'آخر نشاط منذ يوم',
      duration: '40 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — الكهرباء الساكنة', lessons: 10, hours: 5, status: 'done' },
      { num: 2, title: 'الوحدة الثانية — المقاومة الكهربائية', lessons: 12, hours: 6, status: 'progress' },
      { num: 3, title: 'الوحدة الثالثة — التيار الكهربائي', lessons: 10, hours: 5, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص الوحدة الثانية', meta: 'PDF • 2.1 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'تمارين المقاومة', meta: 'PDF • 1.5 MB' },
      { icon: 'bi-file-earmark-slides', title: 'عرض الكهرباء الساكنة', meta: 'PPTX • 3.8 MB' },
      { icon: 'bi-people', title: 'دليل التجارب المعملية', meta: 'PDF • 860 KB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'اختبار فيزياء', text: 'اختبار بعد 3 أيام - راجع الوحدة الثانية وتأكد من فهم قانون أوم', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'حل تمارين المقاومة من الصفحات 30-38 تسليم الأربعاء الساعة 8 مساءً', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'جلسة مراجعة جماعية', text: 'مع أ. وحيد - الأسبوع القادم مراجعة شاملة قبل الاختبار الفصلي', btn: 'احجز مكانك' }
    ]
  },
  math: {
    title: 'الرياضيات',
    image: 'images/student-dashboard/course-math.jpg',
    teacher: { name: 'أ. محمد خالد', avatar: 'images/shared/avatars/mohammad.jpg' },
    progress: 65,
    completedLessons: 24,
    examIn: 'يومان',
    continue: {
      thumb: 'images/student-dashboard/course-physics.jpg',
      label: 'الدرس الحالي — الوحدة الثانية',
      title: 'التفاضل والتكامل',
      lesson: '23 من 36',
      activity: 'آخر نشاط منذ يومين',
      duration: '45 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — التفاضل', lessons: 12, hours: 6, status: 'done' },
      { num: 2, title: 'الوحدة الثانية — التكامل', lessons: 12, hours: 6, status: 'progress' },
      { num: 3, title: 'الوحدة الثالثة — التطبيقات', lessons: 12, hours: 6, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص الوحدة الثانية', meta: 'PDF • 2.4 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'تمارين التكامل', meta: 'PDF • 1.8 MB' },
      { icon: 'bi-file-earmark-slides', title: 'عرض الوحدة الأولى', meta: 'PPTX • 4.2 MB' },
      { icon: 'bi-people', title: 'دليل المراجعة الجماعية', meta: 'PDF • 980 KB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'اختبار رياضيات', text: 'اختبار رياضيات بعد يومين - راجع الوحدة الثالثة وتأكد من فهم التكامل', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'حل تمارين التكامل من الصفحات 45-52 تسليم الثلاثاء الساعة 8 مساءً', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'جلسة مراجعة جماعية', text: 'مع أ. محمد - الأسبوع القادم مراجعة شاملة قبل الاختبار الفصلي', btn: 'احجز مكانك' }
    ]
  },
  arabic: {
    title: 'اللغة العربية',
    image: 'images/student-dashboard/course-arabic.jpg',
    teacher: { name: 'أ. سارة أحمد', avatar: 'images/shared/avatars/sara.jpg' },
    progress: 58,
    completedLessons: 21,
    examIn: '5 أيام',
    continue: {
      thumb: 'images/student-dashboard/course-arabic.jpg',
      label: 'الدرس الحالي — الوحدة الثانية',
      title: 'الأسلوب الخبري و الإنشائي',
      lesson: '18 من 30',
      activity: 'آخر نشاط منذ 3 أيام',
      duration: '35 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — الأسلوب الخبري', lessons: 10, hours: 5, status: 'done' },
      { num: 2, title: 'الوحدة الثانية — الأسلوب الإنشائي', lessons: 10, hours: 5, status: 'progress' },
      { num: 3, title: 'الوحدة الثالثة — البلاغة', lessons: 10, hours: 5, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص الأسلوب الخبري', meta: 'PDF • 1.9 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'نماذج إنشائية', meta: 'PDF • 1.2 MB' },
      { icon: 'bi-file-earmark-slides', title: 'عرض الوحدة الأولى', meta: 'PPTX • 3.5 MB' },
      { icon: 'bi-journal-text', title: 'قواعد النحو', meta: 'PDF • 720 KB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'اختبار عربي', text: 'اختبار بعد 5 أيام - راجع الأسلوب الإنشائي ونماذج التعبير', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'اكتب فقرة إنشائية عن التكنولوجيا تسليم الخميس الساعة 8 مساءً', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'جلسة مراجعة جماعية', text: 'مع أ. سارة - مراجعة البلاغة قبل الاختبار الفصلي', btn: 'احجز مكانك' }
    ]
  },
  english: {
    title: 'التربية الانجليزية',
    image: 'images/student-dashboard/suggested-english.jpg',
    teacher: { name: 'أ. موسى أحمد', avatar: 'images/shared/avatars/mohammad.jpg' },
    progress: 89,
    completedLessons: 30,
    examIn: '4 أيام',
    continue: {
      thumb: 'images/student-dashboard/suggested-english.jpg',
      label: 'الدرس الحالي — الوحدة الأولى',
      title: 'Present Simple',
      lesson: '26 من 28',
      activity: 'آخر نشاط اليوم',
      duration: '30 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — Present Simple', lessons: 10, hours: 4, status: 'progress' },
      { num: 2, title: 'الوحدة الثانية — Past Simple', lessons: 10, hours: 4, status: 'locked' },
      { num: 3, title: 'الوحدة الثالثة — Future Tenses', lessons: 8, hours: 4, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'Present Simple Guide', meta: 'PDF • 1.6 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'Grammar Exercises', meta: 'PDF • 980 KB' },
      { icon: 'bi-file-earmark-slides', title: 'Unit 1 Slides', meta: 'PPTX • 2.8 MB' },
      { icon: 'bi-headphones', title: 'Listening Practice', meta: 'MP3 • 12 MB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'English Quiz', text: 'Quiz in 4 days - review Present Simple rules and common verbs', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'Complete pages 12-18 in the workbook by Tuesday 8 PM', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'Speaking Session', text: 'Group speaking practice with Mr. Musa next week', btn: 'احجز مكانك' }
    ]
  },
  chemistry: {
    title: 'الكيمياء',
    image: 'images/student-dashboard/suggested-chemistry.jpg',
    teacher: { name: 'أ. علي محمد', avatar: 'images/about/team-khaled.jpg' },
    progress: 20,
    completedLessons: 7,
    examIn: 'أسبوع',
    continue: {
      thumb: 'images/student-dashboard/suggested-chemistry.jpg',
      label: 'الدرس الحالي — الوحدة الأولى',
      title: 'التكافؤ الذري',
      lesson: '7 من 28',
      activity: 'آخر نشاط منذ 4 أيام',
      duration: '50 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — التكافؤ الذري', lessons: 10, hours: 5, status: 'progress' },
      { num: 2, title: 'الوحدة الثانية — الجدول الدوري', lessons: 10, hours: 5, status: 'locked' },
      { num: 3, title: 'الوحدة الثالثة — التفاعلات الكيميائية', lessons: 8, hours: 5, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص التكافؤ الذري', meta: 'PDF • 2.0 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'جدول العناصر', meta: 'PDF • 1.1 MB' },
      { icon: 'bi-file-earmark-slides', title: 'عرض الوحدة الأولى', meta: 'PPTX • 3.2 MB' },
      { icon: 'bi-people', title: 'دليل المختبر', meta: 'PDF • 740 KB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'اختبار كيمياء', text: 'اختبار بعد أسبوع - راجع التكافؤ الذري والمعادلات', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'حل تمارين التكافؤ من الصفحات 20-28 تسليم الجمعة', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'جلسة مراجعة جماعية', text: 'مع أ. علي - مراجعة الجدول الدوري قبل الاختبار', btn: 'احجز مكانك' }
    ]
  },
  islamic: {
    title: 'التربية الإسلامية',
    image: 'images/student-dashboard/suggested-islamic.jpg',
    teacher: { name: 'أ. أحمد علي', avatar: 'images/shared/avatars/ahmed.jpg' },
    progress: 45,
    completedLessons: 16,
    examIn: '6 أيام',
    continue: {
      thumb: 'images/student-dashboard/suggested-islamic.jpg',
      label: 'الدرس الحالي — الوحدة الأولى',
      title: 'سورة البقرة',
      lesson: '16 من 24',
      activity: 'آخر نشاط منذ يومين',
      duration: '25 دقيقة'
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — سورة البقرة', lessons: 8, hours: 4, status: 'progress' },
      { num: 2, title: 'الوحدة الثانية — سورة آل عمران', lessons: 8, hours: 4, status: 'locked' },
      { num: 3, title: 'الوحدة الثالثة — الفقه', lessons: 8, hours: 4, status: 'locked' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'تفسير سورة البقرة', meta: 'PDF • 2.3 MB' },
      { icon: 'bi-file-earmark-pdf', title: 'أحكام التجويد', meta: 'PDF • 1.4 MB' },
      { icon: 'bi-file-earmark-slides', title: 'عرض الوحدة الأولى', meta: 'PPTX • 2.6 MB' },
      { icon: 'bi-journal-text', title: 'ملخص الفقه', meta: 'PDF • 650 KB' }
    ],
    attention: [
      { icon: 'bi-file-earmark-text', title: 'اختبار إسلامية', text: 'اختبار بعد 6 أيام - راجع سورة البقرة وأحكامها', btn: 'ابدأ المراجعة' },
      { icon: 'bi-clipboard-check', title: 'واجب مستحق غداً', text: 'حفظ الآيات 1-10 من سورة البقرة مع التفسير', btn: 'فتح الواجب' },
      { icon: 'bi-people', title: 'حلقة قرآن جماعية', text: 'مع أ. أحمد - مراجعة التجويد الأسبوع القادم', btn: 'احجز مكانك' }
    ]
  }
};
