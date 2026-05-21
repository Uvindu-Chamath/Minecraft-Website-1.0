import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import PricingCard from '../components/PricingCard';
import PaymentModal from '../components/PaymentModal';
import Toast from '../components/Toast';
import logoImg from '../assets/logo.png';
import bitcoinImg from '../assets/bitcoin.png';
import ethereumImg from '../assets/ethereum.png';
import litecoinImg from '../assets/litecoin.png';
import solanaImg from '../assets/solana.png';
import usdCoinImg from '../assets/usd-coin.png';
import usdtImg from '../assets/usdt.png';

const RECENT_SALES = [
  { name: 'Alex M.', location: 'United States', product: 'Minecraft Key', coin: 'USDT (TRC20)', time: '2 mins ago' },
  { name: 'Sébastien K.', location: 'France', product: 'Minecraft Account', coin: 'USDC (Solana)', time: '4 mins ago' },
  { name: 'Hiroshi T.', location: 'Japan', product: 'Minecraft Key', coin: 'BTC', time: '7 mins ago' },
  { name: 'Oliver D.', location: 'United Kingdom', product: 'Minecraft Key', coin: 'LTC', time: '9 mins ago' },
  { name: 'Mateo R.', location: 'Spain', product: 'Minecraft Account', coin: 'USDT (BEP20)', time: '12 mins ago' },
  { name: 'Elena V.', location: 'Ukraine', product: 'Minecraft Key', coin: 'SOL', time: '15 mins ago' }
];

const FAQS = [
  {
    question: "Is this purchase permanent, and will I own the game forever?",
    answer: "Absolutely. License keys are 100% official retail keys that link permanently to your personal Microsoft account. You own the game forever, can download it from official launchers, and get all future game updates."
  },
  {
    question: "How does the automated blockchain payment system work?",
    answer: "Once you choose a product, our portal displays a unique transaction wallet. As soon as you transfer the funds, clicking 'Verify Payment' prompts our nodes to scan the blockchain mempools. Once the transaction is detected and cleared, your key is automatically decrypted and displayed on your screen."
  },
  {
    question: "How do I redeem my Minecraft License Key?",
    answer: "Redeeming is extremely easy: 1) Go to the official Microsoft activation website at redeem.microsoft.com. 2) Log in with your personal Microsoft Account. 3) Paste your 25-character license key. 4) The game is immediately added to your library, ready to play!"
  },
  {
    question: "Why are your keys cheaper than the official Minecraft store?",
    answer: "We purchase digital key bundles in bulk from authorized Microsoft wholesale distributors during major volume promotional clearance events. Since we pay no credit card merchant fees (using only direct crypto payments), we pass all those savings directly to you!"
  },
  {
    question: "What is your return and warranty policy?",
    answer: "Every single key and account sold comes with our Permanent Lifetime Warranty. If any license key fails to activate or displays an issue, our node logs will identify it, and you can contact support on WhatsApp or Telegram for an immediate replacement key or full refund."
  }
];

