import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const COINS = {
  USDT: {
    name: 'Tether',
    symbol: '₮',
    color: '#26A17B',
    bgColor: 'rgba(38, 161, 123, 0.1)',
    borderColor: 'rgba(38, 161, 123, 0.2)',
    networks: [
      { id: 'trc20', label: 'TRC20', name: 'USDT · TRON Network', address: 'TAadEHN4nPKVAVkb9CYB1ZXpExz3iCYqbo' },
      { id: 'bep20', label: 'BEP20', name: 'USDT · BSC Network', address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60' },
      { id: 'erc20', label: 'ERC20', name: 'USDT · Ethereum Network', address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60' },
      { id: 'solana', label: 'SOLANA', name: 'USDT · Solana Network', address: 'B2dGHP4nPKVAVkb9CYB1ZXpExz3iCYqbo19A2' }
    ]
  },
  USDC: {
    name: 'USD Coin',
    symbol: '$',
    color: '#2775CA',
    bgColor: 'rgba(39, 117, 202, 0.1)',
    borderColor: 'rgba(39, 117, 202, 0.2)',
    networks: [
      { id: 'bep20', label: 'BEP20', name: 'USDC · BSC Network', address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60' },
      { id: 'erc20', label: 'ERC20', name: 'USDC · Ethereum Network', address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60' },
      { id: 'polygon', label: 'POLYGON', name: 'USDC · Polygon Network', address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60' },
      { id: 'solana', label: 'SOLANA', name: 'USDC · Solana Network', address: 'B2dGHP4nPKVAVkb9CYB1ZXpExz3iCYqbo19A2' }
    ]
  },
  BTC: {
    name: 'Bitcoin',
    symbol: '₿',
    color: '#F7931A',
    bgColor: 'rgba(247, 147, 26, 0.1)',
    borderColor: 'rgba(247, 147, 26, 0.2)',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    networkName: 'Bitcoin Mainnet'
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'Ξ',
    color: '#627EEA',
    bgColor: 'rgba(98, 126, 234, 0.1)',
    borderColor: 'rgba(98, 126, 234, 0.2)',
    address: '0xedcf8fae99b463e84bee1776f937a71a149f7c60',
    networkName: 'Ethereum Network (ERC20)'
  },
  SOL: {
    name: 'Solana',
    symbol: '◎',
    color: '#14F195',
    bgColor: 'rgba(20, 241, 149, 0.1)',
    borderColor: 'rgba(20, 241, 149, 0.2)',
    address: 'B2dGHP4nPKVAVkb9CYB1ZXpExz3iCYqbo19A2',
    networkName: 'Solana Mainnet'
  },
  LTC: {
    name: 'Litecoin',
    symbol: 'Ł',
    color: '#345D9D',
    bgColor: 'rgba(52, 93, 157, 0.1)',
    borderColor: 'rgba(52, 93, 157, 0.2)',
    address: 'LQL9xkgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    networkName: 'Litecoin Mainnet'
  }
};

// Simulated exchange conversions matching USD prices
const CONVERSIONS = {
  18: { USDT: '18.00', USDC: '18.00', BTC: '0.00027', ETH: '0.0056', SOL: '0.115', LTC: '0.218' },
  15: { USDT: '15.00', USDC: '15.00', BTC: '0.00022', ETH: '0.0047', SOL: '0.096', LTC: '0.182' }
};

export default function PaymentModal({ isOpen, onClose, product, price, onCopy }) {
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  
  // Timer state (15:00 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // checkout stages: 'paying', 'verifying', 'success'
  const [checkoutStage, setCheckoutStage] = useState('paying');
  const [verificationLogs, setVerificationLogs] = useState([]);
  const [progressVal, setProgressVal] = useState(0);

  // Generated Minecraft keys/details
  const [generatedKey, setGeneratedKey] = useState('');
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  // Reset states when modal changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeLeft(900);
      setCheckoutStage('paying');
      setVerificationLogs([]);
      setProgressVal(0);
      setCopiedAddress(false);
      setCopiedKey(false);
      
      // Select first network for multi-network stablecoins
      if (COINS[selectedCoin].networks) {
        setSelectedNetwork(COINS[selectedCoin].networks[0]);
      } else {
        setSelectedNetwork(null);
      }

      // Generate randomized keys for this specific checkout session
      if (product.includes('Key')) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const parts = Array.from({ length: 5 }, () => 
          Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
        );
        setGeneratedKey(parts.join('-'));
      } else {
        const randNum = Math.floor(Math.random() * 9000) + 1000;
        setGeneratedCredentials({
          email: `bk_minecraft${randNum}@blockkeys-mail.com`,
          password: `McAuthPass${Math.floor(Math.random() * 89999 + 10000)}`
        });
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, selectedCoin]);

  // Countdown clock loop
  useEffect(() => {
    if (!isOpen || timeLeft <= 0 || checkoutStage !== 'paying') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, timeLeft, checkoutStage]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getActiveAddress = () => {
    if (COINS[selectedCoin].networks && selectedNetwork) {
      return selectedNetwork.address;
    }
    return COINS[selectedCoin].address;
  };

  const getActiveNetworkLabel = () => {
    if (COINS[selectedCoin].networks && selectedNetwork) {
      return selectedNetwork.label;
    }
    return COINS[selectedCoin].networkName;
  };

  const handleCopyText = (text, type) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'address') {
          setCopiedAddress(true);
          onCopy('Copied deposit address to clipboard!');
          setTimeout(() => setCopiedAddress(false), 2000);
        } else if (type === 'key') {
          setCopiedKey(true);
          onCopy('Copied Minecraft license key!');
          setTimeout(() => setCopiedKey(false), 2000);
        }
      });
    }
  };

  const triggerVerification = () => {
    setCheckoutStage('verifying');
    const logs = [
      { text: '[INIT] Initializing cryptographic node handshake...', delay: 0, progress: 5 },
      { text: '[CONNECT] Connecting to decentralized block indices...', delay: 1000, progress: 15 },
      { text: `[SCAN] Scanning ${selectedCoin} mempool for incoming transfers...`, delay: 2500, progress: 30 },
      { text: `[PENDING] Transaction detected! TXID: 0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`, delay: 4200, progress: 48 },
      { text: '[CONFIRM] Confirming block receipt: 1 of 3 confirmations recorded.', delay: 6000, progress: 65 },
      { text: '[CONFIRM] Confirming block receipt: 2 of 3 confirmations recorded.', delay: 7500, progress: 82 },
      { text: '[CONFIRM] Confirming block receipt: 3 of 3 confirmations recorded.', delay: 9000, progress: 95 },
      { text: '[SUCCESS] Ledger receipt cleared! Releasing decrypted license...', delay: 10200, progress: 100 }
    ];

    logs.forEach((logItem) => {
      setTimeout(() => {
        setVerificationLogs((prev) => [...prev, logItem.text]);
        setProgressVal(logItem.progress);
        
        // Final transition to success
        if (logItem.progress === 100) {
          setTimeout(() => {
            setCheckoutStage('success');
          }, 1000);
        }
      }, logItem.delay);
    });
  };

  // Generate a customized receipt invoice txt file and download it
  const downloadReceiptFile = () => {
    const orderId = `BK-${Math.floor(Math.random() * 899999 + 100000)}`;
    const txHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random()*16).toString(16)).join('')}`;
    const dateStr = new Date().toUTCString();
    
    let receiptContent = `==================================================
                 BLOCKKEYS STORE RECEIPT                  
