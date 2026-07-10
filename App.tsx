/**
 /*
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, CheckCircle2, CreditCard, Smartphone, Fingerprint, Loader2 } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    telegram: '',
    documento: '' // 'CIE', 'SPID', 'ENTRAMBI'
  });

  // Gestione del timer per nascondere l'intro iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4800); // L'intro dura 4.8 secondi
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDocSelect = (docType: string) => {
    setFormData((prev) => ({
      ...prev,
      documento: docType
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ----------------------------------------------------------------------
      // INVIO DATI A MAKE.COM (WEBHOOK)
      // ----------------------------------------------------------------------
      console.log('Invio dati in corso:', formData);
      
      await fetch('https://hook.eu1.make.com/nuxrom0nxkrkwquo019w5kukw69uzhj2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Piccolo delay estetico per far vedere l'animazione di caricamento fluida
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Errore durante l\'invio del modulo', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#00f0ff] selection:text-black bg-[#050505] text-white relative overflow-x-hidden">
      
      {/* ----------------------------------------------------------------------
          ANIMAZIONE INTRODUTTIVA (PURE APPLE AESTHETIC)
          ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-screen"
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Sfondo Astratto Fluido stile macOS */}
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                className="absolute w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-[#001b3a] via-[#004a8c] to-transparent rounded-[40%] blur-[80px]"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [0, -45, 0],
                }}
                transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                className="absolute w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-gradient-to-bl from-[#000000] via-[#003366] to-[#001122] rounded-full blur-[90px] mix-blend-screen"
              />
            </div>

            {/* Testi Centrali - Frase ad effetto retroilluminata */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 w-full"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] [text-shadow:0_0_40px_rgba(255,255,255,0.5)]">
                Enjoy the real life.
              </h1>
              <motion.span 
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                className="text-[#00f0ff] mt-2 sm:mt-4 text-xl sm:text-3xl font-bold uppercase tracking-[0.3em] drop-shadow-[0_0_20px_rgba(0,240,255,0.8)] [text-shadow:0_0_20px_rgba(0,240,255,0.8)]"
              >
                Now.
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------------
          CONTENUTO PRINCIPALE DEL SITO
          ---------------------------------------------------------------------- */}
      
      {/* Minimal Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: showIntro ? 4.6 : 0, duration: 1, ease: "easeOut" }}
        className="fixed top-0 w-full bg-[#050505]/70 backdrop-blur-2xl border-b border-white/5 z-50 shadow-[0_4px_30px_rgba(0,240,255,0.15)]"
      >
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-[14px] text-white flex items-center gap-2 [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
            Marco Ramondetta <span className="text-[#00f0ff] text-lg font-light drop-shadow-[0_0_10px_rgba(0,240,255,1)] [text-shadow:0_0_10px_rgba(0,240,255,0.8)]">✕</span> M$M
          </span>
          <span className="text-[10px] font-bold text-[#00f0ff] tracking-[0.2em] uppercase hidden sm:block drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] [text-shadow:0_0_10px_rgba(0,240,255,0.8)]">
            Merciless Mindset
          </span>
        </div>
      </motion.nav>

      <main className="px-6 pb-24 pt-36 sm:pt-48 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ delay: showIntro ? 4.3 : 0, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hero Section */}
              <header className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#00f0ff]/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
                
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: showIntro ? 4.8 : 0, duration: 1, ease: "easeOut" }}
                  className="text-5xl sm:text-6xl font-black tracking-tighter text-balance leading-[1.1] mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] [text-shadow:0_0_30px_rgba(255,255,255,0.6)]"
                >
                  Massimizza i tuoi Bonus. <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-white drop-shadow-[0_0_30px_rgba(0,240,255,0.8)]">Zero Sforzi.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: showIntro ? 5.0 : 0.2, duration: 1 }}
                  className="text-[17px] sm:text-lg text-[#00f0ff] text-balance leading-relaxed max-w-lg mx-auto font-medium drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] [text-shadow:0_0_15px_rgba(0,240,255,0.6)]"
                >
                  Il team M$M copre il 100% dei costi per connetterti ai migliori bonus di benvenuto. Compila i dati e preparati a sbloccare il capitale.
                </motion.p>
              </header>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* 1. Dati Personali */}
                <motion.section 
                  initial={{ opacity: 0, y: 40, boxShadow: '0 0 0px rgba(0,240,255,0)' }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ boxShadow: '0 0 50px -15px rgba(0,240,255,0.25)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: showIntro ? 5.2 : 0.3, duration: 1 }}
                  className="space-y-6 relative rounded-[2rem] p-6 sm:p-8 bg-[#0a0a0a] border border-white/5"
                >
                  <h2 className="text-[12px] font-bold text-white tracking-[0.15em] uppercase ml-1 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
                    <span className="w-6 h-[1px] bg-[#00f0ff] shadow-[0_0_15px_2px_rgba(0,240,255,1)]" />
                    1. Dati Personali
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Nome"
                      name="nome"
                      placeholder="Mario"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Cognome"
                      name="cognome"
                      placeholder="Rossi"
                      required
                      value={formData.cognome}
                      onChange={handleChange}
                    />
                  </div>
                  <InputField
                    label="Numero di Telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+39 333 123 4567"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Username Telegram"
                    name="telegram"
                    placeholder="@username"
                    required
                    value={formData.telegram}
                    onChange={handleChange}
                  />
                </motion.section>

                {/* 2. Verifica Identità */}
                <motion.section 
                  initial={{ opacity: 0, y: 40, boxShadow: '0 0 0px rgba(0,240,255,0)' }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ boxShadow: '0 0 50px -15px rgba(0,240,255,0.25)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: showIntro ? 5.4 : 0.4, duration: 1 }}
                  className="space-y-6 relative rounded-[2rem] p-6 sm:p-8 bg-[#0a0a0a] border border-white/5"
                >
                  <h2 className="text-[12px] font-bold text-white tracking-[0.15em] uppercase ml-1 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
                    <span className="w-6 h-[1px] bg-[#00f0ff] shadow-[0_0_15px_2px_rgba(0,240,255,1)]" />
                    2. Strumenti di Verifica
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <RadioCard
                      selected={formData.documento === 'CIE'}
                      onClick={() => handleDocSelect('CIE')}
                      title="CIE"
                      subtitle="Carta d'Identità Elettronica"
                      icon={CreditCard}
                    />
                    <RadioCard
                      selected={formData.documento === 'SPID'}
                      onClick={() => handleDocSelect('SPID')}
                      title="SPID"
                      subtitle="Identità Digitale"
                      icon={Smartphone}
                    />
                    <RadioCard
                      selected={formData.documento === 'ENTRAMBI'}
                      onClick={() => handleDocSelect('ENTRAMBI')}
                      title="Entrambi"
                      subtitle="Possiedo sia CIE che SPID"
                      icon={Fingerprint}
                    />
                  </div>

                  {/* Info Badge */}
                  <div className="mt-6 flex items-start gap-4 bg-[#111] rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#00f0ff] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <Info className="w-6 h-6 text-[#00f0ff] shrink-0 mt-0.5 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
                    <p className="text-[14px] text-[#00f0ff] leading-relaxed relative z-10 [text-shadow:0_0_10px_rgba(0,240,255,0.6)]">
                      <strong className="text-white font-bold [text-shadow:0_0_10px_rgba(255,255,255,0.8)]">Cos'è lo SPID/CIE?</strong> Sono i sistemi di identità digitale sicuri utilizzati in Italia. Ci servono per capire all'istante quali bonus aziendali esclusivi possiamo attivarti senza farti perdere tempo.
                    </p>
                  </div>
                </motion.section>

                {/* Submit CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: showIntro ? 5.6 : 0.5, duration: 1 }}
                  className="pt-4 pb-12"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.documento}
                    className="relative w-full bg-white text-black rounded-full px-8 py-5 font-bold text-[16px] uppercase tracking-wider hover:bg-white hover:shadow-[0_0_60px_rgba(0,240,255,0.8)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-white opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl" />
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin text-black" />
                    ) : (
                      <>
                        <span className="relative z-10">Invia e Sblocca i tuoi Bonus</span>
                        <div className="absolute inset-0 border-[2px] border-white/50 rounded-full scale-[1.02] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-20 text-center flex flex-col items-center justify-center relative p-10"
            >
              <div className="absolute inset-0 bg-[#00f0ff]/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_60px_rgba(255,255,255,0.8),0_0_100px_rgba(0,240,255,0.6)] relative">
                <div className="absolute inset-0 border-4 border-[#00f0ff] rounded-full scale-[1.2] opacity-50 animate-ping" style={{ animationDuration: '3s' }} />
                <CheckCircle2 className="w-12 h-12 text-[#00f0ff]" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] [text-shadow:0_0_30px_rgba(255,255,255,0.8)]">Richiesta Ricevuta.</h2>
              <p className="text-xl text-[#00f0ff] leading-relaxed max-w-md mx-auto [text-shadow:0_0_15px_rgba(0,240,255,0.6)]">
                Verrai contattato su <strong className="text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] [text-shadow:0_0_15px_rgba(255,255,255,0.8)]">Telegram o WhatsApp</strong> entro 15 minuti dal Team M$M. 
                <br /><br />
                <span className="text-[#00f0ff] font-bold uppercase tracking-widest text-sm drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] [text-shadow:0_0_15px_rgba(0,240,255,0.8)]">Prepara i tuoi accessi!</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// REUSABLE COMPONENTS
// ----------------------------------------------------------------------

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-2 relative group">
    <label className="text-[11px] font-bold text-[#00f0ff] uppercase tracking-wider ml-1 group-focus-within:text-white group-focus-within:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] group-focus-within:[text-shadow:0_0_10px_rgba(255,255,255,0.8)] [text-shadow:0_0_10px_rgba(0,240,255,0.6)] transition-all duration-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-0 rounded-xl bg-[#00f0ff] blur-md opacity-0 group-focus-within:opacity-40 transition-opacity duration-500 pointer-events-none" />
      <input
        className="relative w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white outline-none transition-all duration-300 focus:border-[#00f0ff] focus:bg-[#1a1a1a] placeholder:text-[#00f0ff]/40 shadow-inner"
        {...props}
      />
    </div>
  </div>
);

interface RadioCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const RadioCard: React.FC<RadioCardProps> = ({ selected, onClick, title, subtitle, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-500 text-center w-full relative overflow-hidden h-full ${
      selected
        ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white shadow-[0_0_40px_rgba(0,240,255,0.4)] scale-[1.02]'
        : 'border-white/10 bg-[#111] text-[#00f0ff] hover:border-white/30 hover:bg-[#161616]'
    }`}
  >
    <div className={`absolute inset-0 bg-[#00f0ff] blur-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${selected ? 'opacity-40' : 'group-hover:opacity-20'}`} />
    <Icon 
      className={`relative mb-3 h-6 w-6 transition-all duration-500 ${
        selected ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] scale-110' : 'text-[#00f0ff] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
      }`} 
    />
    <span className={`relative font-black text-[13px] uppercase tracking-wider transition-colors duration-500 mb-1 ${selected ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] [text-shadow:0_0_15px_rgba(255,255,255,1)]' : '[text-shadow:0_0_10px_rgba(0,240,255,0.6)]'}`}>{title}</span>
    <span className={`relative text-[11px] leading-tight transition-colors duration-500 ${selected ? 'text-white [text-shadow:0_0_10px_rgba(255,255,255,0.8)]' : 'text-[#00f0ff]/70'}`}>
      {subtitle}
    </span>
  </button>
);
