var coursesData = {
  ai: {
    title: 'أساسيات الذكاء الاصطناعي وتطبيقاته العملية',
    desc: 'تعلم المفاهيم الأساسية للذكاء الاصطناعي من الصفر مع أمثلة وتطبيقات عملية في مجالات مختلفة.',
    descHtml: 'تعلم المفاهيم الأساسية للذكاء الاصطناعي من الصفر مع أمثلة وتطبيقات عملية في<br>مجالات مختلفة.',
    image: 'images/courses/details/detail-ai-hero.jpg',
    hours: '8 ساعات', lessons: '32 درس', level: 'مبتدئ', students: '50 طالب',
    price: 45, oldPrice: 90,
    highlights: [
      'فهم أساسيات الذكاء الاصطناعي',
      'تطبيق عملي ومشاريع تدريبية',
      'مشاريع تدريبية احترافية'
    ],
    instructor: { name: 'أ. محمد أحمد', title: 'مهندس ذكاء اصطناعي', img: 'images/courses/details/instructor-mohammad.jpg',
      bio: 'خبير في مجال الذكاء الاصطناعي وتعلم الآلة مع أكثر من 8 سنوات خبرة في تطوير الحلول الذكية وتدريب الطلاب.',
      bioHtml: 'مهندس ذكاء اصطناعي بخبرة أكثر من 8 سنوات في تطوير نماذج الذكاء الاصطناعي وحلول<br>التعلم الالي, عمل مع شركات تقنية رائدة ومساعد العديد من الطلاب على دخول مجال<br>الذكاء الاصطناعي .' }
  },
  cybersecurity: {
    title: 'مقدمة في الأمن السيبراني وحماية البيانات',
    desc: 'تعلّم أساسيات حماية الشبكات والأنظمة واكتشف أهم التهديدات وطرق الدفاع عنها.',
    image: 'images/courses/course-cybersecurity.png',
    hours: '5 ساعات', lessons: '28 درس', level: 'مبتدئ', students: '38 طالب',
    price: 50, oldPrice: 75,
    highlights: ['أساسيات حماية الشبكات', 'اكتشاف التهديدات وطرق الدفاع', 'تطبيقات عملية في أمن المعلومات'],
    instructor: { name: 'أ. محمد أحمد', title: 'خبير أمن سيبراني', img: 'images/courses/details/instructor-mohammad.jpg',
      bio: 'متخصص في أمن المعلومات مع خبرة في تأمين البنية التحتية للشبكات والتدريب الأكاديمي.' }
  },
  react: {
    title: 'تطوير تطبيقات الويب باستخدام React',
    desc: 'ابنِ تطبيقات ويب حديثة وتفاعلية باستخدام React من الصفر حتى المشاريع العملية.',
    image: 'images/courses/course-react.jpg',
    hours: '5 ساعات', lessons: '28 درس', level: 'مبتدئ', students: '62 طالب',
    price: 50, oldPrice: 80,
    highlights: ['بناء واجهات تفاعلية', 'مشاريع React عملية', 'أفضل ممارسات التطوير'],
    instructor: { name: 'أحمد ناصر', title: 'مطور ويب', img: 'images/courses/details/instructor-khaled.png',
      bio: 'مطور Full Stack مع خبرة واسعة في بناء تطبيقات React للشركات الناشئة.' }
  },
  'ui-design': {
    title: 'تصميم واجهات المستخدم UI/UX',
    desc: 'تعلّم مبادئ التصميم وبناء تجارب مستخدم احترافية لمنتجات رقمية ناجحة.',
    image: 'images/courses/course-ui-design.jpg',
    hours: '10 ساعات', lessons: '40 درس', level: 'مبتدئ', students: '44 طالب',
    price: 45, oldPrice: 70,
    highlights: ['مبادئ UI/UX', 'تصميم تجارب مستخدم', 'مشاريع تصميم احترافية'],
    instructor: { name: 'أ. نوره نصار', title: 'مصممة UI/UX', img: 'images/courses/details/instructor-noura.jpg',
      bio: 'مصممة واجهات مع خبرة في تصميم منتجات تعليمية وتطبيقات موبايل.' }
  },
  photoshop: {
    title: 'احتراف Adobe Photoshop من الصفر',
    desc: 'أتقن أدوات فوتوشوب الأساسية والمتقدمة لإنتاج تصاميم احترافية.',
    image: 'images/courses/course-photoshop.jpg',
    hours: '7 ساعات', lessons: '35 درس', level: 'متوسط', students: '29 طالب',
    price: 42, oldPrice: 65,
    highlights: ['أدوات Photoshop الأساسية', 'تقنيات تحرير متقدمة', 'مشاريع تصميم عملية'],
    instructor: { name: 'أ. نوره نصار', title: 'مصممة جرافيك', img: 'images/courses/details/instructor-noura.jpg',
      bio: 'متخصصة في التصميم الجرافيكي والتحرير الاحترافي للصور.' }
  },
  analytics: {
    title: 'علم البيانات وتحليل البيانات',
    desc: 'اكتشف كيفية جمع وتحليل البيانات واتخاذ قرارات مبنية على الأرقام.',
    image: 'images/courses/course-analytics.jpg',
    hours: '12 ساعة', lessons: '52 درس', level: 'متقدم', students: '21 طالب',
    price: 40, oldPrice: 60,
    highlights: ['جمع وتحليل البيانات', 'اتخاذ قرارات مبنية على الأرقام', 'أدوات تحليل حديثة'],
    instructor: { name: 'محمد ربيع', title: 'محلل بيانات', img: 'images/courses/details/instructor-mohammad.jpg',
      bio: 'محلل بيانات مع خبرة في Google Analytics وأدوات ذكاء الأعمال.' }
  },
  flutter: {
    title: 'برمجة تطبيقات الموبايل بـ Flutter',
    desc: 'ابنِ تطبيقات أندرويد و iOS بتقنية Flutter واحدة من الكود.',
    image: 'images/courses/course-flutter.jpg',
    hours: '9 ساعات', lessons: '36 درس', level: 'متوسط', students: '33 طالب',
    price: 55, oldPrice: 85,
    highlights: ['بناء تطبيقات iOS و Android', 'مشاريع Flutter عملية', 'نشر التطبيقات على المتاجر'],
    instructor: { name: 'أ. خالد عمر', title: 'مطور موبايل', img: 'images/courses/details/instructor-khaled.png',
      bio: 'مطور تطبيقات موبايل مع مشاريع منشورة على المتاجر الرسمية.' }
  },
  pmp: {
    title: 'إدارة المشاريع الاحترافية PMP',
    desc: 'تعلّم منهجيات إدارة المشاريع وأدوات التخطيط والتنفيذ الاحترافية.',
    image: 'images/courses/course-business.jpg',
    hours: '6 ساعات', lessons: '32 درس', level: 'متقدم', students: '27 طالب',
    price: 45, oldPrice: 70,
    highlights: ['منهجيات إدارة المشاريع', 'التخطيط والتنفيذ', 'أدوات PMP احترافية'],
    instructor: { name: 'محمد ربيع', title: 'مدير مشاريع', img: 'images/courses/details/instructor-mohammad.jpg',
      bio: 'مدير مشاريع معتمد مع خبرة في قيادة فرق العمل في قطاعات متعددة.' }
  },
  workshop: {
    title: 'ورشة عمل: بناء Portfolio احترافي',
    desc: 'ورشة تفاعلية لبناء ملف أعمال يعرض مهاراتك بشكل احترافي.',
    image: 'images/home/teacher-cta.jpg',
    hours: '2 ساعة', lessons: '8 دروس', level: 'مبتدئ', students: '95 طالب',
    price: 0, oldPrice: 0,
    highlights: ['بناء Portfolio احترافي', 'إبراز مهاراتك', 'جاهزية لسوق العمل'],
    instructor: { name: 'سارة أبو غزالة', title: 'مرشدة مهنية', img: 'images/courses/details/instructor-noura.jpg',
      bio: 'مرشدة مهنية تساعد الطلاب على إبراز مهاراتهم في سوق العمل.' }
  },
  marketing: {
    title: 'التسويق الرقمي للمبتدئين',
    desc: 'تعلّم أساسيات التسويق عبر الإنترنت ووسائل التواصل الاجتماعي.',
    image: 'images/courses/course-marketing.jpg',
    hours: '4 ساعات', lessons: '20 درس', level: 'مبتدئ', students: '48 طالب',
    price: 30, oldPrice: 50,
    highlights: ['أساسيات التسويق الرقمي', 'إدارة حملات إعلانية', 'تحليل أداء الحملات'],
    instructor: { name: 'ليان أحمد', title: 'مسوقة رقمية', img: 'images/courses/details/instructor-noura.jpg',
      bio: 'متخصصة في التسويق الرقمي وبناء الحملات الإعلانية الناجحة.' }
  }
};
