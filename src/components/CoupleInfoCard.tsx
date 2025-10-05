'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface TimeCounters {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Componente separado para a imagem do casal (não re-renderiza)
const CoupleImage = memo(function CoupleImage() {
  return (
    <div className="relative rounded-t-2xl w-full h-[280px] overflow-hidden bg-gray-800">
      <Image 
        alt="Imagem do casal" 
        fill
        className="object-cover" 
        src="/images/image9.jpg"
        priority
        onError={(e) => {
          console.log('Erro ao carregar imagem:', e);
        }}
      />
      <div className="absolute inset-0 bg-transparent bg-opacity-20"></div>
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[#F2F9FE] font-semibold text-xl">Sobre o casal</span>
      </div>
    </div>
  );
});

// Componente separado para os contadores de tempo
const TimeCounters = memo(function TimeCounters() {
  const [timeCounters, setTimeCounters] = useState<TimeCounters>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeTogether = () => {
      const startDate = new Date('2022-10-11T19:00:00'); // 11/10/2022 às 19h
      const now = new Date();
      const diffTime = now.getTime() - startDate.getTime();

      const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeCounters({ years, months, days, hours, minutes, seconds });
    };

    // Calcular imediatamente
    calculateTimeTogether();

    // Atualizar a cada segundo
    const interval = setInterval(calculateTimeTogether, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex h-full items-center justify-center">
      <div className="text-card-foreground rounded-2xl w-full bg-transparent border-0 border-transparent border-b-0 shadow-none">
        <div className="p-0">
          <div className="grid gap-3 grid-cols-3">
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.years}</span>
              <span className="text-sm text-[#e6e1e5]">Anos</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.months}</span>
              <span className="text-sm text-[#e6e1e5]">Meses</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.days}</span>
              <span className="text-sm text-[#e6e1e5]">Dias</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.hours}</span>
              <span className="text-sm text-[#e6e1e5]">Horas</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.minutes}</span>
              <span className="text-sm text-[#e6e1e5]">Minutos</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-b-[6px] border-[#262626]/60">
              <span className="text-2xl font-bold mb-1 text-[#F2F9FE]">{timeCounters.seconds}</span>
              <span className="text-sm text-[#e6e1e5]">Segundos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const CoupleInfoCard = memo(function CoupleInfoCard() {
  return (
    <div className="flex flex-col gap-6 h-fit w-full mt-4 px-4">
      <div className="flex w-full min-h-[200px] h-fit items-center justify-center">
        <div className="flex flex-col bg-[#332f2f] h-fit w-full z-10 rounded-2xl max-w-sm mx-auto">
          {/* Header com imagem de fundo - agora separado */}
          <CoupleImage />

          {/* Conteúdo principal */}
          <div className="flex gap-4 p-4 flex-col w-full">
            {/* Nomes do casal */}
            <div className="flex flex-col text-[#F2F9FE]">
              <span className="font-bold font-inter text-2xl">{siteConfig.couple.name1} e {siteConfig.couple.name2}</span>
              <span className="font-base text-base text-[#ABB0BC]">Juntos desde 2022</span>
            </div>

            {/* Contadores de tempo - agora separado */}
            <TimeCounters />
          </div>
        </div>
      </div>
    </div>
  );
});