==================================================
Order Reference   : ${orderId}
Timestamp UTC     : ${dateStr}
Payment Mode      : Cryptocurrency (${selectedCoin} - ${getActiveNetworkLabel()})
Product Sourced   : ${product}
Merchant Price    : $${price}.00 USD equivalent
Transaction Hash  : ${txHash}
Delivery Status   : COMPLETED & SECURED
==================================================
DELIVERED CREDENTIALS / LICENSE KEY:
`;

    if (product.includes('Key')) {
      receiptContent += `Minecraft Key    : ${generatedKey}\n`;
      receiptContent += `Activation Link  : https://redeem.microsoft.com\n`;
    } else {
      receiptContent += `Account Email    : ${generatedCredentials.email}\n`;
      receiptContent += `Account Password : ${generatedCredentials.password}\n`;
    }

    receiptContent += `==================================================
Thank you for shopping at BlockKeys! Your wholesale
Minecraft license is permanently assigned to your identity.
For warranty concerns, contact us via WhatsApp / Telegram.
==================================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `${orderId}-BlockKeys-Receipt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onCopy('Downloaded purchase receipt!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Background Dark Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={checkoutStage === 'verifying' ? undefined : onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        {/* Main Gateway Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-dark-2 border border-white/5 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-dark-3/20">
            <div>
              <span className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest">SECURED WALLET CHECKOUT</span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                Buy {product}
              </h2>
            </div>
            {checkoutStage !== 'verifying' && (
              <button 
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Checkout Stage: PAYING */}
          {checkoutStage === 'paying' && (
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              {/* Timer Progress Bar */}
              <div className="mb-6 bg-dark rounded-xl p-3 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="text-xs font-semibold text-neutral-400">Locking conversion rates...</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Step 1: Crypto Coins Grid Selector */}
              <div className="mb-6">
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-neutral-500 mb-3">1. Select Asset</h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {Object.keys(COINS).map((coinKey) => {
                    const coin = COINS[coinKey];
                    const isSelected = selectedCoin === coinKey;
                    return (
                      <button
                        key={coinKey}
                        onClick={() => setSelectedCoin(coinKey)}
                        style={{ 
                          borderColor: isSelected ? coin.color : 'rgba(255, 255, 255, 0.05)',
                          color: isSelected ? coin.color : '#9ca3af',
                          background: isSelected ? coin.bgColor : 'rgba(14, 14, 18, 0.45)'
                        }}
                        className={`flex flex-col items-center justify-center py-3.5 rounded-2xl border text-xs font-bold transition-all hover:border-white/10`}
                      >
                        <span className="text-lg mb-1">{coin.symbol}</span>
                        <span>{coinKey}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Networks Selector (Only for Stablecoins) */}
              {COINS[selectedCoin].networks && (
                <div className="mb-6">
                  <h3 className="text-xs font-extrabold tracking-wider uppercase text-neutral-500 mb-3">2. Choose Network</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {COINS[selectedCoin].networks.map((net) => {
                      const isNetSelected = selectedNetwork?.id === net.id;
                      return (
                        <button
                          key={net.id}
                          onClick={() => setSelectedNetwork(net)}
                          style={{
                            borderColor: isNetSelected ? COINS[selectedCoin].color : 'rgba(255, 255, 255, 0.05)',
                            background: isNetSelected ? COINS[selectedCoin].bgColor : 'rgba(14, 14, 18, 0.45)'
                          }}
                          className={`py-2 px-1 rounded-xl border text-[11px] font-bold text-center transition-all ${
                            isNetSelected ? 'text-white' : 'text-neutral-400 hover:bg-neutral-900'
                          }`}
                        >
                          {net.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Address and Details Cards */}
              <div className="p-5 rounded-2xl bg-dark border border-white/5 relative mb-6">
                {/* Dynamic Brand Gradient Background Block */}
                <div className="absolute top-0 right-0 w-16 h-16 blur-2xl rounded-full pointer-events-none opacity-20" 
                     style={{ backgroundColor: COINS[selectedCoin].color }} />
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Fake QR Code Grid SVG */}
                  <div className="w-28 h-28 p-1.5 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-dark">
                      {/* Corner Anchors */}
                      <rect x="5" y="5" width="25" height="25" fill="currentColor" stroke="white" strokeWidth="2" />
                      <rect x="10" y="10" width="15" height="15" fill="white" />
                      <rect x="12" y="12" width="11" height="11" fill="currentColor" />

                      <rect x="70" y="5" width="25" height="25" fill="currentColor" stroke="white" strokeWidth="2" />
                      <rect x="75" y="10" width="15" height="15" fill="white" />
                      <rect x="77" y="12" width="11" height="11" fill="currentColor" />

                      <rect x="5" y="70" width="25" height="25" fill="currentColor" stroke="white" strokeWidth="2" />
                      <rect x="10" y="75" width="15" height="15" fill="white" />
                      <rect x="12" y="77" width="11" height="11" fill="currentColor" />

                      {/* Random Grid Pixels to look authentic */}
                      <rect x="35" y="10" width="8" height="8" fill="currentColor" />
                      <rect x="47" y="5" width="6" height="12" fill="currentColor" />
                      <rect x="58" y="15" width="10" height="5" fill="currentColor" />
                      <rect x="35" y="25" width="12" height="6" fill="currentColor" />
                      
                      <rect x="5" y="38" width="15" height="5" fill="currentColor" />
                      <rect x="25" y="38" width="10" height="12" fill="currentColor" />
                      <rect x="42" y="42" width="18" height="6" fill="currentColor" />
                      <rect x="68" y="35" width="8" height="18" fill="currentColor" />
                      <rect x="80" y="42" width="15" height="6" fill="currentColor" />

                      <rect x="38" y="60" width="8" height="8" fill="currentColor" />
                      <rect x="52" y="55" width="12" height="15" fill="currentColor" />
                      <rect x="70" y="68" width="25" height="6" fill="currentColor" />
                      <rect x="38" y="78" width="16" height="8" fill="currentColor" />
                      <rect x="60" y="80" width="8" height="15" fill="currentColor" />
                      <rect x="75" y="80" width="18" height="10" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="flex-1 w-full space-y-3.5">
                    {/* Amount */}
                    <div>
                      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">SEND EXACT AMOUNT</div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <strong className="text-xl font-extrabold text-white">
                          {CONVERSIONS[price][selectedCoin]} {selectedCoin}
                        </strong>
                        <span className="text-xs text-neutral-400">(${price}.00 USD equivalence)</span>
                      </div>
                    </div>

                    {/* Network Info */}
                    <div>
                      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">NETWORK DETAILS</div>
                      <div className="text-xs text-white font-semibold flex items-center gap-1.5 mt-1" 
                           style={{ color: COINS[selectedCoin].color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COINS[selectedCoin].color }} />
                        {getActiveNetworkLabel()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Bar */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">RECIPIENT ADDRESS</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs select-all bg-dark-2 border border-white/5 px-3 py-2 rounded-xl text-neutral-300 truncate font-mono">
                      {getActiveAddress()}
                    </code>
                    <button
                      onClick={() => handleCopyText(getActiveAddress(), 'address')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                        copiedAddress 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-white text-dark hover:bg-neutral-200 border-transparent shadow'
                      }`}
                    >
                      {copiedAddress ? 'Copied!' : 'Copy Address'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 mb-6 flex items-start gap-3">
                <span className="text-amber-500 text-lg shrink-0 mt-0.5">⚠️</span>
                <div className="text-xs text-neutral-400 leading-normal">
                  You must send <strong className="text-neutral-200">ONLY {selectedCoin}</strong> via the <strong className="text-neutral-200">{getActiveNetworkLabel()}</strong>. Sending any other asset or utilizing incorrect channels will result in complete, unrecoverable blockchain loss.
                </div>
              </div>

              {/* Submit / Verify Button */}
              <Button 
                variant="glow" 
                onClick={triggerVerification}
                className="w-full py-4 text-base font-extrabold tracking-wide border-emerald-400/20"
                style={{ backgroundColor: COINS[selectedCoin].color }}
              >
                ⚡ I Have Transferred Funds
              </Button>
            </div>
          )}

          {/* Checkout Stage: VERIFYING SCREEN */}
          {checkoutStage === 'verifying' && (
            <div className="p-6 flex-1 flex flex-col items-center justify-center min-h-[350px]">
              {/* Animated Progress Dial */}
              <div className="relative w-24 h-24 mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke={COINS[selectedCoin].color} strokeWidth="6" fill="transparent" 
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * progressVal) / 100}
                          className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-white">
                  {progressVal}%
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 text-center">Verifying Ledger Transactions</h3>
              <p className="text-xs text-neutral-500 text-center mb-6 max-w-xs">
                Scanning the blockchain blocks for matching amounts. Do not close or refresh this browser.
              </p>

              {/* Developer Style Log Screen */}
              <div className="w-full flex-1 p-4 rounded-2xl bg-dark text-neutral-400 text-left border border-white/5 font-mono text-[10px] leading-relaxed overflow-y-auto max-h-[140px] space-y-1 scrollbar-none shadow-inner">
                {verificationLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-neutral-600 shrink-0">&gt;&gt;</span>
                    <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('PENDING') ? 'text-amber-400' : 'text-neutral-300'}>
                      {log}
                    </span>
                  </div>
                ))}
                {verificationLogs.length < 8 && (
                  <div className="flex gap-2 animate-pulse">
                    <span className="text-neutral-600 shrink-0">&gt;&gt;</span>
                    <span className="text-neutral-700">scanning blocks...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Checkout Stage: SUCCESS SCREEN */}
          {checkoutStage === 'success' && (
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar text-center flex flex-col items-center justify-center">
              {/* Big Success Shield Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-3xl mb-4 shadow-lg shadow-emerald-500/5">
                ✓
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">Payment Cleared Successfully!</h3>
              <p className="text-xs text-neutral-400 mb-6 max-w-sm">
                Your direct wholesale Minecraft purchase is registered. Details are decapsulated below.
              </p>

              {/* Delivery Box */}
              <div className="w-full p-5 rounded-2xl bg-dark border border-emerald-500/20 relative overflow-hidden mb-6 text-left shadow-lg shadow-emerald-500/5">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 blur-xl rounded-full pointer-events-none" />
                
                {product.includes('Key') ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">MINECRAFT RETAIL KEY</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 text-sm sm:text-base font-extrabold text-white tracking-wider select-all py-2.5 px-3.5 bg-dark-2 border border-white/5 rounded-xl font-mono">
                          {generatedKey}
                        </code>
                        <button
                          onClick={() => handleCopyText(generatedKey, 'key')}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                            copiedKey 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-white text-dark hover:bg-neutral-200 border-transparent shadow'
                          }`}
                        >
                          {copiedKey ? 'Copied!' : 'Copy Key'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">HOW TO ACTIVATE</span>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        Go to the official activation page at <a href="https://redeem.microsoft.com" target="_blank" rel="noreferrer" className="text-brand hover:underline font-semibold">redeem.microsoft.com</a>, log into your personal Microsoft Account, and enter this key.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">ACCOUNT CREDENTIALS</span>
                      <div className="mt-2 space-y-2 text-xs font-mono">
                        <div className="flex justify-between p-2 rounded-lg bg-dark-2 border border-white/5">
                          <span className="text-neutral-500">Email:</span>
                          <strong className="text-white select-all">{generatedCredentials.email}</strong>
                        </div>
                        <div className="flex justify-between p-2 rounded-lg bg-dark-2 border border-white/5">
                          <span className="text-neutral-500">Password:</span>
                          <strong className="text-white select-all">{generatedCredentials.password}</strong>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">HOW TO SET UP</span>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        Sign into Mojang / Microsoft launcher using the credentials above. Go to profile settings on minecraft.net to change email, skins, and passwords immediately.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Invoice Download & Support */}
              <div className="w-full grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={downloadReceiptFile}
                  className="py-3 px-4 rounded-xl border border-white/5 bg-dark hover:bg-white/5 text-xs text-neutral-300 font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  📥 Download Invoice
                </button>
                
                <a 
                  href="https://t.me/cj_mc_store"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl border border-brand/20 bg-brand/10 hover:bg-brand/20 text-xs text-brand font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  💬 Priority Support
                </a>
              </div>
            </div>
          )}

          {/* Footer Info (Telegram & WhatsApp links as back-up support) */}
          <div className="p-4 border-t border-white/5 bg-dark-3/20 flex items-center justify-between gap-4 text-[11px] text-neutral-500 shrink-0">
            <span>🔒 Direct Ledger Clearance</span>
            <div className="flex items-center gap-2">
              <span>Need help?</span>
              <a href="https://t.me/cj_mc_store" target="_blank" rel="noreferrer" className="text-brand hover:underline font-semibold">Telegram</a>
              <span>•</span>
              <a href="https://wa.me/94787401412" target="_blank" rel="noreferrer" className="text-brand hover:underline font-semibold">WhatsApp</a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
