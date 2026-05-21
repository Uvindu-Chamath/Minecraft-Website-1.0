import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function PricingCard({ title, price, features, isPopular, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);

  // Sourced retail prices for comparison to highlight discounts
  const retailPrices = {
    "Minecraft Key": 29.99,
    "Minecraft Account": 24.99
  };

  const basePriceNum = parseFloat(price);
  const totalDisplayPrice = (basePriceNum * quantity).toFixed(2);
  const baseRetailPrice = retailPrices[title] || 29.99;
  const totalRetailPrice = (baseRetailPrice * quantity).toFixed(2);

  const discount = Math.round(((baseRetailPrice - basePriceNum) / baseRetailPrice) * 100);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-8 rounded-3xl glass-card flex flex-col h-full overflow-hidden border transition-all duration-300 ${
        isPopular 
          ? 'border-brand/50 shadow-[0_0_50px_rgba(99,102,241,0.2)] bg-gradient-to-b from-dark-2/65 to-brand/5' 
          : 'border-white/10 bg-dark-2/45'
      }`}
    >
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-45 ${
        isPopular ? 'bg-brand/25' : 'bg-emerald-500/15'
      }`} />

      {isPopular && (
        <div className="absolute -top-1 right-8 px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-brand to-cyan-500 text-[10px] font-black text-white tracking-widest uppercase shadow-lg shadow-brand/15">
          BEST SELLER
        </div>
      )}
      
      <div className="mb-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-extrabold tracking-wider uppercase mb-4 shadow-sm shadow-emerald-500/5">
          Save {discount}% Retail
        </span>
        <h3 className="text-2xl font-extrabold text-white tracking-tight mb-1">{title}</h3>
        <p className="text-xs text-neutral-400 mb-5">Permanent retail activation license</p>
        
        {/* Sleek Price Panel */}
        <div className="flex items-end gap-2.5 bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 mb-2">
          <div>
            <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Wholesale Price</div>
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">${totalDisplayPrice}</span>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1.5">Retail Value</div>
            <span className="text-neutral-500 text-sm font-bold line-through tracking-tight">${totalRetailPrice}</span>
            <span className="block text-[10px] text-emerald-400 font-extrabold mt-1">{quantity}x Item{quantity > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      
      <ul className="flex-1 space-y-3.5 mb-6 relative z-10 border-t border-white/5 pt-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="leading-tight font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Quantity Selector */}
      <div className="mb-6 relative z-10 flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-4">
        <div className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase">Quantity</div>
        <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-0.5">
          <button 
            onClick={handleDecrement}
            className="w-8 h-8 rounded-lg bg-neutral-900/60 text-neutral-400 font-extrabold hover:text-white hover:bg-neutral-800/80 transition-all flex items-center justify-center cursor-pointer text-xs"
          >
            －
          </button>
          <span className="text-xs font-black text-white px-3.5 min-w-[32px] text-center">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg bg-neutral-900/60 text-neutral-400 font-extrabold hover:text-white hover:bg-neutral-800/80 transition-all flex items-center justify-center cursor-pointer text-xs"
          >
            ＋
          </button>
        </div>
      </div>
      
      {/* Stacked Actions */}
      <div className="space-y-2.5 relative z-10">
        <Button 
          variant="glow" 
          className={`w-full py-3.5 font-extrabold tracking-wide flex items-center justify-center gap-2 transition-all border ${
            isPopular 
              ? 'bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/20 border-sky-400/20' 
              : 'text-white hover:brightness-110 shadow-lg shadow-emerald-500/20 border-emerald-400/20'
          }`}
          style={!isPopular ? { backgroundColor: '#10b981' } : {}}
          onClick={() => onBuyNow(quantity)}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Buy Now
        </Button>
        <Button 
          variant="secondary" 
          className="w-full py-3.5 font-bold tracking-wide border-white/10 hover:border-brand/40 hover:text-brand transition-all flex items-center justify-center gap-2"
          onClick={() => onAddToCart(quantity)}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
