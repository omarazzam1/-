import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Copy, Check, Printer, Share2, Sparkles, AlertOctagon, ArrowUpRight } from 'lucide-react';
import type { EvaluationResult } from '../types/poetry.ts';

interface VerdictReportCardProps {
  stage4: EvaluationResult['stage4Final'];
  poemTitle?: string;
  poetName?: string;
  versesCount: number;
}

export const VerdictReportCard: React.FC<VerdictReportCardProps> = ({
  stage4,
  poemTitle,
  poetName,
  versesCount,
}) => {
  const [copied, setCopied] = useState(false);

  const isGold = stage4.totalScore >= 90;
  const isEmerald = stage4.totalScore >= 80 && stage4.totalScore < 90;
  const isAmber = stage4.totalScore >= 65 && stage4.totalScore < 80;
  const isSlate = stage4.totalScore >= 50 && stage4.totalScore < 65;
  const isRose = stage4.totalScore < 50;

  const handleCopyReport = () => {
    const textReport = `=== ميزان الشعر العربي الصارم | التقرير النقدي النهائي ===
العنوان: ${poemTitle || 'قصيدة دون عنوان'}
الشاعر/الناظم: ${poetName || 'ناظم معاصر'}
عدد الأبيات: ${versesCount}
الدرجة النهائية: ${stage4.totalScore} من 100
الرتبة النقدية: ${stage4.tierName}
صك الإجازة: ${stage4.isApproved ? 'مُجاز في ميزان الفحول' : 'محجوب عن الإجازة (نص معتل)'}

حكم الميزان الصارم:
${stage4.finalCriticalVerdict}

المقارنة بأمهات الشعر العربي:
${stage4.benchmarkComparison}

توصيات الميزان للارتقاء بالنص:
${stage4.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
====================================================`;

    navigator.clipboard.writeText(textReport).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 sm:p-7 shadow-2xl shadow-black/60 relative overflow-hidden">
      {/* Decorative background glow based on tier */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isGold
            ? 'bg-amber-400'
            : isEmerald
            ? 'bg-emerald-400'
            : isAmber
            ? 'bg-amber-600'
            : 'bg-rose-600'
        }`}
      />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-stone-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                المرحلة الرابعة
              </span>
              <h3 className="text-lg font-bold text-amber-100">المجموع النهائي والتقرير النقدي وصك الإجازة</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              الحساب الجبري الدقيق والحكم النقدي غير المجامل
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-300 bg-stone-950 hover:bg-stone-800 border border-stone-800 transition-colors"
            title="نسخ التقرير النقدي إلى الحافظة"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ التقرير'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-300 bg-stone-950 hover:bg-stone-800 border border-stone-800 transition-colors"
            title="طباعة التقرير النقدي"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {/* The Big Score & Tier Badge */}
      <div className="mt-6 p-6 rounded-2xl bg-stone-950/80 border border-stone-800/90 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Big Score Circle */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-lg ${
                isGold
                  ? 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-amber-900/40'
                  : isEmerald
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-emerald-900/40'
                  : isAmber
                  ? 'border-amber-600 bg-amber-950/30 text-amber-400 shadow-amber-950/40'
                  : isSlate
                  ? 'border-stone-600 bg-stone-900 text-stone-300 shadow-black'
                  : 'border-rose-600 bg-rose-950/40 text-rose-300 shadow-rose-950/40'
              }`}
            >
              <span className="text-4xl font-extrabold font-mono tracking-tight">
                {stage4.totalScore}
              </span>
              <span className="text-[11px] text-stone-400 font-semibold mt-0.5">من 100</span>
            </div>
          </div>

          {/* Tier details */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  isGold
                    ? 'bg-amber-950 text-amber-300 border-amber-600'
                    : isEmerald
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : isAmber
                    ? 'bg-amber-950/80 text-amber-400 border-amber-700'
                    : isSlate
                    ? 'bg-stone-800 text-stone-300 border-stone-700'
                    : 'bg-rose-950 text-rose-300 border-rose-700'
                }`}
              >
                {stage4.tierName}
              </span>

              {stage4.isApproved ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> صك الإجازة الأدبية: مُجاز
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-800/60">
                  <XCircle className="w-3.5 h-3.5" /> صك الإجازة: محجوب (غير مجاز)
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
              {stage4.tierDescription}
            </p>
          </div>
        </div>

        {/* Rigorous Threshold Reminder */}
        <div className="text-[11px] text-stone-400 border-t md:border-t-0 md:border-r border-stone-800 pt-3 md:pt-0 md:pr-6 max-w-xs space-y-1">
          <p className="font-semibold text-stone-300">حدود الميزان المعيارية:</p>
          <p>• فوق 80: نصوص فذة نادرة في الشعر المعاصر.</p>
          <p>• فوق 90: ما يزاحم أمهات الشعر العربي الخالد.</p>
        </div>
      </div>

      {/* Final Critical Verdict */}
      <div className="mt-6 space-y-5 relative z-10">
        <div className="p-4 sm:p-5 rounded-xl bg-stone-950/70 border border-stone-800/80">
          <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>حكم الميزان الصارم (التقرير التحليلي):</span>
          </h4>
          <p className="text-sm text-stone-200 leading-relaxed font-['Amiri',serif] text-base sm:text-lg">
            {stage4.finalCriticalVerdict}
          </p>
        </div>

        {/* Benchmark Comparison */}
        {stage4.benchmarkComparison && (
          <div className="p-4 sm:p-5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-2 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>المقارنة الصريحة بأمهات الشعر العربي الخالد (المعلقات والمتنبي):</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {stage4.benchmarkComparison}
            </p>
          </div>
        )}

        {/* Recommendations */}
        {stage4.recommendations && stage4.recommendations.length > 0 && (
          <div className="p-4 sm:p-5 rounded-xl bg-stone-950/70 border border-stone-800/80">
            <h4 className="text-xs font-bold text-amber-300 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>توصيات نقدية دقيقة للشاعر لمعالجة مواضع الوهن:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              {stage4.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 flex items-center justify-center text-[10px] shrink-0 font-mono font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
