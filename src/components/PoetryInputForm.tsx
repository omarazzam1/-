import React, { useState } from 'react';
import { Feather, Sparkles, Wand2, Trash2, BookMarked, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_POEMS } from '../utils/evaluationLogic.ts';
import type { SamplePoem } from '../types/poetry.ts';

interface PoetryInputFormProps {
  poemText: string;
  setPoemText: (val: string) => void;
  poemTitle: string;
  setPoemTitle: (val: string) => void;
  poetName: string;
  setPoetName: (val: string) => void;
  isLoading: boolean;
  onEvaluate: () => void;
}

export const PoetryInputForm: React.FC<PoetryInputFormProps> = ({
  poemText,
  setPoemText,
  poemTitle,
  setPoemTitle,
  poetName,
  setPoetName,
  isLoading,
  onEvaluate,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('');

  const linesCount = poemText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0).length;

  const handleSelectSample = (sample: SamplePoem) => {
    setSelectedSampleId(sample.id);
    setPoemText(sample.text);
    setPoemTitle(sample.title);
    setPoetName(sample.poet);
  };

  const handleClear = () => {
    setPoemText('');
    setPoemTitle('');
    setPoetName('');
    setSelectedSampleId('');
  };

  const handleFormatHemistichs = () => {
    if (!poemText) return;
    const lines = poemText.split('\n');
    const formatted = lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        // If already has '...', leave it
        if (trimmed.includes('...')) return trimmed;
        // If has '*' or ' - ' or '#'
        if (trimmed.includes('*')) return trimmed.replace(/\s*\*\s*/g, ' ... ');
        if (trimmed.includes(' - ')) return trimmed.replace(/\s+-\s+/g, ' ... ');
        if (trimmed.includes('#')) return trimmed.replace(/\s*#\s*/g, ' ... ');
        if (trimmed.includes('\t')) return trimmed.replace(/\t+/g, ' ... ');

        // If line has multiple words and spaces, find middle space if wide
        const words = trimmed.split(/\s+/);
        if (words.length >= 6) {
          const mid = Math.floor(words.length / 2);
          return words.slice(0, mid).join(' ') + ' ... ' + words.slice(mid).join(' ');
        }
        return trimmed;
      })
      .join('\n');

    setPoemText(formatted);
  };

  return (
    <div className="bg-stone-900/80 rounded-2xl border border-stone-800/80 p-5 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-sm">
      {/* Benchmark Samples Header */}
      <div className="mb-6 pb-5 border-b border-stone-800">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-amber-200">
              نماذج قياسية معتمدة للاختبار والمعاينة
            </h2>
          </div>
          <span className="text-xs text-stone-400">
            انقر على أي نموذج لمشاهدة صرامة الميزان واختلاف التقييم بين المعلقات والنصوص المتوسطة والضعيفة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_POEMS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            const isBenchmark = sample.id === 'imru-al-qais' || sample.id === 'al-mutanabbi';
            const isBroken = sample.id === 'broken-prosody';

            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                disabled={isLoading}
                className={`p-3 rounded-xl text-right transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/70 border-amber-500 text-amber-100 shadow-md shadow-amber-950/50'
                    : 'bg-stone-950/60 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isBenchmark
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                          : isBroken
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {sample.category}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400/90 font-semibold">
                      {sample.expectedScoreRange}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-['Amiri',serif] text-stone-100 line-clamp-1">
                    {sample.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{sample.poet}</p>
                </div>
                <p className="text-[10px] text-stone-400 mt-2 line-clamp-2 italic">
                  {sample.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              عنوان القصيدة (اختياري)
            </label>
            <input
              type="text"
              value={poemTitle}
              onChange={(e) => setPoemTitle(e.target.value)}
              placeholder="مثال: واحرّ قلباه / معلقة امرئ القيس / في وجد العشاق"
              disabled={isLoading}
              className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              اسم الشاعر أو الناظم (اختياري)
            </label>
            <input
              type="text"
              value={poetName}
              onChange={(e) => setPoetName(e.target.value)}
              placeholder="مثال: أبو الطيب المتنبي / ناظم معاصر"
              disabled={isLoading}
              className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-400" />
              <label className="text-xs sm:text-sm font-bold text-stone-200">
                نص القصيدة الشعرية المراد تحكيمها عروضياً ونقدياً
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400/90 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 font-medium">
                الأبيات المرصودة: <strong className="font-mono font-bold text-amber-300">{linesCount}</strong>
              </span>
              <button
                type="button"
                onClick={handleFormatHemistichs}
                disabled={isLoading || !poemText}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg text-amber-300 bg-amber-950/50 hover:bg-amber-900/50 border border-amber-800/50 transition-colors disabled:opacity-40"
                title="تنسيق الفاصل بين الصدر والعجز بالنقاط الثلاث (...) تلقائياً"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>تنسيق الشطرين (...)</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading || (!poemText && !poemTitle)}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg text-stone-400 hover:text-stone-200 bg-stone-950 hover:bg-stone-800 border border-stone-800 transition-colors disabled:opacity-40"
                title="مسح النص"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={8}
              value={poemText}
              onChange={(e) => setPoemText(e.target.value)}
              placeholder="اكتب أو الصق أبيات القصيدة هنا... (يُفضل كتابة كل بيت في سطر مع الفصل بين الشطرين بـ ... أو علامة نجمية * أو مسافة)
مثال:
قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ ومَنْزِلِ ... بِسِقْطِ اللِّوَى بَيْنَ الدَّخُولِ فَحَوْمَلِ
فَتُوْضِحَ فَالمِقْراةِ لم يَعْفُ رَسْمُها ... لِمَا نَسَجَتْهَا مِنْ جَنُوبٍ وشَمْأَلِ"
              disabled={isLoading}
              className="w-full bg-stone-950/90 border border-stone-800 rounded-2xl p-4 sm:p-5 text-stone-100 font-['Amiri',serif] text-lg sm:text-xl leading-loose tracking-wide placeholder:text-stone-400 placeholder:font-['Cairo'] placeholder:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 resize-y transition-colors min-h-[220px]"
            />
          </div>
        </div>

        {/* Notice of analytical stages */}
        <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold text-amber-300">مسار التحكيم الإجباري:</strong> سيقوم الميزان أولاً بالتقطيع العروضي الإجباري (للبيتين الأولين وبيت المنتصف)، ثم الفحص اللغوي واستخراج الشوائب والصور البلاغية، ثم مطابقة الدرجات على مصفوفة الـ 100 نقطة الصارمة وحساب المجموع الجبري وإصدار صك الإجازة أو الحجب.
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onEvaluate}
            disabled={isLoading || linesCount === 0}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${
              isLoading || linesCount === 0
                ? 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700/50'
                : 'bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-amber-50 shadow-amber-950/60 border border-amber-400/40 hover:scale-[1.008] active:scale-[0.995]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                <span>الميزان يباشر المحاكمة العروضية والنقدية الصارمة...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>بدء المحاكمة النقدية والعروضية الصارمة (100 درجة)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
