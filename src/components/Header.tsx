import React from 'react';
import { Scale, BookOpen, ShieldAlert, Award, FileText } from 'lucide-react';

interface HeaderProps {
  onOpenMeters: () => void;
  onOpenConstitution: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMeters, onOpenConstitution }) => {
  return (
    <header className="border-b border-amber-900/30 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-500/30">
            <Scale className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-['Amiri',serif] tracking-wide text-amber-200">
                مِيزَانُ الشِّعْرِ العَرَبِيِّ الصَّارِم
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-950/90 text-amber-400 border border-amber-800/60">
                المعيار الخليلي التراثي
              </span>
            </div>
            <p className="text-xs text-stone-400">
              المحاكمة النقدية والعروضية المجردة وفق أمهات الشعر العربي الخالد (المعلقات، المتنبي، جرير، وأبو تمام)
            </p>
          </div>
        </div>

        {/* Quick action badges & modals */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenConstitution}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 transition-colors"
            title="الاطلاع على دليل الدرجات والمراحل الأربع"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>دستور الميزان (100 درجة)</span>
          </button>

          <button
            onClick={onOpenMeters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-900/90 hover:bg-stone-800 border border-stone-800 transition-colors"
            title="دليل بحور الشعر الستة عشر وتفعيلاتها"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>دليل البحور الستة عشر</span>
          </button>
        </div>
      </div>
    </header>
  );
};
