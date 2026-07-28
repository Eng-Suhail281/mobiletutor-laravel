window.SD_LESSONS = {
  math: {
    title: 'التفاضل والتكامل',
    subtitle: 'الوحدة الثانية — الدرس الثالث',
    desc: 'تعرف على أساسيات التفاضل والتكامل وتطبيقاتهما العملية في حل المسائل الرياضية وفهم التغيرات المستمرة.',
    lessonProgress: '23 من 36',
    activity: 'آخر نشاط منذ يومين',
    duration: '45 دقيقة',
    points: [
      { num: 1, title: 'مفهوم التفاضل', text: 'التفاضل هو عملية إيجاد معدل التغير اللحظي لدالة ما. نستخدم المشتقة لقياس سرعة تغير الكميات في لحظة معينة.' },
      { num: 2, title: 'قواعد التفاضل', text: 'هناك قواعد أساسية مثل مشتقة الجمع والطرح والضرب والقسمة، بالإضافة إلى قاعدة السلسلة التي تُستخدم مع الدوال المركبة.' },
      { num: 3, title: 'التطبيقات العملية', text: 'نطبّق التفاضل في إيجاد النقاط الحرجة، تحديد أقصى وأدنى القيم، ورسم المنحنيات بدقة.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص PDF', meta: 'ملخص الدرس الكامل • 2.4 MB' },
      { icon: 'bi-file-earmark-text', title: 'أوراق عمل', meta: 'تمارين تطبيقية • 1.2 MB' },
      { icon: 'bi-patch-question', title: 'بنك أسئلة', meta: '30 سؤالاً متنوعاً • PDF' },
      { icon: 'bi-play-circle', title: 'فيديو الشرح', meta: 'شرح مرئي • 18 دقيقة' }
    ],
    quiz: {
      question: 'ما المقصود بالمشتقة الأولى لدالة ما؟',
      current: 1,
      total: 3,
      options: [
        'مساحة المنطقة تحت منحنى الدالة',
        'معدل التغير اللحظي للدالة عند نقطة معينة',
        'قيمة الدالة عند نقطة التقاطع مع المحور',
        'مجموع قيم الدالة في نطاق معين'
      ],
      correct: 1
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — التفاضل', status: 'done' },
      { num: 2, title: 'الوحدة الثانية — التكامل', status: 'active', expanded: true, lessons: [
        { num: 1, title: 'مقدمة في التكامل', status: 'done' },
        { num: 2, title: 'التكامل المحدود', status: 'done' },
        { num: 3, title: 'التفاضل والتكامل', status: 'active' }
      ]},
      { num: 3, title: 'الوحدة الثالثة — التطبيقات', status: 'locked' }
    ]
  },
  physics: {
    title: 'المقاومة الكهربائية',
    subtitle: 'الوحدة الثانية — الدرس الخامس',
    desc: 'افهم مفهوم المقاومة الكهربائية وقانون أوم وتطبيقاته في الدوائر البسيطة.',
    lessonProgress: '28 من 32',
    activity: 'آخر نشاط منذ يوم',
    duration: '40 دقيقة',
    points: [
      { num: 1, title: 'تعريف المقاومة', text: 'المقاومة الكهربائية هي مقاومة مرور التيار في موصل، وتُقاس بالأوم (Ω).' },
      { num: 2, title: 'قانون أوم', text: 'الجهد = التيار × المقاومة (V = I × R). هذا القانون أساسي في تحليل الدوائر الكهربائية.' },
      { num: 3, title: 'التوصيل على التوالي والتوازي', text: 'في التوالي تتساوى التيارات وفي التوازي تتساوى الجهود، وتختلف المقاومة الكلية.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص PDF', meta: 'ملخص الدرس الكامل • 2.1 MB' },
      { icon: 'bi-file-earmark-text', title: 'تمارين المقاومة', meta: '20 تمريناً • 980 KB' },
      { icon: 'bi-patch-question', title: 'بنك أسئلة', meta: '25 سؤالاً • PDF' },
      { icon: 'bi-play-circle', title: 'تجربة معملية', meta: 'فيديو توضيحي • 12 دقيقة' }
    ],
    quiz: {
      question: 'ما وحدة قياس المقاومة الكهربائية؟',
      current: 1,
      total: 3,
      options: ['الأوم (Ω)', 'الفولت (V)', 'الأمبير (A)', 'الوatt (W)']
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — الكهرباء الساكنة', status: 'done' },
      { num: 2, title: 'الوحدة الثانية — المقاومة الكهربائية', status: 'active', expanded: true, lessons: [
        { num: 4, title: 'قانون أوم', status: 'done' },
        { num: 5, title: 'المقاومة الكهربائية', status: 'active' }
      ]},
      { num: 3, title: 'الوحدة الثالثة — التيار الكهربائي', status: 'locked' }
    ]
  },
  arabic: {
    title: 'الأسلوب الإنشائي — الوصف',
    subtitle: 'الوحدة الثانية — الدرس الرابع',
    desc: 'تعلّم كيفية كتابة فقرة وصفية غنية بالتفاصيل الحسية والبلاغية.',
    lessonProgress: '14 من 30',
    activity: 'آخر نشاط منذ 3 أيام',
    duration: '35 دقيقة',
    points: [
      { num: 1, title: 'مفهوم الوصف', text: 'الوصف هو إبراز صفات الشيء أو الشخص بطريقة تجعل القارئ يرى الصورة في ذهنه.' },
      { num: 2, title: 'أنواع الوصف', text: 'يوجد الوصف الموضوعي الذي يعتمد على الحقائق، والوصف الذاتي الذي يعكس مشاعر الكاتب.' },
      { num: 3, title: 'أدوات الوصف', text: 'استخدم الصفات الدقيقة والاستعارات والتشبيهات لإثراء النص الوصفي.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص PDF', meta: 'ملخص الدرس • 1.8 MB' },
      { icon: 'bi-file-earmark-text', title: 'نماذج وصفية', meta: '5 نماذج • 720 KB' },
      { icon: 'bi-patch-question', title: 'أسئلة تقييم', meta: '15 سؤالاً • PDF' },
      { icon: 'bi-journal-text', title: 'قواعد البلاغة', meta: 'مرجع سريع • PDF' }
    ],
    quiz: {
      question: 'ما الهدف الأساسي من الأسلوب الوصفي؟',
      current: 1,
      total: 3,
      options: [
        'إبراز صفات الشيء وتمثيله في ذهن القارئ',
        'إقناع القارئ برأي معين',
        'سرد أحداث متتابعة',
        'إعطاء أوامر وتعليمات'
      ]
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — الأسلوب الخبري', status: 'done' },
      { num: 2, title: 'الوحدة الثانية — الأسلوب الإنشائي', status: 'active', expanded: true, lessons: [
        { num: 3, title: 'الأسلوب الإقناعي', status: 'done' },
        { num: 4, title: 'الأسلوب الوصفي', status: 'active' }
      ]},
      { num: 3, title: 'الوحدة الثالثة — البلاغة', status: 'locked' }
    ]
  },
  english: {
    title: 'Present Simple Tense',
    subtitle: 'Unit 1 — Lesson 2',
    desc: 'Learn how to use the present simple tense for habits, facts, and routines.',
    lessonProgress: '8 من 28',
    activity: 'Last activity 4 days ago',
    duration: '30 minutes',
    points: [
      { num: 1, title: 'Form', text: 'Use the base form of the verb for I/you/we/they, and add -s or -es for he/she/it.' },
      { num: 2, title: 'Usage', text: 'Present simple is used for daily routines, permanent situations, and general truths.' },
      { num: 3, title: 'Questions & Negatives', text: 'Use do/does for questions and don\'t/doesn\'t for negative sentences.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'Grammar Guide', meta: 'Full lesson summary • 1.6 MB' },
      { icon: 'bi-file-earmark-text', title: 'Worksheets', meta: 'Practice exercises • 890 KB' },
      { icon: 'bi-patch-question', title: 'Quiz Bank', meta: '20 questions • PDF' },
      { icon: 'bi-headphones', title: 'Listening', meta: 'Audio practice • 8 min' }
    ],
    quiz: {
      question: 'Which sentence uses present simple correctly?',
      current: 1,
      total: 3,
      options: [
        'She goes to school every day.',
        'She going to school every day.',
        'She go to school every day.',
        'She is go to school every day.'
      ]
    },
    units: [
      { num: 1, title: 'Unit 1 — Present Simple', status: 'active', expanded: true, lessons: [
        { num: 1, title: 'Introduction', status: 'done' },
        { num: 2, title: 'Present Simple Tense', status: 'active' }
      ]},
      { num: 2, title: 'Unit 2 — Past Simple', status: 'locked' },
      { num: 3, title: 'Unit 3 — Future Tenses', status: 'locked' }
    ]
  },
  chemistry: {
    title: 'التكافؤ الذري',
    subtitle: 'الوحدة الأولى — الدرس الثاني',
    desc: 'افهم مفهوم التكافؤ الذري وكيفية حساب كتلة المادة في التفاعلات الكيميائية.',
    lessonProgress: '6 من 28',
    activity: 'آخر نشاط منذ 5 أيام',
    duration: '38 دقيقة',
    points: [
      { num: 1, title: 'تعريف التكافؤ', text: 'التكافؤ الذري هو كمية المادة التي تحتوي على عدد أفوجادرو من الجسيمات (6.022 × 10²³).' },
      { num: 2, title: 'الكتلة المولية', text: 'الكتلة المولية تساوي كتلة واحد مول من المادة وتُقاس بالغرام/مول.' },
      { num: 3, title: 'الحسابات', text: 'نستخدم العلاقة: عدد المoles = الكتلة ÷ الكتلة المولية.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص PDF', meta: 'ملخص الدرس • 2.0 MB' },
      { icon: 'bi-file-earmark-text', title: 'تمارين محلولة', meta: '15 تمريناً • 1.1 MB' },
      { icon: 'bi-patch-question', title: 'بنك أسئلة', meta: '20 سؤالاً • PDF' },
      { icon: 'bi-table', title: 'جدول العناصر', meta: 'مرجع سريع • PDF' }
    ],
    quiz: {
      question: 'كم جسيماً يحتوي المول الواحد؟',
      current: 1,
      total: 3,
      options: [
        '6.022 × 10²³ جسيماً',
        '6.022 × 10² جسيماً',
        '1000 جسيم',
        '22.4 لتر'
      ]
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — التكافؤ الذري', status: 'active', expanded: true, lessons: [
        { num: 1, title: 'المول والتكافؤ', status: 'done' },
        { num: 2, title: 'التكافؤ الذري', status: 'active' }
      ]},
      { num: 2, title: 'الوحدة الثانية — الجدول الدوري', status: 'locked' },
      { num: 3, title: 'الوحدة الثالثة — التفاعلات', status: 'locked' }
    ]
  },
  islamic: {
    title: 'تفسير آيات من سورة البقرة',
    subtitle: 'الوحدة الأولى — الدرس الثالث',
    desc: 'دراسة معاني آيات سورة البقرة مع التركيز على الدروس والعبر المستفادة.',
    lessonProgress: '5 من 24',
    activity: 'آخر نشاط منذ أسبوع',
    duration: '42 دقيقة',
    points: [
      { num: 1, title: 'سياق الآيات', text: 'تتناول الآيات موضوعات الإيمان والتقوى وأحكام العبادات في بداية السورة.' },
      { num: 2, title: 'المفردات', text: 'نشرح المفردات الصعبة ونوضح معانيها في سياقها القرآني.' },
      { num: 3, title: 'الدروس المستفادة', text: 'نستخرج الدروس العملية من الآيات ونربطها بحياتنا اليومية.' }
    ],
    files: [
      { icon: 'bi-file-earmark-pdf', title: 'ملخص PDF', meta: 'ملخص الدرس • 2.3 MB' },
      { icon: 'bi-file-earmark-text', title: 'أحكام التجويد', meta: 'قواعد التلاوة • 1.4 MB' },
      { icon: 'bi-patch-question', title: 'أسئلة مراجعة', meta: '12 سؤالاً • PDF' },
      { icon: 'bi-journal-text', title: 'تفسير مختصر', meta: 'مرجع إضافي • PDF' }
    ],
    quiz: {
      question: 'ما اسم السورة التي ندرسها في هذه الوحدة؟',
      current: 1,
      total: 3,
      options: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء', 'سورة المائدة']
    },
    units: [
      { num: 1, title: 'الوحدة الأولى — سورة البقرة', status: 'active', expanded: true, lessons: [
        { num: 2, title: 'آيات الإيمان', status: 'done' },
        { num: 3, title: 'تفسير آيات', status: 'active' }
      ]},
      { num: 2, title: 'الوحدة الثانية — سورة آل عمران', status: 'locked' },
      { num: 3, title: 'الوحدة الثالثة — الفقه', status: 'locked' }
    ]
  }
};
