import type { CriterionScore, EvaluationResult, SamplePoem } from '../types/poetry.ts';

/**
 * Calculates the exact algebraic sum of the six criteria
 */
export function calculateAlgebraicTotal(criteria: {
  languageAndStyle: { score: number };
  prosodyAndRhyme: { score: number };
  originalityAndInnovation: { score: number };
  poeticImageryAndImagination: { score: number };
  artisticCohesionAndUnity: { score: number };
  emotionalImpactAndAesthetic: { score: number };
}): number {
  const sum =
    criteria.languageAndStyle.score +
    criteria.prosodyAndRhyme.score +
    criteria.originalityAndInnovation.score +
    criteria.poeticImageryAndImagination.score +
    criteria.artisticCohesionAndUnity.score +
    criteria.emotionalImpactAndAesthetic.score;

  // Round to 1 decimal place or integer
  return Math.round(sum * 10) / 10;
}

/**
 * Validates score limits and brackets according to the strict critical rubric
 */
export function validateCriterionBrackets(scores: {
  language: number; // Max 20
  prosody: number; // Max 15
  originality: number; // Max 20
  imagery: number; // Max 15
  cohesion: number; // Max 15
  impact: number; // Max 15
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (scores.language < 0 || scores.language > 20) errors.push('درجة اللغة والأسلوب يجب أن تكون بين 0 و 20');
  if (scores.prosody < 0 || scores.prosody > 15) errors.push('درجة الوزن والقافية يجب أن تكون بين 0 و 15');
  if (scores.originality < 0 || scores.originality > 20) errors.push('درجة الأصالة والابتكار يجب أن تكون بين 0 و 20');
  if (scores.imagery < 0 || scores.imagery > 15) errors.push('درجة الصورة الشعرية يجب أن تكون بين 0 و 15');
  if (scores.cohesion < 0 || scores.cohesion > 15) errors.push('درجة تماسك البناء الفني يجب أن تكون بين 0 و 15');
  if (scores.impact < 0 || scores.impact > 15) errors.push('درجة قوة التأثير يجب أن تكون بين 0 و 15');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Returns the exact descriptive bracket for each criterion based on rubric
 */
export function getCriterionBracketName(criterionId: string, score: number): string {
  switch (criterionId) {
    case 'language':
      if (score >= 18) return 'جزالة وفصاحة تراثية فائقة تتحدى المعاجم (18 - 20)';
      if (score >= 14) return 'لغة سليمة فصيحة لم تصل لجزالة الفحول (14 - 17)';
      if (score >= 10) return 'أخطاء خفيفة أو ميل للتقريرية المدرسية (10 - 13)';
      return 'ركاكة أسلوبية وكثرة لحن (أقل من 10)';

    case 'prosody':
      if (score === 15) return 'انضباط خليلي تام وجرس موسيقي عذب بلا تكلف (15)';
      if (score >= 11) return 'وزن صحيح مع سناد خفيف أو ثقل تفعيلات (11 - 14)';
      if (score >= 6) return 'كسر عروضي صريح في بيت واحد (6 - 10)';
      return 'كسور عروضية متعددة أو نظم منثور (0 - 5)';

    case 'originality':
      if (score >= 18) return 'فلسفة عميقة ورؤية وجودية متفردة (18 - 20)';
      if (score >= 14) return 'فكرة جيدة بزاوية تناول لافتة (14 - 17)';
      if (score >= 10) return 'اجترار وتكرار لمعان قديمة مطروقة (10 - 13)';
      return 'ابتذال وسرقات شعرية مكشوفة (أقل من 10)';

    case 'imagery':
      if (score >= 14) return 'صور بكر مركبة ومدهشة تحفر في الذاكرة (14 - 15)';
      if (score >= 11) return 'استعارات وتشبيهات جيدة متداولة (11 - 13)';
      if (score >= 7) return 'صور متناقضة أو طغيان المباشرة الجافة (7 - 10)';
      return 'خلو كامل من الخيال الشعري (أقل من 7)';

    case 'cohesion':
      if (score >= 14) return 'معمار درامي محكم لا يقبل التقديم والتأخير (14 - 15)';
      if (score >= 11) return 'وحدة موضوعية جيدة مع بعض القفزات (11 - 13)';
      if (score >= 7) return 'مفككة ويمكن إعادة ترتيب الأبيات بسهولة (7 - 10)';
      return 'انهيار كامل للبناء الفني (أقل من 7)';

    case 'impact':
      if (score >= 14) return 'صدمة شعورية تزلزل الوجدان وتترك دوياً أبدياً (14 - 15)';
      if (score >= 11) return 'إطراب وقتي جميل دون أثر عميق (11 - 13)';
      if (score >= 7) return 'نص بارد لا يثير أي انفعال (7 - 10)';
      return 'جفاف ونفرة من القراءة (أقل من 7)';

    default:
      return '';
  }
}

/**
 * Returns tier rank details based on the total score
 */
export function getTierDetails(totalScore: number): {
  tierName: string;
  tierDescription: string;
  badgeStyle: 'gold' | 'emerald' | 'amber' | 'slate' | 'rose';
  isApproved: boolean;
} {
  if (totalScore >= 90) {
    return {
      tierName: 'ديوان الفحول وقمة الشعر الخالد',
      tierDescription: 'نص فحل إعجازي يجلس في مصاف المعلقات السبع وعيون قصائد المتنبي وجرير وأبي تمام والمعري.',
      badgeStyle: 'gold',
      isApproved: true,
    };
  }
  if (totalScore >= 80) {
    return {
      tierName: 'ديوان المجيدين المتقنين',
      tierDescription: 'نص فذ نادر في العصر الحاضر، متقن الصنعة والبيان، حاز شروط البلاغة العالية والجزالة.',
      badgeStyle: 'emerald',
      isApproved: true,
    };
  }
  if (totalScore >= 65) {
    return {
      tierName: 'ديوان المتمرسين',
      tierDescription: 'شعر حسن مستقيم الوزن سليم اللغة، لكنه يفتقر إلى الدهشة البكر والرؤية الوجودية العميقة.',
      badgeStyle: 'amber',
      isApproved: true,
    };
  }
  if (totalScore >= 50) {
    return {
      tierName: 'ديوان الناشئة ومبتدئي النظم',
      tierDescription: 'نظم تغلب عليه التقريرية واجترار المعاني المكررة، ويحتاج إلى دربة بلاغية وصقل موسيقي أعمق.',
      badgeStyle: 'slate',
      isApproved: false,
    };
  }
  return {
    tierName: 'ساقط عن رتبة الشعر (دون مستوى الإجازة)',
    tierDescription: 'نص معتل أصابته الكسور العروضية أو اللحن النحوي أو الركاكة البالغة، لا يُجاز شِعراً في ميزان الفحول.',
    badgeStyle: 'rose',
    isApproved: false,
  };
}

/**
 * Split poem text into clean lines and extract key verses
 */
export function parsePoemLines(text: string): {
  lines: string[];
  firstVerse: string;
  secondVerse: string;
  middleVerse: string;
  count: number;
} {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const count = lines.length;
  const firstVerse = lines[0] || '';
  const secondVerse = lines[1] || lines[0] || '';
  const middleIndex = Math.floor(lines.length / 2);
  const middleVerse = lines[middleIndex] || lines[0] || '';

  return {
    lines,
    firstVerse,
    secondVerse,
    middleVerse,
    count,
  };
}

/**
 * Preloaded benchmark sample poems
 */
export const SAMPLE_POEMS: SamplePoem[] = [
  {
    id: 'imru-al-qais',
    title: 'معلقة امرئ القيس (قفا نبكِ)',
    poet: 'امرؤ القيس الكندي (أمير شعراء الجاهلية)',
    category: 'معلقات وعيون التراث (90-100)',
    description: 'المرجعية القياسية المطلقة للجزالة والابتكار البكر والصورة الشعرية الخالدة.',
    expectedScoreRange: '95 - 98',
    text: `قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ ومَنْزِلِ ... بِسِقْطِ اللِّوَى بَيْنَ الدَّخُولِ فَحَوْمَلِ
فَتُوْضِحَ فَالمِقْراةِ لم يَعْفُ رَسْمُها ... لِمَا نَسَجَتْهَا مِنْ جَنُوبٍ وشَمْأَلِ
تَرَى بَعَرَ الآرَامِ فِي عَرَصَاتِهَا ... وَقِيْعَانِهَا كَأنَّهُ حَبُّ فُلْفُلِ
كَأنِّي غَدَاةَ البَيْنِ يَوْمَ تَحَمَّلُوا ... لَدَى سَمُرَاتِ الحَيِّ نَاقِفُ حَنْظَلِ
وَلَيْلٍ كَمَوْجِ البَحْرِ أَرْخَى سُدُولَهُ ... عَلَيَّ بِأَنْوَاعِ الهُمُومِ لِيَبْتَلِي
فَقُلْتُ لَهُ لَمَّا تَمَطَّى بِصُلْبِهِ ... وأَرْدَفَ أَعْجَازاً وَنَاءَ بِكَلْكَلِ
أَلا أَيُّهَا اللَّيْلُ الطَّوِيلُ أَلا انْجَلِي ... بِصُبْحٍ وَمَا الإصْبَاحُ منِكَ بِأَمْثَلِ
وقَدْ أَغْتَدِي والطَّيْرُ فِي وُكُنَاتِهَا ... بِمُنْجَرِدٍ قَيْدِ الأَوَابِدِ هَيْكَلِ
مِكَرٍّ مِفَرٍّ مُقْبِلٍ مُدْبِرٍ مَعاً ... كَجُلْمُودِ صَخْرٍ حَطَّهُ السَّيْلُ مِنْ عَلِ`,
  },
  {
    id: 'al-mutanabbi',
    title: 'وا حرّ قلباه ممن قلبه شبم',
    poet: 'أبو الطيب المتنبي (شاعر العربية الأكبر)',
    category: 'معلقات وعيون التراث (90-100)',
    description: 'ذروة الفصاحة والبلاغة والاعتزاز الذاتي والاشتباك الفلسفي والوجداني.',
    expectedScoreRange: '94 - 97',
    text: `وَا حَرَّ قَلْبَاهُ مِمَّنْ قَلْبُهُ شَبِمُ ... وَمَنْ بِجِسْمِي وَحَالِي عِنْدَهُ سَقَمُ
مَا لِي أُكَتِّمُ حُبّاً قَدْ بَرَى جَسَدِي ... وَتَدَّعِي حُبَّ سَيْفِ الدَّوْلَةِ الأُمَمُ
إِنْ كَانَ يَجْمَعُنَا حُبٌّ لِغِرَّتِهِ ... فَلَيْتَ أَنَّا بِقَدْرِ الحُبِّ نَقْتَسِمُ
يَا أَعْدَلَ النَّاسِ إِلَّا فِي مُعَامَلَتِي ... فِيكَ الخِصَامُ وَأَنْتَ الخَصْمُ وَالحَكَمُ
أُعِيذُهَا نَظَرَاتٍ مِنْكَ صَادِقَةً ... أَنْ تَحْسَبَ الشَّحْمَ فِيمَنْ شَحْمُهُ وَرَمُ
وَمَا انْتِفَاعُ أَخِي الدُّنْيَا بِنَاظِرِهِ ... إِذَا اسْتَوَتْ عِنْدَهُ الأَنْوَارُ وَالظُّلَمُ
أَنَا الَّذِي نَظَرَ الأَعْمَى إِلَى أَدَبِي ... وَأَسْمَعَتْ كَلِمَاتِي مَنْ بِهِ صَمَمُ
الخَيْلُ وَاللَّيْلُ وَالبَيْدَاءُ تَعْرِفُنِي ... وَالسَّيْفُ وَالرُّمْحُ وَالقِرْطَاسُ وَالقَلَمُ`,
  },
  {
    id: 'traditional-average',
    title: 'في ذكرى الأحباب (نص تقليدي متكرر)',
    poet: 'ناظم معاصر (نمط مكرر)',
    category: 'شعر فصيح متوسط (60-75)',
    description: 'نص فصيح ومستقيم عروضياً، غير أن معانيه مطروقة وصوره مستهلكة تفتقر للابتكار.',
    expectedScoreRange: '64 - 72',
    text: `سَرَى طَيْفُ مَنْ أَهْوَى فَأَرَّقَ مَضْجَعِي ... وَأَجْرَى مِنَ الآمَاقِ فَيْضَ المَدَامِعِ
وَقَفْتُ بِرَبْعِ الدَّارِ أَنْدُبُ أَهْلَهَا ... وَأَسْأَلُ عَنْ عَهْدِ الشَّبَابِ المُنَازِعِ
فَمَا رَدَّتِ الأَطْلالُ رَجْعَ جَوَابِهَا ... سِوَى صَوْتِ رِيحٍ بَيْنَ تِلْكَ الأَبَاطِحِ
أَرَى الدَّهْرَ يَمْضِي وَالأَمَانِي قَصِيرَةٌ ... وَنَفْسِي تَرُومُ المَجْدَ بَيْنَ الصَّوَامِعِ
أَيَا صَاحِبِي صَبْراً عَلَى غِيَرِ المَدَى ... فَلَيْسَ لِمَغْلُوبِ الحَوَادِثِ شَافِعِ`,
  },
  {
    id: 'broken-prosody',
    title: 'حنين الوطن (نص معتل العروض ولحن نحوي)',
    poet: 'ناظم مبتدئ (نموذج تعليمي للخلل)',
    category: 'شعر مكسور العروض ولحن نحوي (<50)',
    description: 'يحتوي على كسور عروضية صريحة في الشطر ولحن نحوي فاقع، يُسقط درجات الوزن واللغة فوراً.',
    expectedScoreRange: '25 - 42',
    text: `بِلادِي أَنْتِ حُبَّاً فِي فُؤَادِي مُسْتَقِرُّ ... وَأَنْتِ الشَّمْسُ تَبْقَى فَوْقَ سَمَاءِ البَشَرِ
يَسِيرُ الشَّاعِرُونَ فِي كُلِّ الطَّرِيقِ بِلَا هُدَى ... وَلَا يَسْمَعُوا صَوْتَ النَّاصِحِينَ فِي أَمْرِهِمْ
فَيَا لَيْتَ الزَّمَانُ يَعُودُ يَوْماً نَلْتَقِي ... بِأَرْضٍ كَانَ فِيهَا الأَجْدَادُ يَفْتَخِرُوا
لَقَدْ هَانَ قَلْبِي بَعْدَ فِرَاقِ الدِّيَارِ جِدّاً ... وَمَا زِلْتُ أَبْكِي عَلَى الأَيَّامِ الدَّابِرَةِ`,
  },
];
