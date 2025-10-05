'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SpecialMessage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const message = `Dengo,

Hoje fazem 3 anos desde aquele 11 de outubro de 2022 — o dia em que minha vida começou a mudar pra sempre. Desde então, vivemos tantas coisas juntos… você se formou, ficamos noivos, estamos montando nosso cantinho com tanto carinho e preparando o início da nossa nova vida. Cada etapa com você tem sido um presente.

Você me ensina todos os dias a ser uma pessoa melhor. Aprendo com o seu jeito doce, com a sua força, com o seu cuidado. Você cuida de mim de um jeito que me faz querer sempre ser mais — mais carinhoso, mais atento, mais presente.

Meu sonho é retribuir tudo isso, cuidando de você, te fazendo sorrir, te fazendo feliz todos os dias.

Você é a mulher da minha vida, nêga.
Minha delícia, meu dengo, meu amor.
Minha melhor amiga e eterna namorada.
E mal posso esperar pra te chamar de esposa daqui a alguns meses. 💖

Te amo pra sempre,
teu nêgo. 🤍`;


  return (
    <div className="w-full px-4 mb-4">
      <div className="flex w-full h-fit items-center justify-center">
        <AnimatePresence mode="wait">
          {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between w-full h-full p-4 overflow-hidden rounded-2xl"
            style={{ 
              backgroundColor: 'rgb(69, 151, 201)', 
              color: 'rgb(0, 0, 0)', 
              boxShadow: 'rgba(36, 102, 143, 0.25) 0px 4px 30px 0px',
              height: '896px',
              maxHeight: '896px'
            }}
          >
            {/* Header */}
            <div className="w-full flex justify-between items-center">
              <div 
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/20 rounded-full cursor-pointer"
                onClick={() => setIsExpanded(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F2F9FE] sm:text-2xl">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
              <div className="flex flex-col w-[60%]">
                <span className="font-bold w-full overflow-hidden text-center text-[#F2F9FE]" style={{ fontSize: '16px' }}>
                  <div className="overflow-hidden whitespace-nowrap" style={{ width: '100%' }}>
                    <span className="block overflow-hidden text-ellipsis">Don&apos;t Stop Til You Get Enough</span>
                  </div>
                </span>
                <span className="text-[#F2F9FE]/80 text-center w-full overflow-hidden" style={{ fontSize: '13px' }}>
                  <div className="overflow-hidden whitespace-nowrap" style={{ width: '100%' }}>
                    <span className="block overflow-hidden text-ellipsis">Michael Jackson</span>
                  </div>
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" x2="4" y1="22" y2="15"></line>
              </svg>
            </div>

            {/* Message Content */}
            <div className="flex-1 flex flex-col my-2 sm:my-4 font-extrabold leading-tight min-h-0 overflow-hidden relative">
              <div className="flex-1 flex overflow-hidden h-full">
                <div 
                  className="w-full overflow-y-auto spotify-text-renderer flex-1 touch-auto overscroll-contain break-words whitespace-pre-wrap pb-6"
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    lineHeight: '1.7',
                    color: 'rgb(0, 0, 0)',
                    scrollbarColor: 'rgb(242, 249, 254) rgba(242, 249, 254, 0.145)',
                    scrollbarWidth: 'thin',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    whiteSpace: 'pre-wrap',
                    padding: '0px 4px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {message}
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ 
                    background: 'linear-gradient(rgba(69, 151, 201, 0) 0%, rgba(69, 151, 201, 0.6) 60%, rgba(69, 151, 201, 0.9) 100%)',
                    zIndex: 5
                  }}
                ></div>
              </div>
            </div>

            {/* Footer with progress bar and play button */}
            <div className="w-full flex-col flex mt-auto pt-2">
              <div className="flex w-full flex-col gap-2 h-fit">
                <div className="flex w-full max-h-[5px] min-h-[5px] rounded-lg bg-[#F2F9FE]/25 relative cursor-pointer">
                  <div className="flex bg-[#F2F9FE] rounded-l-lg min-h-full" style={{ width: '0%' }}></div>
                  <div className="flex absolute top-[40%] transform -translate-y-1/2 min-h-[15px] min-w-[15px] rounded-full bg-[#F2F9FE]" style={{ left: 'calc(0% - 5px)' }}></div>
                </div>
                <div className="flex w-full h-fit justify-between">
                  <p className="opacity-90 font-semibold text-[#F2F9FE]" style={{ fontSize: 'calc(11px)' }}>0:00</p>
                  <p className="font-semibold text-[#F2F9FE]" style={{ fontSize: 'calc(11px)' }}>-4:14</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex p-0 items-center justify-center min-w-[80px] min-h-[80px] rounded-full bg-[#F2F9FE] cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgb(69, 151, 201)', fill: 'rgb(69, 151, 201)' }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-5 p-4 flex-col h-fit w-full z-10 rounded-2xl"
            style={{ backgroundColor: 'rgb(69, 151, 201)' }}
          >
            <span className="font-bold text-[#F2F9FE] text-xl">Mensagem especial</span>
            <div 
              className="font-extrabold text-[27px] leading-10 relative max-h-40 overflow-hidden"
              style={{ color: 'rgb(0, 0, 0)' }}
            >
              <div 
                className="break-words whitespace-pre-wrap pb-6"
                style={{
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {message}
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ 
                  background: 'linear-gradient(rgba(69, 151, 201, 0) 0%, rgba(69, 151, 201, 0.6) 60%, rgba(69, 151, 201, 0.9) 100%)'
                }}
              ></div>
            </div>
            <button 
              className="bg-[#F2F9FE] text-[#4597c9] rounded-3xl py-3 px-4 w-fit flex items-center font-bold text-sm"
              onClick={() => setIsExpanded(true)}
            >
              Mostrar Mensagem
            </button>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
