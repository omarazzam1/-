import React from 'react';
import { Music, AlertTriangle, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';
import type { EvaluationResult, VerseScansion } from '../types/poetry.ts';

interface ProsodyScansionCardProps {
  stage1: EvaluationResult['stage1Prosody'];
}

export const ProsodyScansionCard: React.FC<ProsodyScansionCardProps> = ({ stage1 }) => {
  const verses: VerseScansion[] = [
    stage1.firstVerse,
    stage1.secondVerse,
    stage1.middleVerse,
  ].filter(Boolean);

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 sm:p-7 shadow-xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                المرحلة الأولى
              </span>
              <h3 className="text-lg font-bold text-amber-100">التقطيع العروضي الإجباري وضبط البحر والقافية</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              فحص التفعيلات الخليليّة للبيتين الأول والثاني وبيت المنتصف جردياً
            </p>
          </div>
        </div>

        {/* Meter Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/50 border border-amber-600/40 text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-2">
            <span className="text-stone-400 font-normal">البحر المرصود:</span>
            <span className="text-amber-300 font-['Amiri',serif] text-base">{stage1.detectedMeter}</span>
          </div>
        </div>
      </div>

      {/* Meter Key & Prosody Integrity Banner */}
      <div className="mt-5 space-y-3">
        {stage1.meterKey && (
          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-stone-400">مفتاح البحر:</span>
              <span className="font-['Amiri',serif] text-sm text-amber-200 font-semibold">
                {stage1.meterKey}
              </span>
            </div>
            {stage1.qafiyahCharacteristics && (
              <div className="text-xs text-stone-300">
                <span className="text-stone-400">القافية والروي: </span>
                <span className="text-stone-200 font-medium">{stage1.qafiyahCharacteristics}</span>
              </div>
            )}
          </div>
        )}

        {/* Penalty or Integrity notice */}
        {stage1.hasAnyProsodicBreaks ? (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 flex items-start gap-2.5 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-300">تنبيه عروضي صارم: تم رصد كسر عروضي صريح!</p>
              <p className="text-rose-200/90 mt-0.5 text-xs leading-relaxed">
                {stage1.penaltyAppliedNote ||
                  'وفق قانون الميزان، أي كسر عروضي في أي شطر يُسقط قسم التمكن من الوزن فوراً إلى النصف (6-10) أو الصفر (0-5) دون أي تساهل.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 flex items-center gap-2.5 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-emerald-300">سلامة الوزن الخليلي: </span>
              <span className="text-emerald-100/90 text-xs">{stage1.prosodyIntegritySummary}</span>
            </div>
          </div>
        )}
      </div>

      {/* The 3 Mandatory Scanned Verses */}
      <div className="mt-6 space-y-4">
        <h4 className="text-xs font-bold text-stone-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>الأبيات الملزمة بالتقطيع التحليلي:</span>
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {verses.map((verse, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-4 transition-all ${
                verse.hasBrokenMeter
                  ? 'bg-rose-950/20 border-rose-800/60'
                  : 'bg-stone-950/60 border-stone-800/80 hover:border-amber-900/60'
              }`}
            >
              {/* Verse Title & Meter State */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 mb-3 border-b border-stone-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-200">
                    {verse.label || `البيت ${idx + 1}`}
                  </span>
                  <span className="text-xs text-stone-400">
                    البحر: <strong className="text-stone-300">{verse.meterName || stage1.detectedMeter}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  {verse.hasBrokenMeter ? (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      <XCircle className="w-3.5 h-3.5" /> كسر عروضي صريح
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      <CheckCircle2 className="w-3.5 h-3.5" /> وزن مستقيم
                    </span>
                  )}
                </div>
              </div>

              {/* Original Verse */}
              <div className="mb-3 text-center sm:text-right">
                <p className="text-xs text-stone-400 mb-1">البيت الأصلي:</p>
                <p className="font-['Amiri',serif] text-base sm:text-lg text-amber-100 font-bold leading-relaxed px-2 py-1.5 bg-stone-900/60 rounded-lg border border-stone-800/50">
                  {verse.originalVerse}
                </p>
              </div>

              {/* Scansion Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                {/* Prosodic Writing */}
                <div className="bg-stone-900/40 rounded-lg p-3 border border-stone-800/40">
                  <span className="text-stone-400 block mb-1 font-semibold">
                    الكتابة العروضية (ما يُنطق يُكتب):
                  </span>
                  <p className="font-['Amiri',serif] text-sm text-stone-200 tracking-wide">
                    {verse.prosodicWriting || '—'}
                  </p>
                </div>

                {/* Symbols & Feet */}
                <div className="bg-stone-900/40 rounded-lg p-3 border border-stone-800/40">
                  <span className="text-stone-400 block mb-1 font-semibold">التفعيلات الخليلية:</span>
                  <p className="font-['Amiri',serif] text-sm text-amber-300 font-bold tracking-wider">
                    {verse.feet || '—'}
                  </p>
                  {verse.symbols && (
                    <div className="text-xs text-stone-400 mt-1.5 flex items-center gap-1.5">
                      <span>الرموز:</span>
                      <span className="font-mono text-amber-300/80 tracking-widest dir-ltr font-bold">
                        {verse.symbols}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Qafiyah, Rawiy, Deviations */}
              <div className="mt-3 pt-2.5 border-t border-stone-800/50 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
                <div className="flex items-center gap-3">
                  <span>
                    القافية: <strong className="text-stone-300">{verse.qafiyah || '—'}</strong>
                  </span>
                  <span>
                    الرَّوِيّ: <strong className="text-amber-400">{verse.rawiy || '—'}</strong>
                  </span>
                </div>
                {verse.flawsOrDeviations && (
                  <span className="text-amber-300/90 italic">
                    الزحافات أو الملاحظات: {verse.flawsOrDeviations}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
