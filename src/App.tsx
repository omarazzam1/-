import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { PoetryInputForm } from './components/PoetryInputForm.tsx';
import { ProsodyScansionCard } from './components/ProsodyScansionCard.tsx';
import { LinguisticAuditCard } from './components/LinguisticAuditCard.tsx';
import { CriteriaMatrixCard } from './components/CriteriaMatrixCard.tsx';
import { VerdictReportCard } from './components/VerdictReportCard.tsx';
import { MetersModal } from './components/MetersModal.tsx';
import { ConstitutionModal } from './components/ConstitutionModal.tsx';
import { SAMPLE_POEMS } from './utils/evaluationLogic.ts';
import type { EvaluationResult } from './types/poetry.ts';
import {
  Scale,
  Sparkles,
  BookOpen,
  ShieldAlert,
  RotateCcw,
  AlertCircle,
  Award,
  Feather,
  Music,
  Sliders,
  SpellCheck,
} from 'lucide-react';

export default function App() {
  const [poemText, setPoemText] = useState<string>('');
  const [poemTitle, setPoemTitle] = useState<string>('');
  const [poetName, setPoetName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isMetersModalOpen, setIsMetersModalOpen] = useState<boolean>(false);
  const [isConstitutionModalOpen, setIsConstitutionModalOpen] = useState<boolean>(false);

  // Active view section
  const [activeTab, setActiveTab] = useState<'all' | 'stage1' | 'stage2' | 'stage3' | 'stage4'>('all');

  const resultsRef = useRef<HTMLDivElement>(null);

  // Preload a default benchmark poem on initial launch for immediate testability
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sampleParam = urlParams.get('sample');
    const autostart = urlParams.get('autostart');

    if (sampleParam) {
      const found = SAMPLE_POEMS.find((s) => s.id === sampleParam);
      if (found) {
        setPoemText(found.text);
        setPoemTitle(found.title);
        setPoetName(found.poet);
      }
    } else if (!poemText) {
      // Default to Imru' al-Qais benchmark
      const defaultSample = SAMPLE_POEMS[0];
      setPoemText(defaultSample.text);
      setPoemTitle(defaultSample.title);
      setPoetName(defaultSample.poet);
    }

    if (autostart === '1') {
      // Trigger evaluation immediately if requested
      setTimeout(() => {
        handleEvaluate();
      }, 300);
    }
  }, []);

  const handleEvaluate = async () => {
    if (!poemText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/evaluate-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          poemText,
          title: poemTitle,
          poet: poetName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `خطأ في الخادم (${response.status})`);
      }

      const data: EvaluationResult = await response.json();
      setEvaluationResult(data);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Evaluation failed:', err);
      setError(err.message || 'حدث خطأ أثناء تقييم القصيدة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEvaluationResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
      {/* Top Header */}
      <Header
        onOpenMeters={() => setIsMetersModalOpen(true)}
        onOpenConstitution={() => setIsConstitutionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-stone-900/90 via-stone-900/40 to-stone-950 border border-amber-900/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center sm:text-right">
          {/* Subtle Islamic / Classical Geometric Ornaments */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold mb-4">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>ميزان نقدي وعروضي عربي متجرد من العاطفة ولا يعرف المجاملة</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Amiri',serif] text-amber-100 tracking-wide leading-tight mb-4">
              المحاكمة النقدية والعروضية المعيارية للقصيدة العربية
            </h2>

            <p className="text-xs sm:text-base text-stone-300 leading-relaxed max-w-3xl mb-6">
              نظام تحكيم نقدي صارم يجلس على عرش المرجعية المطلقة (90-100 درجة) لأمهات الشعر العربي الخالد:
              <strong className="text-amber-200"> المعلقات السبع، عيون المتنبي، جرير، أبي تمام، والمعري</strong>.
              ينفذ التحليل إجبارياً عبر أربع مراحل متسلسلة قبل احتساب المجموع الجبري الدقيق.
            </p>

            {/* The 4 Stages pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-stone-300">
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1. التقطيع العروضي الإجباري</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-center gap-1.5">
                <SpellCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2. الفحص اللغوي والبلاغي</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>3. الدليل القياسي (100 درجة)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>4. صك الحكم والنقد الصارم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <section id="input-section">
          <PoetryInputForm
            poemText={poemText}
            setPoemText={setPoemText}
            poemTitle={poemTitle}
            setPoemTitle={setPoemTitle}
            poetName={poetName}
            setPoetName={setPoetName}
            isLoading={isLoading}
            onEvaluate={handleEvaluate}
          />
        </section>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-200 flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-300">تعذر استكمال المحاكمة:</p>
              <p className="text-xs text-rose-200/90 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Evaluation Results Container */}
        {evaluationResult && (
          <div ref={resultsRef} className="space-y-8 animate-in fade-in duration-300">
            {/* Results Nav Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-base font-bold text-amber-200">
                  صك المحاكمة النقدية المكتمل لـ "{evaluationResult.poemTitle}"
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Tabs */}
                <div className="hidden md:flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'all'
                        ? 'bg-amber-950 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    العرض الكامل
                  </button>
                  <button
                    onClick={() => setActiveTab('stage1')}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'stage1'
                        ? 'bg-amber-950 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    1. العروض
                  </button>
                  <button
                    onClick={() => setActiveTab('stage2')}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'stage2'
                        ? 'bg-amber-950 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    2. اللغة والبلاغة
                  </button>
                  <button
                    onClick={() => setActiveTab('stage3')}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'stage3'
                        ? 'bg-amber-950 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    3. الدرجات (100)
                  </button>
                  <button
                    onClick={() => setActiveTab('stage4')}
                    className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'stage4'
                        ? 'bg-amber-950 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    4. صك الحكم
                  </button>
                </div>

                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-300 bg-stone-950 hover:bg-stone-800 border border-stone-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>محاكمة نص جديد</span>
                </button>
              </div>
            </div>

            {/* Stage 4: Top Verdict & Total Score Summary */}
            {(activeTab === 'all' || activeTab === 'stage4') && (
              <VerdictReportCard
                stage4={evaluationResult.stage4Final}
                poemTitle={evaluationResult.poemTitle}
                poetName={evaluationResult.poetName}
                versesCount={evaluationResult.versesCount}
              />
            )}

            {/* Stage 1: Mandatory Prosody Scansion */}
            {(activeTab === 'all' || activeTab === 'stage1') && (
              <ProsodyScansionCard stage1={evaluationResult.stage1Prosody} />
            )}

            {/* Stage 2: Linguistic & Rhetorical Audit */}
            {(activeTab === 'all' || activeTab === 'stage2') && (
              <LinguisticAuditCard stage2={evaluationResult.stage2Linguistic} />
            )}

            {/* Stage 3: The 6 Criteria 100-Point Matrix */}
            {(activeTab === 'all' || activeTab === 'stage3') && (
              <CriteriaMatrixCard stage3={evaluationResult.stage3Criteria} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-8 text-xs text-stone-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="space-y-1">
            <p className="font-['Amiri',serif] text-sm text-stone-300 font-bold">
              مِيزَانُ الشِّعْرِ العَرَبِيِّ الصَّارِم — عَلَى عَهْدِ الخَلِيلِ وَفُحُولِ التُّرَاث
            </p>
            <p className="text-[11px] text-stone-400">
              تطبيق أصول النقد العربي القديم المستمدة من طبقات فحول الشعراء، والموازنة، وأسرار البلاغة.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>المرجعية: المعلقات والمتنبي</span>
            <span>•</span>
            <span>المقياس: 100 درجة جبرية</span>
            <span>•</span>
            <span>البحور: 16 بحراً خليلياً</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MetersModal
        isOpen={isMetersModalOpen}
        onClose={() => setIsMetersModalOpen(false)}
      />
      <ConstitutionModal
        isOpen={isConstitutionModalOpen}
        onClose={() => setIsConstitutionModalOpen(false)}
      />
    </div>
  );
}
