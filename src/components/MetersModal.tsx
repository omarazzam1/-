import React, { useState } from 'react';
import { X, Search, BookOpen, Music, Check } from 'lucide-react';
import { ARABIC_METERS, ArabicMeterInfo } from '../utils/metersData.ts';

interface MetersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetersModal: React.FC<MetersModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', name: 'كافة البحور (16)' },
    { id: 'البحور الطويلة والوقورة', name: 'البحور الطويلة والوقورة' },
    { id: 'البحور الرشيقة والسريعة', name: 'البحور الرشيقة والسريعة' },
    { id: 'البحور المجزوءة والقصيرة', name: 'البحور المجزوءة والقصيرة' },
  ];

  const filteredMeters = ARABIC_METERS.filter((m) => {
    const matchesSearch =
      m.name.includes(searchTerm) ||
      m.nameWithDiacritics.includes(searchTerm) ||
      m.keyVerse.includes(searchTerm) ||
      m.feetPattern.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-700/60 flex items-center justify-center text-amber-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-200">
                دليل بحور الشعر العربي الستة عشر (الخليل بن أحمد الفراهيدي والأخفش)
              </h2>
              <p className="text-xs text-stone-400">
                مفاتيح البحور الخليليّة، وتفعيلاتها، والدوائر العروضية الخمس
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

        {/* Filter bar */}
        <div className="p-4 border-b border-stone-800 bg-stone-950/60 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن اسم البحر أو مفتاحه..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-9 pl-3 py-2 text-xs text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                  selectedCategory === c.id
                    ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Meters List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 divide-y divide-stone-800/40">
          {filteredMeters.map((meter) => (
            <div key={meter.name} className="pt-3.5 first:pt-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-['Amiri',serif] text-amber-300">
                    {meter.nameWithDiacritics}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    {meter.circle}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">{meter.category}</span>
              </div>

              {/* Key Verse */}
              <div className="p-3 bg-stone-950/70 rounded-xl border border-stone-800/80 mb-2">
                <span className="text-[10px] text-stone-400 block mb-0.5">مفتاح البحر (لحن الحفظ):</span>
                <p className="font-['Amiri',serif] text-base text-stone-100 font-bold">
                  {meter.keyVerse}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-900/50 rounded-lg border border-stone-800/50">
                  <span className="text-stone-400 block mb-0.5 font-semibold">التفعيلات:</span>
                  <span className="font-['Amiri',serif] text-sm text-amber-200/90 font-bold">
                    {meter.feetPattern}
                  </span>
                </div>
                <div className="p-2.5 bg-stone-900/50 rounded-lg border border-stone-800/50">
                  <span className="text-stone-400 block mb-0.5 font-semibold">خصائص الإيقاع:</span>
                  <span className="text-stone-300">{meter.rhythmDescription}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredMeters.length === 0 && (
            <p className="text-center text-stone-400 text-xs py-8">
              لا توجد بحور تطابق عبارة البحث المدخلة.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
