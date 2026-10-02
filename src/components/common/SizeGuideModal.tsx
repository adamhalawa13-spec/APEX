import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from './ApexLogo';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isSizeGuideOpen) return null;

  // Sizing data in CM
  const measurementsCm = [
    { size: 'XS', chest: 108, length: 68, shoulder: 54, sleeve: 61 },
    { size: 'S', chest: 114, length: 70, shoulder: 56, sleeve: 62.5 },
    { size: 'M', chest: 120, length: 72, shoulder: 58, sleeve: 64 },
    { size: 'L', chest: 126, length: 74, shoulder: 60, sleeve: 65.5 },
    { size: 'XL', chest: 132, length: 76, shoulder: 62, sleeve: 67 },
  ];

  // Sizing data converted to inches
  const measurementsInches = measurementsCm.map((row) => ({
    size: row.size,
    chest: (row.chest / 2.54).toFixed(1),
    length: (row.length / 2.54).toFixed(1),
    shoulder: (row.shoulder / 2.54).toFixed(1),
    sleeve: (row.sleeve / 2.54).toFixed(1),
  }));

  const activeData = unit === 'cm' ? measurementsCm : measurementsInches;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-white/10 shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ApexLogo size="sm" variant="star-only" color="light" />
            <div>
              <h2 className="font-brand text-base font-bold uppercase tracking-wider text-white">
                APEX SIZE & FIT GUIDE
              </h2>
              <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
                UNISEX RELAXED / DROPPED SHOULDER FIT
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
            Measurements Table
          </span>
          <div className="flex items-center border border-white/10 p-0.5 bg-zinc-900">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                unit === 'cm' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                unit === 'inches' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Clean Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900/60 text-zinc-300">
                <th className="py-3 px-4 uppercase tracking-wider font-semibold">SIZE</th>
                <th className="py-3 px-4 uppercase tracking-wider font-semibold">CHEST</th>
                <th className="py-3 px-4 uppercase tracking-wider font-semibold">LENGTH</th>
                <th className="py-3 px-4 uppercase tracking-wider font-semibold">SHOULDER</th>
                <th className="py-3 px-4 uppercase tracking-wider font-semibold">SLEEVE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeData.map((row) => (
                <tr key={row.size} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                  <td className="py-3 px-4 text-zinc-300 tabular-nums">{row.chest} {unit}</td>
                  <td className="py-3 px-4 text-zinc-300 tabular-nums">{row.length} {unit}</td>
                  <td className="py-3 px-4 text-zinc-300 tabular-nums">{row.shoulder} {unit}</td>
                  <td className="py-3 px-4 text-zinc-300 tabular-nums">{row.sleeve} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Advisory */}
        <div className="mt-6 p-4 bg-zinc-900/50 border border-white/5 space-y-2 text-xs text-zinc-300 leading-relaxed font-light">
          <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-brand">
            FIT ADVISORY
          </div>
          <p>
            APEX silhouettes are engineered with an intentional modern drop-shoulder drape and generous chest boxiness.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-zinc-400">
            <li>For an authentic modern architectural streetwear drape: <strong>Order your true size</strong>.</li>
            <li>For a standard tailored/closer fit: <strong>Order one size down</strong>.</li>
            <li>Unisex grading calibrated for men, women, and teenagers.</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-white text-black text-xs uppercase font-bold tracking-[0.2em] hover:bg-zinc-200 transition-colors"
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
    </div>
  );
};
