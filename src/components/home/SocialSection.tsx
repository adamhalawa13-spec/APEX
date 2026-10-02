import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../data/products';
import { ApexLogo } from '../common/ApexLogo';

export const SocialSection: React.FC = () => {
  const images = [
    { src: ASSETS.hero, alt: 'APEX campaign architectural atrium' },
    { src: ASSETS.hoodie, alt: 'APEX obsidian star hoodie' },
    { src: ASSETS.night, alt: 'APEX midnight streetwear metropolis' },
    { src: ASSETS.matching, alt: 'APEX coordinated silhouettes' },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/5 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ApexLogo size="sm" variant="star-only" color="light" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                COMMUNITY ARCHIVE
              </span>
            </div>
            <h2 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              APEX WORLD
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            <span>@APEXOFFICIAL</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Clean 4-Image Fashion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ApexLogo size="sm" variant="star-only" color="light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
