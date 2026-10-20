import React from 'react';
import { X, Scale, ShieldAlert, Award, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

interface ConstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConstitutionModal: React.FC<ConstitutionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-200">
                دستور ميزان الشعر العربي الصارم (دليل الـ 100 درجة)
              </h2>
              <p className="text-xs text-stone-400">
                المرجعية المعيارية القياسية المطلقة (المعلقات، المتنبي، جرير، أبو تمام، والمعري)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed">
          {/* Philosophy Banner */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-200">
            <h3 className="font-bold text-amber-300 text-sm mb-1">فلسفة الميزان الصارم:</h3>
            <p>
              ميزان نقدي وعروضي عربي صارم جداً، متجرد من العاطفة، ولا يعرف المجاملة. المرجعية القياسية المطلقة (90-100 درجة) هي أمهات الشعر العربي الخالد. لا تُمنح درجة تفوق (80) إلا للنصوص الفذة جداً، ولا تفوق (90) إلا لما يزاحم أمهات الشعر العربي.
            </p>
          </div>

          {/* The 4 Stages */}
          <div>
            <h3 className="text-sm font-bold text-amber-300 mb-3 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>المراحل التحليلية الإجبارية الأربع:</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-stone-100 block mb-1">المرحلة الأولى: التقطيع العروضي الإجباري</span>
                <p className="text-stone-400 text-xs">
                  تقطيع أول بيتين وبيتاً من المنتصف عروضياً بذكر التفعيلات والكتابة العروضية والرموز، وضبط البحر والقافية. أي كسر عروضي صريح يُسقط قسم التمكن من الوزن فوراً إلى النصف أو الصفر.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-stone-100 block mb-1">المرحلة الثانية: الفحص اللغوي والبلاغي</span>
                <p className="text-stone-400 text-xs">
                  استخراج أي خطأ نحوي أو صرفي أو إملائي صراحة مع بيان العلة وتصويبه، واستخراج صورتين بلاغيتين وتحليلهما (هل هما بكر مبتكرة أم مستهلكة مكررة).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-stone-100 block mb-1">المرحلة الثالثة: المطابقة على الدليل الصارم</span>
                <p className="text-stone-400 text-xs">
                  توزيع الـ 100 درجة على المعايير الستة وفق الشرائح الرقمية المحددة بدقة متناهية دون تساهل.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-stone-100 block mb-1">المرحلة الرابعة: المجموع الجبري والتقرير النقدي</span>
                <p className="text-stone-400 text-xs">
                  حساب المجموع الجبري الدقيق وإصدار صك الإجازة أو الحجب، مع التقرير التحليلي والتوصيات النقدية للشاعر.
                </p>
              </div>
            </div>
          </div>

          {/* The 6 Criteria */}
          <div>
            <h3 className="text-sm font-bold text-amber-300 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>مصفوفة المعايير الستة والشرائح المعيارية:</span>
            </h3>

            <div className="space-y-3">
              {/* Criterion 1 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>1. سلامة اللغة والأسلوب</span>
                  <span className="text-xs text-amber-400 font-bold">20 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(18 - 20):</strong> جزالة وفصاحة تراثية فائقة تتحدى المعاجم بلا خطأ واحد (مستوى عيون التراث).</li>
                  <li>• <strong>(14 - 17):</strong> لغة سليمة فصيحة لكنها لا تصل لجزالة الفحول.</li>
                  <li>• <strong>(10 - 13):</strong> وجود أخطاء نحوية/إملائية خفيفة أو ميل للتقريرية المدرسية.</li>
                  <li>• <strong>(أقل من 10):</strong> ركاكة وكثرة لحن.</li>
                </ul>
              </div>

              {/* Criterion 2 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>2. التمكن من الوزن والقافية</span>
                  <span className="text-xs text-amber-400 font-bold">15 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(15):</strong> انضباط عروضي تام على بحر خليلي مع جرس موسيقي عذب وقافية متمكنة لا تكلف فيها.</li>
                  <li>• <strong>(11 - 14):</strong> وزن صحيح مع وجود سناد خفيف أو تتالٍ لتفعيلات ثقيلة.</li>
                  <li>• <strong>(6 - 10):</strong> كسر عروضي صريح في بيت واحد.</li>
                  <li>• <strong>(0 - 5):</strong> كسور متعددة أو نص منثور.</li>
                </ul>
              </div>

              {/* Criterion 3 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>3. الأصالة والابتكار</span>
                  <span className="text-xs text-amber-400 font-bold">20 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(18 - 20):</strong> فلسفة عميقة، رؤية وجودية/تاريخية متفردة، واشتباك فكري نادراً ما يحدث في الشعر المعاصر.</li>
                  <li>• <strong>(14 - 17):</strong> فكرة جيدة بزاوية تناول لافتة.</li>
                  <li>• <strong>(10 - 13):</strong> اجترار وتكرار لمعانٍ قديمة مطروقة آلاف المرات.</li>
                  <li>• <strong>(أقل من 10):</strong> ابتذال وسرقات شعرية مكشوفة.</li>
                </ul>
              </div>

              {/* Criterion 4 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>4. جمال الصورة الشعرية والخيال</span>
                  <span className="text-xs text-amber-400 font-bold">15 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(14 - 15):</strong> صور بكر مركبة ومدهشة تحفر في الذاكرة (مستوى المتنبي والأخطل).</li>
                  <li>• <strong>(11 - 13):</strong> استعارات وتشبيهات جيدة لكنها متداولة.</li>
                  <li>• <strong>(7 - 10):</strong> صور متناقضة أو طغيان المباشرة الجافة.</li>
                  <li>• <strong>(أقل من 7):</strong> خلو كامل من الخيال الشعري.</li>
                </ul>
              </div>

              {/* Criterion 5 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>5. تماسك البناء الفني ووحدة القصيدة</span>
                  <span className="text-xs text-amber-400 font-bold">15 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(14 - 15):</strong> معمار ملاحمي/درامي محكم، لا يمكن تقديم بيت أو تأخيره دون انهيار المعنى.</li>
                  <li>• <strong>(11 - 13):</strong> وحدة موضوعية جيدة مع بعض القفزات بين الأبيات.</li>
                  <li>• <strong>(7 - 10):</strong> مفككة ويمكن حذف أو إعادة ترتيب الأبيات بسهولة.</li>
                  <li>• <strong>(أقل من 7):</strong> انهيار كامل للبناء الفني.</li>
                </ul>
              </div>

              {/* Criterion 6 */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="flex items-center justify-between font-bold text-amber-200 mb-1">
                  <span>6. قوة التأثير والأثر الجمالي في المتلقي</span>
                  <span className="text-xs text-amber-400 font-bold">15 درجة</span>
                </div>
                <ul className="text-xs text-stone-400 space-y-1">
                  <li>• <strong>(14 - 15):</strong> صدمة شعورية تزلزل الوجدان وتترك دوياً أبدياً.</li>
                  <li>• <strong>(11 - 13):</strong> إطراب وقتي جميل دون أثر عميق.</li>
                  <li>• <strong>(7 - 10):</strong> نص بارد لا يثير أي انفعال.</li>
                  <li>• <strong>(أقل من 7):</strong> جفاف ونفرة من القراءة.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
