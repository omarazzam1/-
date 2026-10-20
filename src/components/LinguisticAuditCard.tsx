import React from 'react';
import { SpellCheck, AlertCircle, CheckCircle, Sparkles, Feather, Flame, Compass } from 'lucide-react';
import type { EvaluationResult } from '../types/poetry.ts';

interface LinguisticAuditCardProps {
  stage2: EvaluationResult['stage2Linguistic'];
}

export const LinguisticAuditCard: React.FC<LinguisticAuditCardProps> = ({ stage2 }) => {
  const hasFlaws = stage2.linguisticFlaws && stage2.linguisticFlaws.length > 0;
  const rhetoricalImages = stage2.rhetoricalImages || [];

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 sm:p-7 shadow-xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <SpellCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                المرحلة الثانية
              </span>
              <h3 className="text-lg font-bold text-amber-100">الفحص اللغوي والبلاغي واستخراج الشوائب</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              جرد صريح للأخطاء النحوية والصرفية والإملائية وتحليل الأصالة البلاغية للصور (بكر أم مستهلكة)
            </p>
          </div>
        </div>

        {/* Flaws Count Badge */}
        <div className="flex items-center gap-2">
          {hasFlaws ? (
            <span className="px-3 py-1 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>تم رصد {stage2.linguisticFlaws.length} شوائب لغوية</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>نص سليم ونزيه من اللحن النحوي</span>
            </span>
          )}
        </div>
      </div>

      {/* Lexical purity summary */}
      {stage2.lexicalPurityAssessment && (
        <div className="mt-5 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 leading-relaxed flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-bold">تقييم سلامة المعجم والتراكيب: </strong>
            <span>{stage2.lexicalPurityAssessment}</span>
          </div>
        </div>
      )}

      {/* Section 1: Linguistic Flaws Table */}
      <div className="mt-6">
        <h4 className="text-xs font-bold text-stone-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <Feather className="w-3.5 h-3.5 text-amber-400" />
          <span>جدول العثرات النحوية والصرفية والإملائية:</span>
        </h4>

        {hasFlaws ? (
          <div className="overflow-x-auto rounded-xl border border-stone-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-stone-950 text-stone-300 font-semibold border-b border-stone-800">
                <tr>
                  <th className="py-2.5 px-3">النوع</th>
                  <th className="py-2.5 px-3">الموضع / الشاهد في النص</th>
                  <th className="py-2.5 px-3">بيان العلة ووجه الخلل</th>
                  <th className="py-2.5 px-3">التصويب الفصيح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 bg-stone-950/40">
                {stage2.linguisticFlaws.map((flaw, idx) => (
                  <tr key={idx} className="hover:bg-stone-900/50 transition-colors">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-800/60">
                        {flaw.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-['Amiri',serif] text-sm text-amber-200 font-medium">
                      "{flaw.quote}"
                    </td>
                    <td className="py-3 px-3 text-stone-300 leading-relaxed max-w-xs">
                      {flaw.explanation}
                    </td>
                    <td className="py-3 px-3 font-['Amiri',serif] text-sm text-emerald-400 font-bold whitespace-nowrap">
                      {flaw.correction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800 text-stone-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>
              لم يُعثر على أي خطأ نحوي أو صرفي أو لحن إملائي فاقع، والألفاظ جارية على سنن الفصاحة العربية.
            </span>
          </div>
        )}
      </div>

      {/* Section 2: Rhetorical Images Audit */}
      <div className="mt-6 pt-5 border-t border-stone-800">
        <h4 className="text-xs font-bold text-stone-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>تشريح الصور البلاغية وفحص أصالتها (بكر أم مستهلكة):</span>
        </h4>

        {rhetoricalImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rhetoricalImages.map((img, idx) => {
              const isVirgin = img.classification === 'بكر مبتكرة' || img.classification.includes('بكر');
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 transition-all ${
                    isVirgin
                      ? 'bg-amber-950/20 border-amber-800/60'
                      : 'bg-stone-950/60 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-800/70">
                    <span className="text-xs font-bold text-stone-300">
                      الصورة البلاغية {idx + 1}: <strong className="text-amber-400">{img.figureType}</strong>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isVirgin
                          ? 'bg-amber-900/60 text-amber-200 border border-amber-600/50'
                          : 'bg-stone-800 text-stone-400 border border-stone-700/50'
                      }`}
                    >
                      {img.classification}
                    </span>
                  </div>

                  <p className="font-['Amiri',serif] text-base text-amber-100 font-bold mb-2 p-2 bg-stone-900/80 rounded border border-stone-800/50">
                    "{img.quote}"
                  </p>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {img.analysis}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic">
            النص خلو من الصور البلاغية المركبة أو الاستعارات اللافتة.
          </p>
        )}
      </div>
    </div>
  );
};
