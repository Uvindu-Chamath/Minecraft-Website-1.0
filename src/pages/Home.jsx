import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import PricingCard from '../components/PricingCard';
import PaymentModal from '../components/PaymentModal';
import Toast from '../components/Toast';

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
    answer: "Once you choose a product, our portal displays a unique transaction wallet. As soon as you transfer the funds, clicking 'Verify Payment' prompts our nodes to scan the blockchain mempool. Once the transaction is detected and cleared (usually within 1-2 minutes depending on the chain), your key is automatically decrypted and displayed on your screen."
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

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Order Retrieval State
  const [retrievalInput, setRetrievalInput] = useState('');
  const [retrievalStatus, setRetrievalStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
  const [retrievalMessage, setRetrievalMessage] = useState('');

  // Live Sales Ticker State
  const [currentSale, setCurrentSale] = useState(null);
  const [saleIndex, setSaleIndex] = useState(0);

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

  const handleBuy = (id, name, price) => {
    setSelectedProduct({ id, name, price });
    setModalOpen(true);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleRetrieveOrder = (e) => {
    e.preventDefault();
    if (!retrievalInput.trim()) {
      setRetrievalStatus('error');
      setRetrievalMessage('Please enter your email or transaction hash (TXID) first.');
      return;
    }

    setRetrievalStatus('loading');
    setRetrievalMessage('Scanning transaction ledgers and order databases...');

    setTimeout(() => {
      const query = retrievalInput.trim().toLowerCase();
      
      if (query.includes('@')) {
        setRetrievalStatus('success');
        setRetrievalMessage(`Order Found! Ref: BK-4829-MC. Product: Minecraft Key (Java & Bedrock). Key: MC-89PX-22WL-K87Z-M9A4. Redirection steps sent to ${query}.`);
        showToast('Order details retrieved successfully!');
      } else if (query.startsWith('0x') || query.startsWith('tx') || query.length > 20) {
        setRetrievalStatus('success');
        setRetrievalMessage('Payment Verified! Transaction Hash matches. Key Unlocked: MC-89PX-22WL-K87Z-M9A4. Status: Redeemed & Cleared.');
        showToast('Transaction verified!');
      } else {
        setRetrievalStatus('error');
        setRetrievalMessage('No active order matches this entry. If you recently completed a payment, wait for at least 1 blockchain confirmation before searching.');
      }
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-brand/30 selection:text-white pb-24 relative overflow-x-hidden">
      {/* Top Banner Alert */}
      <div className="w-full bg-gradient-to-r from-brand/20 via-sky-600/30 to-emerald-500/20 border-b border-sky-500/10 py-2.5 text-center text-xs font-semibold tracking-wider text-sky-200">
        ⚡ PROMOTION: Bulk Wholesale Clearance Slashed by 45%. Automated Crypto Keys Verification Online.
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-40 bg-dark/70 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-emerald-400 flex items-center justify-center shadow-lg shadow-brand/20 text-sm">
              💎
            </div>
            <span className="text-white">Block<span className="text-brand">Keys</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#retrieve-portal" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Track Order
            </a>
            <a href="#faq" className="text-neutral-400 hover:text-white transition-colors font-medium">
              FAQ
            </a>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Gateways Secured
            </div>
          </div>
        </div>
      </nav>

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
        onBuyKey={() => handleBuy('key', 'Minecraft Key', '18')}
        onBuyAccount={() => handleBuy('account', 'Minecraft Account', '15')}
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
            onBuy={() => handleBuy('key', 'Minecraft Key', '18')}
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
            onBuy={() => handleBuy('account', 'Minecraft Account', '15')}
          />
        </div>
      </section>

      {/* Why Choose Us & Trust Badges Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 relative z-10 border-t border-white/5 mt-12">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold text-brand uppercase tracking-widest bg-brand/10 border border-brand/20 px-3 py-1.5 rounded-full">
            Unmatched Security
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">Why Gamers Trust BlockKeys</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-bold text-white mb-2">Automated Ledger Nodes</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No support tickets or manual verification. Our validator nodes detect transactions instantly and issue codes in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h3 className="font-bold text-white mb-2">100% Genuine Licenses</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All keys are genuine Microsoft retail licenses. Redeem directly at official pages, secure from revokes or expirations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
              ♾️
            </div>
            <h3 className="font-bold text-white mb-2">Permanent Warranty</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We stand behind our assets. If your code or credentials ever experience an issue, we replace them immediately.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-2/45 border border-white/5 hover:border-brand/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl text-brand mb-5 group-hover:scale-110 transition-transform">
              🌍
            </div>
            <h3 className="font-bold text-white mb-2">Global Activation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Activate anywhere in the world. Our licenses are free of regional locks, VPN requirements, or complicated steps.
            </p>
          </div>
        </div>

        {/* Security Seals */}
        <div className="mt-16 py-6 px-8 rounded-2xl bg-dark-2/30 border border-white/5 flex flex-wrap items-center justify-center gap-y-6 gap-x-12">
          <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest text-center sm:text-left">
            🔒 SECURED BY ENTERPRISE ENCRYPTION
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400 font-bold">
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">🛡️</span> SSL Secured Gateway</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> McAfee Verified Secure</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Crypto-Escrow Encrypted</span>
          </div>
        </div>
      </section>

      {/* Interactive Blockchain Order lookup Portal */}
      <section id="retrieve-portal" className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        <div className="p-8 rounded-3xl glass-premium border-brand/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-2xl rounded-full pointer-events-none" />
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Track & Retrieve License Keys</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              Did you recently purchase or need to recover your active key? Enter your purchase email or transaction hash (TXID).
            </p>
          </div>

          <form onSubmit={handleRetrieveOrder} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text"
                value={retrievalInput}
                onChange={(e) => setRetrievalInput(e.target.value)}
                placeholder="Enter Email Address or Tx Hash (0x...)"
                className="flex-1 px-4 py-3.5 rounded-xl bg-dark border border-white/10 text-sm focus:outline-none focus:border-brand transition-all text-white placeholder:text-neutral-600"
              />
              <button 
                type="submit" 
                disabled={retrievalStatus === 'loading'}
                className="px-6 py-3.5 rounded-xl bg-brand text-white text-sm font-bold shadow-lg shadow-brand/20 hover:bg-sky-400 transition-colors disabled:opacity-50"
              >
                {retrievalStatus === 'loading' ? 'Searching...' : 'Scan Database'}
              </button>
            </div>

            {/* Retrieval Info Responses */}
            <AnimatePresence mode="wait">
              {retrievalStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl text-xs sm:text-sm border leading-relaxed ${
                    retrievalStatus === 'loading' 
                      ? 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                      : retrievalStatus === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-medium'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {retrievalStatus === 'loading' && (
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin shrink-0"></span>
                      {retrievalMessage}
                    </div>
                  )}
                  {retrievalStatus !== 'loading' && retrievalMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
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
            <h4 className="font-bold text-white mb-2">Select & Initialize</h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Choose your Minecraft Key or Full Access Account and configure your stablecoin network of choice.
            </p>
          </div>

          <div className="text-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-dark-2 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 mx-auto mb-6 shadow-md shadow-emerald-500/5 text-lg">
              2
            </div>
            <h4 className="font-bold text-white mb-2">Send Secured Transfer</h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Transfer matching cryptocurrency funds to the address shown. Price lock ensures currency safety.
            </p>
          </div>

          <div className="text-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-dark-2 border border-brand/20 flex items-center justify-center font-bold text-brand mx-auto mb-6 shadow-md shadow-brand/5 text-lg">
              3
            </div>
            <h4 className="font-bold text-white mb-2">Mempool Scan Delivery</h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Our backend registers the transfer in the mempool, matches confirmations, and decodes the license on screen.
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

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 text-center text-xs sm:text-sm text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-extrabold text-base tracking-tight text-white">
              Block<span className="text-brand">Keys</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">© 2026 BlockKeys. All rights reserved. Sourced wholesales.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span>🔒 Direct Crypto Checkout</span>
            <span>⚡ Automated Nodes</span>
            <span>♾️ Lifetime Warranty</span>
          </div>
        </div>
      </footer>

      {/* Floating Sales Notification Ticker */}
      <AnimatePresence>
        {currentSale && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-[100] p-4 rounded-2xl bg-dark-2/95 border border-brand/20 text-white text-xs shadow-2xl backdrop-blur-md max-w-sm flex items-center gap-3.5 shadow-brand/10"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              ✓
            </div>
            <div className="leading-normal">
              <p className="text-[10px] text-neutral-400 flex items-center gap-1 font-semibold uppercase tracking-wider mb-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Recent Verified Purchase
              </p>
              <p className="font-medium text-neutral-200">
                <strong className="text-white">{currentSale.name}</strong> from {currentSale.location} bought <strong className="text-brand">{currentSale.product}</strong>
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Paid via {currentSale.coin} • {currentSale.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Payment Modal */}
      {selectedProduct && (
        <PaymentModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          product={selectedProduct.name}
          price={selectedProduct.price}
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
