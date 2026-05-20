import { useState } from 'react';

export default function NetworkCard({ network, address, badgeColor, badgeLabel, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        onCopy();
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = address;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(el);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const badgeStyles = {
    TRC20: "bg-red-500/10 text-red-400 border-red-500/20",
    BEP20: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ERC20: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  };

  return (
    <div className="p-4 rounded-xl bg-dark-3/50 border border-border hover:border-neutral-700 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${badgeStyles[badgeLabel] || badgeStyles.ERC20}`}>
          {badgeLabel}
        </span>
        <span className="text-xs font-medium text-neutral-400">{network}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <code className="flex-1 text-xs sm:text-sm text-neutral-200 truncate select-all px-3 py-2 rounded-lg bg-dark/50 border border-border/50">
          {address}
        </code>
        <button 
          onClick={handleCopy}
          className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
            copied 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-dark hover:bg-neutral-800 text-neutral-300 border-border'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
