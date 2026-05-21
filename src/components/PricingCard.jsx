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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative p-8 rounded-2xl glass-card flex flex-col h-full overflow-hidden ${
        isPopular 
          ? 'border-brand/30 shadow-[0_0_40px_rgba(14,165,233,0.08)] bg-gradient-to-b from-dark-3/60 to-dark-2/60' 
          : 'border-white/5 bg-dark-2/45'
      }`}
    >
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] pointer-events-none ${
        isPopular ? 'bg-brand/20' : 'bg-emerald-500/10'
      }`} />

      {isPopular && (
        <div className="absolute -top-1 right-8 px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-brand to-cyan-500 text-[10px] font-extrabold text-white tracking-widest uppercase shadow-md shadow-brand/10">
          BEST SELLER
        </div>
      )}
      
      <div className="mb-6 relative z-10">
        <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-[10px] font-bold tracking-wider uppercase mb-3">
          ⚡ SAVE {discount}%
        </span>
        <h3 className="text-xl font-bold text-white mb-1.5">{title}</h3>
        <p className="text-xs text-neutral-500 mb-4">Official permanent access key</p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white tracking-tight">${totalDisplayPrice}</span>
          <span className="text-neutral-500 text-sm font-medium line-through">${totalRetailPrice}</span>
          <span className="text-neutral-400 text-xs font-semibold">({quantity}x item{quantity > 1 ? 's' : ''})</span>
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
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Step 1: Quantity Selector Row */}
      <div className="mb-6 relative z-10">
        <div className="text-[10px] font-extrabold tracking-widest text-neutral-500 uppercase mb-2">CHOOSE QUANTITY</div>
        <div className="flex items-center justify-between bg-dark/50 border border-white/5 rounded-xl p-1 max-w-[150px]">
          <button 
            onClick={handleDecrement}
            className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 font-bold hover:text-white hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
          >
            －
          </button>
          <span className="text-sm font-extrabold text-white">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 font-bold hover:text-white hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
          >
            ＋
          </button>
        </div>
      </div>
      
      {/* Step 2: Stacked Cart Actions */}
      <div className="space-y-2.5 relative z-10">
        <Button 
          variant={isPopular ? 'glow' : 'glow'} 
          className="w-full py-3.5 font-extrabold tracking-wide"
          style={!isPopular ? { backgroundColor: '#10b981', border: '1px solid rgba(52, 211, 153, 0.3)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' } : {}}
          onClick={() => onBuyNow(quantity)}
        >
          ⚡ Buy Now
        </Button>
        <Button 
          variant="secondary" 
          className="w-full py-3.5 font-bold tracking-wide border-white/10 hover:border-neutral-500 transition-colors"
          onClick={() => onAddToCart(quantity)}
        >
          🛒 Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