function FloatingBlocks() {
  const [blocks, setBlocks] = useState([]);
  
  useEffect(() => {
    const items = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 24,
      delay: Math.random() * 6,
      duration: 18 + Math.random() * 18,
      opacity: 0.03 + Math.random() * 0.05
    }));
    setBlocks(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{ y: '110vh', x: `${block.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, block.opacity, block.opacity, 0],
            rotate: 360
          }}
          transition={{
            duration: block.duration,
            repeat: Infinity,
            delay: block.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: block.size,
            height: block.size,
            border: '1.5px solid currentColor',
            color: 'var(--color-brand)',
            borderRadius: '4px'
          }}
        />
      ))}
    </div>
  );
}

function TermsOfServiceView({ onBackToStore }) {
  const [activeSection, setActiveSection] = useState('pipe');

  const sections = [
    {
      id: 'pipe',
      title: '1. Bulk Wholesale Pipeline',
      content: (
        <>
          <p className="mb-4 text-neutral-300 leading-relaxed text-xs sm:text-sm">
            CJMC acquires official retail activation credentials and license packages in high volumes directly from authorized enterprise distributors during wholesale clearance distributions. Because we deal strictly in bulk liquidations, our unit procurement cost is minimized.
          </p>
          <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
            By bypass-procuring physical media and utilizing digital-only distribution frameworks, we completely eliminate logistics overhead and pass these operational savings directly to our customers.
          </p>
        </>
      )
    },
    {
      id: 'crypto',
      title: '2. Crypto Payment & Exclusions',
      content: (
        <>
          <p className="mb-4 text-neutral-300 leading-relaxed text-xs sm:text-sm">
            CJMC enforces strict direct-ledger cryptocurrency payments (e.g. USDT, USDC, BTC, ETH, LTC, SOL). We do NOT support legacy fiat credit cards, PayPal, or bank wire transactions, which charge predatory merchant servicing fees.
          </p>
          <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
            All crypto transactions are permanent on-chain events. It is the buyer's sole responsibility to ensure funds are transferred to the precise designated wallet address on the correct matching blockchain network (e.g. TRC20 vs. BEP20 vs. ERC20). Senders assume all network fee adjustments (gas fees).
          </p>
        </>
      )
    },
    {
      id: 'verification',
      title: '3. Automated Scanner & Escrow',
      content: (
        <>
          <p className="mb-4 text-neutral-300 leading-relaxed text-xs sm:text-sm">
            Every order is held in an automated cryptographic escrow pending on-chain validation. Our decentralized node network monitors mempools and scans block indexes using your submitted transaction hash (TXID).
          </p>
          <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
            Upon detection of the matching hash with sufficient confirmations, the automated escrow protocol unlocks, decrypts, and displays your digital keys instantly. Submitting fake, altered, or incorrect TXIDs triggers node rejection flags and prevents credentials from releasing.
          </p>
        </>
      )
    },
    {
      id: 'warranty',
      title: '4. Lifetime Warranty Coverage',
      content: (
        <>
          <p className="mb-4 text-neutral-300 leading-relaxed text-xs sm:text-sm">
            Every license key and account sold by CJMC is backed by our permanent, lifetime warranty. If a license key displays activation errors, regional locks, or credential faults, our technical system will verify the issue against Microsoft registration databases.
          </p>
          <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
            Verified issues qualify for immediate replacement keys or a complete equivalent crypto refund. This warranty does not cover issues resulting from user account bans due to violating Microsoft's official End User License Agreement (EULA) after successful game activation.
          </p>
        </>
      )
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto px-6 py-12 relative z-10"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-extrabold text-brand uppercase tracking-widest bg-brand/10 border border-brand/20 px-3 py-1.5 rounded-full">
          Legal Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">Terms of Service</h1>
        <p className="text-neutral-400 text-xs sm:text-sm mt-3">Please read our digital bulk distribution policies carefully before completing checkout.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar Index Links */}
        <div className="md:col-span-1 space-y-2">
          <div className="sticky top-24 p-4 rounded-2xl bg-dark-2/45 border border-white/5 glass">
            <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-4 px-2">Table of Contents</h4>
            <div className="flex flex-col gap-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    const el = document.getElementById(`sec-${sec.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeSection === sec.id 
                      ? 'bg-brand/10 text-white border-l-2 border-brand font-bold pl-4' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sec.title.split('. ')[1]}
                </button>
              ))}
            </div>
            <button 
              onClick={onBackToStore}
              className="w-full mt-6 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-brand/15"
            >
              ← Back to Store
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="md:col-span-3 space-y-6">
          {sections.map((sec) => (
            <div 
              key={sec.id}
              id={`sec-${sec.id}`}
              onMouseEnter={() => setActiveSection(sec.id)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                activeSection === sec.id 
                  ? 'bg-dark-2/60 border-brand/35 shadow-lg shadow-brand/5' 
                  : 'bg-dark-2/30 border-white/5'
              }`}
            >
              <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-brand" />
                {sec.title}
              </h3>
              <div className="text-neutral-400 leading-relaxed">
                {sec.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ContactSupportView({ onBackToStore }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Validation Support',
    txid: '',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [ticketOpened, setTicketOpened] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all required fields (*).');
      return;
    }

    // Email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    // Simulate node submission and support ticket generation
    setTimeout(() => {
      const randHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
      setTicketId(`CJMC-TICKET-${randHex}`);
      setSubmitting(false);
      setTicketOpened(true);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto px-6 py-12 relative z-10"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          24/7 Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">Secure Support Desk</h1>
        <p className="text-neutral-400 text-xs sm:text-sm mt-3">Have questions about order verification, bulk discounts, or warranty claims? Hook our queue scanner.</p>
      </div>

      <AnimatePresence mode="wait">
        {!ticketOpened ? (
          <motion.div 
            key="contact-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-6 sm:p-10 rounded-3xl bg-dark-2/45 border border-white/5 glass-premium relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold flex items-center gap-2">
                  <span>⚠️</span> {formError}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2">Name *</label>
                  <input 
                    type="text" 
                    placeholder="Steve"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-all text-sm glass-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2">Email *</label>
                  <input 
                    type="email" 
                    placeholder="steve@minecraft.net"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-all text-sm glass-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-white focus:outline-none focus:border-brand transition-all text-sm glass-input"
                  >
                    <option value="Order Validation Support">Order Validation Support</option>
                    <option value="Lifetime Warranty Inquiry">Lifetime Warranty Inquiry</option>
                    <option value="Bulk Purchase Clearance">Bulk Purchase Clearance</option>
                    <option value="Technical Node Rejection">Technical Node Rejection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2">Transaction Hash (TXID) - Optional</label>
                  <input 
                    type="text" 
                    placeholder="0x... or Solana Signature"
                    value={formData.txid}
                    onChange={(e) => setFormData({...formData, txid: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-all text-sm glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2">Message *</label>
                <textarea 
                  rows="4"
                  placeholder="Details regarding your wholesale activation request..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-all text-sm glass-input resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-extrabold tracking-wide uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-lg shadow-brand/15"
                >
                  {submitting ? '🛡️ Registering Ledger...' : 'Secure Node Dispatch'}
                </button>
                <button 
                  type="button"
                  onClick={onBackToStore}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
              <a href="https://t.me/" target="_blank" className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/35 hover:bg-sky-500/5 transition-all text-[11px] font-bold text-neutral-400 hover:text-sky-400 cursor-pointer">
                💬 Telegram Support
              </a>
              <a href="https://wa.me/" target="_blank" className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/35 hover:bg-emerald-500/5 transition-all text-[11px] font-bold text-neutral-400 hover:text-emerald-400 cursor-pointer">
                🟢 WhatsApp Support
              </a>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold text-neutral-400">
                ⚡ Node Response: &lt;5m
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="contact-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 sm:p-10 rounded-3xl bg-dark-2/45 border border-[#10b981]/30 hover:border-[#10b981]/50 transition-all duration-300 glass-premium text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-6 text-emerald-400 animate-pulse">
              ✓
            </div>
            
            <h3 className="text-xl font-extrabold text-white mb-2">Ledger Dispatch Complete</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
              Your support ticket has been encrypted and distributed to our support nodes queue. An automated agent is reviewing your details now.
            </p>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 max-w-sm mx-auto mb-8">
              <div className="text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-1">Assigned Ticket ID</div>
              <div className="font-mono text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                {ticketId}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onBackToStore}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-brand/15"
              >
                Return to Store
              </button>
              <button 
                onClick={() => setTicketOpened(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [currentView, setCurrentView] = useState('store');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Cart and Discount States
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0); // 0.10 for 10% off

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Live Sales Ticker State
  const [currentSale, setCurrentSale] = useState(null);
  const [saleIndex, setSaleIndex] = useState(0);

  // Floating Support Chat Widget State
  const [supportOpen, setSupportOpen] = useState(false);
  const [isSupportTyping, setIsSupportTyping] = useState(false);
  const [supportHistory, setSupportHistory] = useState([
    { sender: 'bot', text: '👋 Welcome to the CJMC Store Support desk! I am your automated ledger and keys advisor.' },
    { sender: 'bot', text: 'Do you have any questions regarding our direct wholesale pricing, 30s auto-delivery system, or key redemption?' }
  ]);

  const handleSupportQuery = (queryText, answerText) => {
    // Prevent double clicking if currently replying
    if (isSupportTyping) return;
    setSupportHistory((prev) => [...prev, { sender: 'user', text: queryText }]);
    setIsSupportTyping(true);
    setTimeout(() => {
      setSupportHistory((prev) => [...prev, { sender: 'bot', text: answerText }]);
      setIsSupportTyping(false);
    }, 900);
  };

  // Rotate sales notifications
  useEffect(() => {
    const showNextSale = () => {
      setCurrentSale(RECENT_SALES[saleIndex]);
      setSaleIndex((prev) => (prev + 1) % RECENT_SALES.length);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setCurrentSale(null);
      }, 5000);
    };

    // First ticker starts after 8 seconds
    const timer = setInterval(showNextSale, 20000);
    return () => clearInterval(timer);
  }, [saleIndex]);

  // E-commerce Cart Operations
  const handleAddToCart = (productId, qty) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [
          ...prev,
          {
            id: productId,
            name: productId === 'key' ? 'Minecraft Key' : 'Minecraft Account',
            price: productId === 'key' ? 18 : 15,
            quantity: qty
          }
        ];
      }
    });
    showToast(`🛒 Sourced ${qty}x ${productId === 'key' ? 'Minecraft Key' : 'Minecraft Account'} to your cart!`);
    setCartOpen(true);
  };

  const handleBuyNow = (productId, qty) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(item.quantity, qty) } : item
        );
      } else {
        return [
          ...prev,
          {
            id: productId,
            name: productId === 'key' ? 'Minecraft Key' : 'Minecraft Account',
            price: productId === 'key' ? 18 : 15,
            quantity: qty
          }
        ];
      }
    });
    setModalOpen(true);
  };

  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from cart.');
  };

  const applyCouponCode = (code) => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQty < 2) {
      return { success: false, message: '✗ Coupon only available when purchasing at least 2 items.' };
    }
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CJMC20' || cleanCode === 'MINECRAFT') {
      setCouponApplied(true);
      setCouponDiscount(0.10); // 10% discount
      setCouponCode(cleanCode);
      return { success: true, message: '✓ Promo applied: 10% Discount unlocked!' };
    } else {
      return { success: false, message: '✗ Invalid promotion code.' };
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponCode('');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const result = applyCouponCode(couponCode);
    showToast(result.message);
  };

  // Automatically remove coupon if items count drops below 2
  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQty < 2 && couponApplied) {
      removeCoupon();
      showToast('ℹ️ Promo removed. Requires at least 2 items.');
    }
  }, [cart, couponApplied]);

  // Cart Calculators
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * couponDiscount;
  const cartTotal = subtotal - discountAmount;

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-brand/30 selection:text-white pb-24 relative overflow-x-hidden">
      <FloatingBlocks />
      {/* Top Banner Alert */}
      <div className="w-full bg-gradient-to-r from-brand/20 via-sky-600/30 to-emerald-500/20 border-b border-sky-500/10 py-2.5 text-center text-xs font-semibold tracking-wider text-sky-200">
        ⚡ PROMOTION: Bulk Wholesale Clearance Slashed by 45%. Secure Crypto Checkout Enforced. Use promo code CJMC20 inside cart!
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-40 bg-dark/70 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => setCurrentView('store')} 
            className="font-extrabold text-xl tracking-tight flex items-center gap-2 cursor-pointer select-none"
          >
            <img src={logoImg} alt="CJMC Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-brand/20 object-cover border border-white/10" />
            <span className="text-white">CJ<span className="text-brand">MC</span></span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button 
              onClick={() => setCurrentView('store')}
              className={`font-semibold transition-all cursor-pointer ${currentView === 'store' ? 'text-brand' : 'text-neutral-400 hover:text-white'}`}
            >
              Store
            </button>
            <button 
              onClick={() => setCurrentView('terms')}
              className={`font-semibold transition-all cursor-pointer ${currentView === 'terms' ? 'text-brand' : 'text-neutral-400 hover:text-white'}`}
            >
              Terms
            </button>
            <button 
              onClick={() => setCurrentView('contact')}
              className={`font-semibold transition-all cursor-pointer ${currentView === 'contact' ? 'text-brand' : 'text-neutral-400 hover:text-white'}`}
            >
              Support Desk
            </button>
            <a href="#faq" onClick={() => setCurrentView('store')} className="text-neutral-400 hover:text-white transition-colors font-semibold hidden sm:inline">
              FAQ
            </a>
            <div className="h-4 w-px bg-white/10 hidden sm:inline" />
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Gateways Secured
            </div>

            {/* Theme Toggle Button */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand/45 text-white hover:bg-brand/10 transition-all flex items-center justify-center cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Visual Cart Icon Button with Badge */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand/45 text-white hover:bg-brand/10 transition-all flex items-center justify-center cursor-pointer"
              title="Open Shopping Cart"
            >
              <span className="text-lg">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand text-[10px] font-black flex items-center justify-center text-white border border-dark animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {currentView === 'store' && (
        <>
          {/* Trustpilot Horizontal Bar */}
          <div className="bg-dark-2/40 border-b border-white/5 py-4">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-1 text-emerald-400 font-bold tracking-tight text-sm">
                <span className="text-white font-normal mr-1">Rated Excellent on</span> 
                <span className="bg-emerald-500 text-dark px-1.5 py-0.5 rounded font-black text-xs">Trustpilot</span>
                <span className="text-emerald-400 ml-1">★ ★ ★ ★ ★</span>
              </div>
              <span className="hidden sm:inline text-neutral-700">|</span>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                Based on <strong className="text-neutral-300">8,421+ independent shopper reviews</strong> with a 4.9/5 satisfaction index.
              </p>
            </div>
          </div>

          <Hero 
            onBuyKey={() => handleBuyNow('key', 1)}
            onBuyAccount={() => handleBuyNow('account', 1)}
          />

          {/* Pricing Cards Section */}
          <section className="max-w-5xl mx-auto px-6 relative z-10 py-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Transparent Direct Pricing</h2>
              <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
                No merchant processing markups. Direct blockchain transfer enables absolute lowest wholesale rates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <PricingCard 
                title="Minecraft Key"
                price="18"
                isPopular={true}
                features={[
                  "Official Minecraft Java & Bedrock Key",
                  "Redeemable on official Microsoft portal",
                  "Linked forever to your personal email",
                  "100% Automated Instant Key delivery",
                  "Permanent Lifetime warranty protection"
                ]}
                onAddToCart={(qty) => handleAddToCart('key', qty)}
                onBuyNow={(qty) => handleBuyNow('key', qty)}
              />
              <PricingCard 
                title="Minecraft Account"
                price="15"
                isPopular={false}
                features={[
                  "Full email access included",
                  "Change password, skins, and usernames",
                  "Instant account credentials display",
                  "Completely private & unbanned",
                  "Permanent replacement guarantee"
                ]}
                onAddToCart={(qty) => handleAddToCart('account', qty)}
                onBuyNow={(qty) => handleBuyNow('account', qty)}
              />
            </div>
          </section>

          {/* Why Choose Us & Trust Badges Section */}
          <section className="max-w-5xl mx-auto px-6 py-20 relative z-10 border-t border-white/5 mt-12">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold text-brand uppercase tracking-widest bg-brand/10 border border-brand/20 px-3 py-1.5 rounded-full">
                Value Proposition
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">Why Choose CJMC</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Security */}
              <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="font-bold text-white mb-2">Fortified Security & Guarantee</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Your purchase is fully protected. All items are 100% genuine Microsoft retail licenses, complete with a permanent lifetime warranty and cryptographic validation.
                </p>
              </div>

              {/* Price */}
              <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
                  🏷️
                </div>
                <h3 className="font-bold text-white mb-2">Unbeatable Wholesale Prices</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We purchase digital packages in massive wholesale lots during liquidation events. With no credit card transaction fees, we pass direct savings of up to 60% straight to you.
                </p>
              </div>

              {/* Speed */}
              <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="font-bold text-white mb-2">Automated Instant Delivery</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No support queue delays or manual audits. Our automated mempool validator nodes sweep payments and decrypt your game codes to your screen in under 60 seconds.
                </p>
              </div>
            </div>

            {/* Security Seals & Accepted Cryptos */}
            <div className="mt-16 py-8 px-8 rounded-3xl bg-dark-2/30 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col items-center lg:items-start gap-1.5 relative z-10">
                <span className="text-neutral-500 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  🔒 SECURED BY CRYPTOGRAPHIC LEDGERS
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-neutral-400 font-medium mt-1">
                  <span className="flex items-center gap-1"><span className="text-emerald-400">🛡️</span> SSL Shielded</span>
                  <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> McAfee Verified</span>
                  <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Escrow Protected</span>
                </div>
              </div>

              {/* Live Ledger Ticker */}
              <div className="flex flex-col items-center bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl relative z-10 text-center">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Ledger Status
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 text-emerald-400">
                    🟢 12 Nodes Active
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-neutral-300">Scan: 24s Avg</span>
                  <span className="text-white/20">|</span>
                  <span className="text-sky-400">Gas: Optimal</span>
                </div>
              </div>

              {/* Accepted Cryptos with Real Color PNGs */}
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                {/* Tether */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#26A17B]/30 hover:bg-[#26A17B]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="Tether (USDT)">
                  <img src={usdtImg} alt="Tether Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
                {/* USDC */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#2775CA]/30 hover:bg-[#2775CA]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="USD Coin (USDC)">
                  <img src={usdCoinImg} alt="USD Coin Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
                {/* Bitcoin */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#F7931A]/30 hover:bg-[#F7931A]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="Bitcoin (BTC)">
                  <img src={bitcoinImg} alt="Bitcoin Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
                {/* Ethereum */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#627EEA]/30 hover:bg-[#627EEA]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="Ethereum (ETH)">
                  <img src={ethereumImg} alt="Ethereum Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
                {/* Solana */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#14F195]/30 hover:bg-[#14F195]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="Solana (SOL)">
                  <img src={solanaImg} alt="Solana Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
                {/* Litecoin */}
                <div className="group relative p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#345D9D]/30 hover:bg-[#345D9D]/5 hover:scale-[1.05] transition-all duration-300 cursor-pointer" title="Litecoin (LTC)">
                  <img src={litecoinImg} alt="Litecoin Logo" className="w-6 h-6 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                </div>
              </div>
            </div>
          </section>

          {/* How it Works Roadmap */}
          <section className="max-w-5xl mx-auto px-6 py-20 relative z-10 border-t border-white/5 mt-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight">How Automated Delivery Works</h2>
              <p className="text-neutral-400 text-sm mt-3">Simple 3-step blockchain acquisition pipeline.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand/20 via-emerald-500/20 to-brand/20 z-0" />
              
              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-dark-2 border border-brand/20 flex items-center justify-center font-bold text-brand mx-auto mb-6 shadow-md shadow-brand/5 text-lg">
                  1
                </div>
                <h4 className="font-bold text-white mb-2">Add & Configure</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Add your keys or accounts to the shopping cart, adjust quantities, apply discounts, and configure checkout.
                </p>
              </div>

              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-dark-2 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 mx-auto mb-6 shadow-md shadow-emerald-500/5 text-lg">
                  2
                </div>
                <h4 className="font-bold text-white mb-2">Send Secured Transfer</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Transfer funds directly to the selected crypto address. Submitting your TXID hooks our validator scanner.
                </p>
              </div>

              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-dark-2 border border-brand/20 flex items-center justify-center font-bold text-brand mx-auto mb-6 shadow-md shadow-brand/5 text-lg">
                  3
                </div>
                <h4 className="font-bold text-white mb-2">Verification Scan Delivery</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Our node scans the ledger block indexes using your hash, confirms confirmations, and decrypts your keys on screen.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Accordions Section */}
          <section id="faq" className="max-w-3xl mx-auto px-6 py-12 relative z-10 border-t border-white/5">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-neutral-400 text-xs mt-3">Everything you need to know about keys and checkout.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="rounded-2xl border border-white/5 bg-dark-2/45 overflow-hidden transition-all duration-300 hover:border-white/10"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-white text-sm sm:text-base hover:bg-white/5 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <span className={`text-brand text-lg transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-45' : ''}`}>
                        ＋
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="p-5 pt-0 border-t border-white/5 text-xs sm:text-sm text-neutral-400 leading-relaxed bg-dark/20">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Customer Testimonials Reviews */}
          <section className="max-w-5xl mx-auto px-6 py-20 relative z-10 border-t border-white/5">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight">Verified Buyer Testimonials</h2>
              <p className="text-neutral-400 text-xs mt-3">Real reviews from our awesome global gaming community.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Sébastien K.", location: "France", text: "I was extremely skeptical at first because of the crypto requirement, but the checkout was brilliant! Clicked 'Verify' and the key showed up literally 45 seconds later. Verified on my Microsoft account and installing the game right now. 10/10!", stars: "★★★★★", date: "Yesterday" },
                { name: "Markus D.", location: "Germany", text: "Minecraft bulk discounts are real. Transferred LTC from my Binance account, got the confirmation ticker within 2 minutes, and copied my Java retail code. Super smooth layout and absolutely trustworthy platform.", stars: "★★★★★", date: "3 days ago" },
                { name: "Sarah L.", location: "United States", text: "Lifetime warranty sold me. I purchased a full access account, had a small username change question, and support resolved it on WhatsApp within minutes. Genuine details, fully unbanned email, highly recommended!", stars: "★★★★★", date: "1 week ago" }
              ].map((rev, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-400 text-sm font-bold">{rev.stars}</span>
                      <span className="text-[10px] text-neutral-500">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-xs font-bold text-brand">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                         {rev.name}
                        <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1 py-0.2 rounded font-semibold">Verified</span>
                      </h5>
                      <p className="text-[10px] text-neutral-500">{rev.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {currentView === 'terms' && (
        <TermsOfServiceView onBackToStore={() => setCurrentView('store')} />
      )}
      {currentView === 'contact' && (
        <ContactSupportView onBackToStore={() => setCurrentView('store')} />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 text-center text-xs sm:text-sm text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
              <img src={logoImg} alt="CJMC Logo" className="w-6 h-6 rounded-md object-cover border border-white/10" />
              <span>CJ<span className="text-brand">MC</span></span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">© 2026 CJMC. All rights reserved. Sourced wholesales.</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-[9px] text-neutral-600 mt-3 md:mt-2 select-none">
              <a href="https://www.flaticon.com/free-icons/cryptocurrency" target="_blank" rel="noopener noreferrer" title="cryptocurrency icons" className="hover:text-brand transition-colors">Cryptocurrency icons created by Freepik - Flaticon</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="https://www.flaticon.com/free-icons/usdc" target="_blank" rel="noopener noreferrer" title="usdc icons" className="hover:text-brand transition-colors">Usdc icons created by bouzix - Flaticon</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="https://www.flaticon.com/free-icons/solana" target="_blank" rel="noopener noreferrer" title="solana icons" className="hover:text-brand transition-colors">Solana icons created by bouzix - Flaticon</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="https://www.flaticon.com/free-icons/coin" target="_blank" rel="noopener noreferrer" title="coin icons" className="hover:text-brand transition-colors">Coin icons created by bouzix - Flaticon</a>
              <span className="text-neutral-700 hidden sm:inline">•</span>
              <a href="https://www.flaticon.com/free-icons/ltc" target="_blank" rel="noopener noreferrer" title="ltc icons" className="hover:text-brand transition-colors">Ltc icons created by bouzix - Flaticon</a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button 
              onClick={() => setCurrentView('store')}
              className={`transition-colors cursor-pointer font-medium ${currentView === 'store' ? 'text-brand' : 'text-neutral-500 hover:text-white'}`}
            >
              Storefront
            </button>
            <span className="text-white/10 hidden sm:inline">|</span>
            <button 
              onClick={() => setCurrentView('terms')}
              className={`transition-colors cursor-pointer font-medium ${currentView === 'terms' ? 'text-brand' : 'text-neutral-500 hover:text-white'}`}
            >
              Terms of Service
            </button>
            <span className="text-white/10 hidden sm:inline">|</span>
            <button 
              onClick={() => setCurrentView('contact')}
              className={`transition-colors cursor-pointer font-medium ${currentView === 'contact' ? 'text-brand' : 'text-neutral-500 hover:text-white'}`}
            >
              Support Desk
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Sales Notification Ticker (High-fidelity Shopify-style Widget) */}
      <AnimatePresence>
        {currentSale && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="fixed bottom-6 left-6 z-[100] p-4 rounded-3xl bg-dark-2/95 border border-white/5 text-white text-xs shadow-2xl backdrop-blur-lg max-w-sm flex items-center gap-3.5 shadow-brand/5 select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-xl shrink-0">
              {currentSale.product === 'Minecraft Key' ? '🔑' : '👤'}
            </div>
            <div className="leading-normal flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">
                  Verified Order Cleared
                </p>
              </div>
              <p className="font-semibold text-neutral-200">
                <strong className="text-white">{currentSale.name}</strong> bought <strong className="text-brand">{currentSale.product}</strong>
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                <span>📍 {currentSale.location}</span> • <span>{currentSale.coin}</span> • <span>{currentSale.time}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Customer Support Chat Desk Bubble & Interactive Widget */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        {/* Support Chat Box */}
        <AnimatePresence>
          {supportOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="mb-4 w-[340px] sm:w-[380px] h-[480px] rounded-3xl bg-dark-2/95 border border-white/10 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 bg-gradient-to-r from-brand/10 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-lg">
                    🛠️
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-dark" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">CJMC Support Desk</h4>
                    <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                      <span>🤖</span> Automated Assistant • Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSupportOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Chat Message Logs Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin select-none">
                {supportHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-semibold ${
                        msg.sender === 'user'
                          ? 'bg-brand text-white rounded-tr-none'
                          : 'bg-white/5 border border-white/5 text-neutral-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isSupportTyping && (
                  <div className="flex gap-1.5 items-center bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none self-start w-16 justify-center">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              {/* Chat Quick Answers Menu */}
              <div className="p-4 border-t border-white/5 bg-dark-3 space-y-2">
                <div className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest mb-1.5">ASK A QUESTION:</div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() =>
                      handleSupportQuery(
                        "🔑 How do I redeem my Minecraft license key?",
                        "Redeeming keys is instant! Head over to official portal at redeem.microsoft.com, sign in with your personal Microsoft account, and paste the 25-character license key you copied from your checkout invoice screen or text receipt. The game will be linked to your account forever!"
                      )
                    }
                    className="w-full text-left py-2 px-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand/40 text-neutral-300 hover:text-white font-bold text-[10px] transition-all cursor-pointer truncate"
                  >
                    🔑 How do I redeem my license key?
                  </button>
                  <button
                    onClick={() =>
                      handleSupportQuery(
                        "⏱️ How fast is payment verification?",
                        "Typically within 30 to 60 seconds! Once you send your transaction on the network (EVM, Bitcoin, or Solana) and click 'Validate Block Reference' with your email & TXID hash, our RPC nodes query the blockchain mempools immediately and release your key upon verification."
                      )
                    }
                    className="w-full text-left py-2 px-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand/40 text-neutral-300 hover:text-white font-bold text-[10px] transition-all cursor-pointer truncate"
                  >
                    ⏱️ How fast is payment verification?
                  </button>
                  <button
                    onClick={() =>
                      handleSupportQuery(
                        "🛡️ What details are checked by RPC?",
                        "Our secure blockchain RPC query reads the transaction hash to verify three properties: 1) the target address matches our escrow address, 2) the transaction coin amount matches your USD subtotal, and 3) the transaction signature has not been processed before to avoid double spending."
                      )
                    }
                    className="w-full text-left py-2 px-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand/40 text-neutral-300 hover:text-white font-bold text-[10px] transition-all cursor-pointer truncate"
                  >
                    🛡️ What details are checked by RPC?
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Chat Pulse Bubble Button */}
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className="px-5 py-3.5 rounded-2xl bg-dark-2 hover:bg-neutral-900 border border-brand/20 hover:border-brand/50 text-white font-black text-xs shadow-2xl flex items-center gap-2.5 cursor-pointer transition-all active:scale-95 group shadow-brand/5"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold">💬 Live Support Advisor</span>
        </button>
      </div>

      {/* Slide-over Cart Sidebar Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-dark-2 border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl glass-premium"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🛒</span>
                  <h3 className="text-lg font-extrabold text-white">Your Shopping Cart</h3>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 hover:border-white/15 text-neutral-400 hover:text-white flex items-center justify-center text-sm font-semibold transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Items Body */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                    <span className="text-5xl block animate-bounce">🛒</span>
                    <h4 className="text-white font-bold text-base">Your Cart is Empty</h4>
                    <p className="text-xs text-neutral-500 max-w-xs leading-normal">
                      Explore our official wholesale products below to load premium license keys and accounts.
                    </p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold shadow-lg shadow-brand/10 hover:bg-sky-400 transition-all cursor-pointer"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 rounded-2xl bg-dark border border-white/5 flex items-center justify-between gap-4 relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-lg shrink-0">
                          {item.id === 'key' ? '🔑' : '👤'}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                          <p className="text-xs text-neutral-400 mt-0.5">${item.price} each</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Inline quantity adjuster */}
                        <div className="flex items-center bg-dark-2 border border-white/5 rounded-lg p-0.5">
                          <button 
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-neutral-900 text-neutral-400 font-bold hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            －
                          </button>
                          <span className="text-xs font-bold text-white px-2.5">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-neutral-900 text-neutral-400 font-bold hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            ＋
                          </button>
                        </div>

                        {/* Trash Button */}
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Summaries */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-6 space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input 
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={cart.reduce((acc, item) => acc + item.quantity, 0) < 2 ? "Requires 2+ items" : "PROMO CODE (e.g. CJMC20)"}
                      disabled={couponApplied || cart.reduce((acc, item) => acc + item.quantity, 0) < 2}
                      className="flex-1 px-3 py-2.5 rounded-xl bg-dark border border-white/10 text-xs focus:outline-none focus:border-brand text-white placeholder:text-neutral-600 font-bold uppercase tracking-wider disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={couponApplied || cart.reduce((acc, item) => acc + item.quantity, 0) < 2}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/5 text-white hover:text-brand hover:border-brand/30 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>

                  {cart.reduce((acc, item) => acc + item.quantity, 0) < 2 && (
                    <p className="text-[10px] text-neutral-500 font-bold flex items-center gap-1">
                      <span>⚠️</span> Promo code available only if purchasing 2 or more items.
                    </p>
                  )}

                  {couponApplied && (
                    <p className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-pulse">
                      <span>✓</span> PROMO ACTIVE: 10% Discount applied successfully.
                    </p>
                  )}

                  {/* Totals Summary */}
                  <div className="space-y-2 text-xs text-neutral-400">
                    <div className="flex justify-between">
                      <span>Cart Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400">
                        <span>10% Coupon Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm">
                      <span className="font-extrabold text-white">Total Order Value</span>
                      <strong className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-400 text-lg font-black">
                        ${cartTotal.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      setModalOpen(true);
                    }}
                    className="w-full py-4 rounded-2xl bg-brand text-white font-extrabold text-sm tracking-wide shadow-xl shadow-brand/20 hover:bg-sky-400 hover:shadow-brand/35 transition-all flex items-center justify-center gap-2 cursor-pointer border border-sky-400/20"
                  >
                    ⚡ Secure Crypto Checkout
                  </button>
                  <p className="text-[10px] text-center text-neutral-600 font-semibold tracking-wide uppercase">
                    🛡️ SSL Secured • Encrypted mempool scanner
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Payment Modal */}
      {modalOpen && cart.length > 0 && (
        <PaymentModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          cart={cart}
          couponApplied={couponApplied}
          couponDiscount={couponDiscount}
          onApplyCoupon={applyCouponCode}
          onRemoveCoupon={removeCoupon}
          onClearCart={() => setCart([])}
          onCopy={(msg) => showToast(msg)}
        />
      )}

      {/* Custom Toast Alert */}
      <Toast 
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
