import { motion } from 'framer-motion';
import Button from './Button';

export default function Hero({ onBuyKey, onBuyAccount }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-24 overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand/10 blur-[130px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_50%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto z-10"
      >
        {/* Dynamic Trust Badge Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-white/5 text-xs font-semibold tracking-wide mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-300">AUTOMATED BLOCKCHAIN VERIFICATION ACTIVE</span>
          <span className="text-neutral-500">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-bold">
            ⚡ INSTANT KEYS
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
          Official Minecraft <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-sky-300 to-emerald-400">
            Keys & Accounts
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Buy authentic, permanent Minecraft licenses instantly. Fully automated network verification drops your key in seconds.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 max-w-md sm:max-w-none mx-auto w-full px-4">
          <Button variant="glow" onClick={onBuyKey} className="w-full sm:w-auto px-8 py-3.5 text-base border-emerald-400/20">
            <span className="text-lg">🔑</span> Buy Official License Key
          </Button>
          <Button variant="secondary" onClick={onBuyAccount} className="w-full sm:w-auto px-8 py-3.5 text-base hover:bg-neutral-800/80">
            <span className="text-lg">👤</span> Buy Full Access Account
          </Button>
        </div>

        {/* Live Status Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> 100% Automated Delivery
          </span>
          <span className="hidden sm:inline text-neutral-700">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> Genuine Retail Licenses
          </span>
          <span className="hidden sm:inline text-neutral-700">•</span>
          <span className="flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> 
            Only <strong className="text-neutral-300">223 keys</strong> remaining in stock
          </span>
        </div>
      </motion.div>
    </section>
  );
}
