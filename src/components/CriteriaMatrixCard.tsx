import React from 'react';
import { Sliders, CheckSquare, Layers, Award, Sparkles, Feather } from 'lucide-react';
import type { EvaluationResult, CriterionScore } from '../types/poetry.ts';

interface CriteriaMatrixCardProps {
  stage3: EvaluationResult['stage3Criteria'];
}

export const CriteriaMatrixCard: React.FC<CriteriaMatrixCardProps> = ({ stage3 }) => {
  const criteriaList: CriterionScore[] = [
    stage3.languageAndStyle,
    stage3.prosodyAndRhyme,
    stage3.originalityAndInnovation,
    stage3.poeticImageryAndImagination,
    stage3.artisticCohesionAndUnity,
    stage3.emotionalImpactAndAesthetic,
  ];

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 sm:p-7 shadow-xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                المرحلة الثالثة
              </span>
              <h3 className="text-lg font-bold text-amber-100">المطابقة على الدليل القياسي الصارم (100 درجة)</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              مصفوفة المعايير الستة الموزونة بموازين الفحول دون تخمين أو مجاملة
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-amber-400/90 px-3 py-1 rounded-xl bg-stone-950 border border-stone-800 font-semibold">
          مجموع المعايير: 100 درجة
        </div>
      </div>

      {/* 6 Criteria Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaList.map((crit, idx) => {
          const ratio = (crit.score / crit.maxScore) * 100;
          const isHigh = ratio >= 85;
          const isMid = ratio >= 60 && ratio < 85;
          const isLow = ratio < 60;

          return (
            <div
              key={crit.criterionId || idx}
              className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-amber-900/50 transition-all"
            >
              <div>
                {/* Top Row: Title & Score */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-stone-100">{crit.title}</h4>
                  </div>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span
                      className={`text-lg font-extrabold ${
                        isHigh ? 'text-amber-400' : isMid ? 'text-amber-300/90' : 'text-rose-400'
                      }`}
                    >
                      {crit.score}
                    </span>
                    <span className="text-xs text-stone-400">/ {crit.maxScore}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden mb-2.5">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isHigh
                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                        : isMid
                        ? 'bg-gradient-to-r from-amber-700 to-amber-500'
                        : 'bg-gradient-to-r from-rose-700 to-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, ratio))}%` }}
                  />
                </div>

                {/* Applied Bracket Badge */}
                <div className="mb-2">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded ${
                      isHigh
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : isMid
                        ? 'bg-stone-900 text-stone-300 border border-stone-800'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                    }`}
                  >
                    الشريحة: {crit.bracket}
                  </span>
                </div>
              </div>

              {/* Critique text */}
              <p className="text-xs text-stone-400 leading-relaxed mt-1 pt-2 border-t border-stone-800/50">
                {crit.critique}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
