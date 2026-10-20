export interface VerseScansion {
  verseIndex: number;
  label: 'البيت الأول' | 'البيت الثاني' | 'بيت المنتصف' | string;
  originalVerse: string;
  prosodicWriting: string; // الكتابة العروضية مع فك الإدغام والتنوين
  symbols: string; // الرموز العروضية: / للحركة و 0 للسكون
  feet: string; // التفعيلات مثل: فعولن مفاعيلن فعولن مفاعلن
  meterName: string; // اسم البحر مثل الطويل، الكامل، البسيط
  meterKey?: string; // مفتاح البحر الشعري
  qafiyah: string; // القافية
  rawiy: string; // حرف الروي وحركته
  flawsOrDeviations?: string; // زحافات أو علل أو كسور
  hasBrokenMeter: boolean; // هل حدث كسر عروضي صريح؟
}

export interface LinguisticFlaw {
  id: string;
  type: 'نحوي' | 'صرفي' | 'إملائي' | 'ركاكة أسلوبية';
  location: string;
  quote: string;
  explanation: string;
  correction: string;
}

export interface RhetoricalImage {
  id: string;
  quote: string;
  figureType: string;
  classification: 'بكر مبتكرة' | 'مستهلكة مكررة' | string;
  analysis: string;
}

export interface CriterionScore {
  criterionId: 'language' | 'prosody' | 'originality' | 'imagery' | 'cohesion' | 'impact';
  title: string;
  maxScore: number;
  score: number;
  bracket: string; // الشريحة المستحقة
  critique: string; // التعليل النقدي الصارم
}

export interface EvaluationResult {
  poemTitle?: string;
  poetName?: string;
  poemText: string;
  versesCount: number;
  evaluatedAt: string;

  // المرحلة الأولى: التقطيع العروضي الإجباري
  stage1Prosody: {
    firstVerse: VerseScansion;
    secondVerse: VerseScansion;
    middleVerse: VerseScansion;
    detectedMeter: string;
    meterKey: string;
    qafiyahCharacteristics: string;
    prosodyIntegritySummary: string;
    hasAnyProsodicBreaks: boolean;
    penaltyAppliedNote?: string;
  };

  // المرحلة الثانية: الفحص اللغوي والبلاغي
  stage2Linguistic: {
    linguisticFlaws: LinguisticFlaw[];
    flawsCount: number;
    rhetoricalImages: RhetoricalImage[];
    lexicalPurityAssessment: string;
  };

  // المرحلة الثالثة: المطابقة على الدليل القياسي الصارم (100 درجة)
  stage3Criteria: {
    languageAndStyle: CriterionScore; // 20
    prosodyAndRhyme: CriterionScore; // 15
    originalityAndInnovation: CriterionScore; // 20
    poeticImageryAndImagination: CriterionScore; // 15
    artisticCohesionAndUnity: CriterionScore; // 15
    emotionalImpactAndAesthetic: CriterionScore; // 15
  };

  // المرحلة الرابعة: المجموع النهائي والتقرير النقدي
  stage4Final: {
    totalScore: number; // 0 - 100
    tierName: string; // ديوان الفحول / ديوان المجيدين / ديوان المتمرسين / ديوان الناشئة / دون مستوى الإجازة
    tierDescription: string;
    badgeStyle: 'gold' | 'emerald' | 'amber' | 'slate' | 'rose';
    isApproved: boolean; // صك الإجازة الأدبية
    finalCriticalVerdict: string; // حكم الميزان الصارم
    benchmarkComparison: string; // المقارنة مع أمهات الشعر كالمعلقات والمتنبي
    recommendations: string[]; // التوصيات النقدية المحددة للارتقاء بالنص
  };
}

export interface SamplePoem {
  id: string;
  title: string;
  poet: string;
  category: 'معلقات وعيون التراث (90-100)' | 'شعر فصيح متوسط (60-75)' | 'شعر مكسور العروض ولحن نحوي (<50)';
  description: string;
  expectedScoreRange: string;
  text: string;
}
