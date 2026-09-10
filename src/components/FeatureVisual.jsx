import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  KeyRound,
  History,
  Lock,
  HardDrive,
  Monitor,
  CheckCircle2,
  Cpu,
  Zap,
  Terminal,
  Timer,
  Target,
  TrendingUp,
  LayoutDashboard,
  EyeOff,
  Camera,
  Keyboard,
  Shield,
  Mic,
  Server,
  Cloud,
} from "lucide-react";
import { PROVIDERS } from "@/lib/data";

const wrapClass =
  "relative flex h-[340px] sm:h-[380px] md:h-[420px] flex-col justify-center gap-4 transition-all duration-500";

export default function FeatureVisual({ kind }) {
  // Providers: switch active pill in loop
  if (kind === "providers") {
    const [activeIdx, setActiveIdx] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % 6);
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-40 pointer-events-none" />
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {PROVIDERS.slice(0, 6).map(({ name, color }, idx) => {
            const active = idx === activeIdx;
            return (
              <motion.div
                key={name}
                animate={{
                  scale: active ? 1.03 : 1,
                  borderColor: active ? color : "rgba(196,48,48,0.08)",
                  backgroundColor: active ? `${color}05` : "var(--color-bg, #040205)",
                }}
                className="flex items-center gap-3 rounded-xl border px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] cursor-default"
              >
                <motion.span
                  animate={{ scale: active ? [1, 1.25, 1] : 1 }}
                  transition={{ repeat: active ? Infinity : 0, repeatDelay: 1 }}
                  className="h-3 w-3 rounded-full"
                  style={{ background: color }}
                />
                <span className={`text-sm font-semibold ${active ? "text-ink" : "text-sub"}`}>
                  {name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Server AI: managed providers with cloud connection
  if (kind === "serverai") {
    const [connected, setConnected] = useState(false);
    const [usage, setUsage] = useState(0);
    const [activeProvider, setActiveProvider] = useState(0);

    const providers = [
      { name: "GPT-4o", color: "#10A37F", usage: 72 },
      { name: "Claude", color: "#D97706", usage: 45 },
      { name: "Gemini", color: "#2563EB", usage: 89 },
    ];

    useEffect(() => {
      const connectDelay = setTimeout(() => setConnected(true), 1000);
      return () => clearTimeout(connectDelay);
    }, []);

    useEffect(() => {
      if (!connected) return;
      const interval = setInterval(() => {
        setActiveProvider(prev => (prev + 1) % providers.length);
      }, 2000);
      return () => clearInterval(interval);
    }, [connected]);

    useEffect(() => {
      if (!connected) return;
      const interval = setInterval(() => {
        setUsage(prev => Math.min(prev + Math.random() * 5, 100));
      }, 800);
      return () => clearInterval(interval);
    }, [connected]);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-5">
          {/* Connection status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: connected ? [1, 1.1, 1] : 1,
                  backgroundColor: connected ? "rgba(34,197,94,0.15)" : "rgba(196,48,48,0.06)"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/[0.08]"
              >
                <Cloud size={18} className={connected ? "text-green-400" : "text-ink/30"} />
              </motion.div>
              <div>
                <div className="text-[12px] font-bold text-ink/60">Server AI</div>
                <div className={`text-[10px] font-semibold ${connected ? "text-green-400" : "text-ink/30"}`}>
                  {connected ? "CONNECTED" : "CONNECTING..."}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-ink/20"}`} />
              <span className="text-[9px] text-ink/40">LIVE</span>
            </div>
          </div>

          {/* Provider cards */}
          <div className="flex flex-col gap-3">
            {providers.map((provider, i) => (
              <motion.div
                key={provider.name}
                  animate={{
                  borderColor: activeProvider === i ? provider.color : "rgba(196,48,48,0.08)",
                  backgroundColor: activeProvider === i ? `${provider.color}10` : "transparent",
                }}
                className="flex items-center justify-between rounded-lg border border-ink/[0.06] px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: provider.color }} />
                  <span className="text-[11px] font-semibold text-ink/80">{provider.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 rounded-full bg-ink/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: connected ? `${provider.usage}%` : 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: provider.color }}
                    />
                  </div>
                  <span className="text-[10px] text-ink/40 w-8 text-right">{provider.usage}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between rounded-lg bg-ink/[0.03] border border-ink/[0.04] px-4 py-3">
            <div className="flex items-center gap-2">
              <Server size={12} className="text-white" />
              <span className="text-[10px] text-ink/50">No API keys needed</span>
            </div>
            <span className="text-[10px] text-green-400/70 font-medium">Auto-limit tracking</span>
          </div>

          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <Cloud size={15} className="text-white" />
              Server AI
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
              Managed providers, zero config, instant access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Interview Workflows: tabbed puzzle list + feedback
  if (kind === "interview") {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Coding", "System Design", "Behavioral"];

    const puzzles = [
      { name: "Sliding Window Max", difficulty: "Medium", status: "solved" },
      { name: "LRU Cache", difficulty: "Hard", status: "in-progress" },
      { name: "Binary Tree Paths", difficulty: "Easy", status: "solved" },
    ];

    const feedback = [
      { label: "Time Complexity", value: "O(N)", color: "text-green-600" },
      { label: "Space", value: "O(K)", color: "text-green-600" },
      { label: "Clarity", value: "9/10", color: "text-white" },
    ];

    return (
      <div className={wrapClass}>
        <div className="flex gap-2 mb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={[
                "rounded-md px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all",
                activeTab === i
                  ? "bg-white text-black shadow-soft"
                  : "bg-ink/[0.03] text-sub hover:bg-ink/[0.06]",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2">
            {puzzles.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between rounded-lg border border-ink/[0.04] bg-bg px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Target size={12} className="text-sub/60" />
                  <span className="text-[11px] font-semibold text-ink">{p.name}</span>
                </div>
                <span
                  className={[
                    "text-[9px] font-bold uppercase",
                    p.status === "solved" ? "text-green-600" : "text-amber-600",
                  ].join(" ")}
                >
                  {p.status}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="w-[120px] flex flex-col gap-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sub/60 mb-1">Feedback</div>
            {feedback.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-lg border border-ink/[0.04] bg-bg px-2.5 py-2"
              >
                <div className="text-[9px] text-sub/60">{f.label}</div>
                <div className={`text-[12px] font-bold ${f.color}`}>{f.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Code: syntax typing + complexity
  if (kind === "code") {
    const [lineIdx, setLineIdx] = useState(0);
    const lines = [
      'const solve = (a, b) => {',
      '  // Avoid O(N²) nested loops',
      '  return a.filter(x => b.has(x));',
      '}',
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setLineIdx((prev) => (prev + 1) % (lines.length + 1));
      }, 1200);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-3 rounded-xl bg-[#0F0F10] p-5 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <span className="w-[10px] h-[10px] rounded-full bg-[#ED6A5E] opacity-50" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#F4BF4F] opacity-50" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#61C454] opacity-50" />
            </div>
            <span className="rounded bg-green-500/10 px-2.5 py-1 text-[10px] font-bold text-green-400 border border-green-500/20">
              Optimal: O(N)
            </span>
          </div>
          <pre className="font-mono text-[13px] leading-relaxed text-[#D7D7DC]">
            {lines.slice(0, lineIdx).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {lineIdx < lines.length && <span className="inline-block w-[2px] h-[14px] bg-[#61AFEF] animate-pulse ml-0.5" />}
          </pre>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Zap size={15} className="text-white" />
          Translates brute force logic into clean complexities.
        </div>
      </div>
    );
  }

  // Prompt: code editor with line numbers
  if (kind === "prompt") {
    return (
      <div className={wrapClass}>
        <div className="flex flex-wrap gap-2 mb-2">
          {["CONCISE", "ALGORITHMIC", "SENIOR COGNITION"].map((tag, i) => (
            <span
              key={tag}
              className={[
                "rounded px-2.5 py-1 text-[10px] font-bold tracking-wider",
                i === 0
                  ? "bg-white/10 text-accent border border-white/20"
                  : "bg-ink/[0.03] text-sub/80 border border-ink/[0.04]"
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full rounded-xl border border-ink/[0.05] bg-bg p-4 text-[13px] leading-relaxed font-mono text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]">
          <div className="flex gap-2">
            <span className="select-none text-sub/30 w-4 text-right">1</span>
            <span className="text-accent font-semibold">system_prompt</span>
          </div>
          <div className="flex gap-2">
            <span className="select-none text-sub/30 w-4 text-right">2</span>
            <span>"Be concise. Answer code first."</span>
          </div>
          <div className="flex gap-2">
            <span className="select-none text-sub/30 w-4 text-right">3</span>
            <span>"Analyze big-O time complexity."</span>
          </div>
        </div>
      </div>
    );
  }

  // Speed: live latency + streaming gauge
  if (kind === "speed") {
    const [latency, setLatency] = useState(0);
    const [tokensPerSec, setTokensPerSec] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
      const startDelay = setTimeout(() => {
        setActive(true);
        let frame = 0;
        const interval = setInterval(() => {
          frame++;
          const lat = Math.min(120 + Math.sin(frame * 0.15) * 40 + Math.random() * 20, 280);
          const tps = Math.min(38 + Math.cos(frame * 0.12) * 8 + Math.random() * 5, 52);
          setLatency(Math.round(lat));
          setTokensPerSec(Math.round(tps));
          if (frame > 60) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
      }, 600);
      return () => clearTimeout(startDelay);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="flex flex-col gap-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <Timer size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-sub/60">First Token Latency</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[26px] font-bold text-ink tabular-nums">{active ? latency : "—"}</span>
                  <span className="text-[11px] font-semibold text-sub/60">ms</span>
                </div>
              </div>
            </div>
            <div className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              latency < 200
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
            }`}>
              {latency < 200 ? "Excellent" : "Good"}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sub/60">Streaming Speed</span>
              <span className="text-[12px] font-bold text-ink tabular-nums">{active ? tokensPerSec : "—"} <span className="text-sub/60 font-medium">t/s</span></span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-bg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: active ? `${(tokensPerSec / 55) * 100}%` : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-white to-white/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tokens", value: "62", icon: Cpu },
              { label: "Duration", value: "0.24s", icon: Timer },
              { label: "Speed", value: `${tokensPerSec} t/s`, icon: TrendingUp },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-ink/[0.04] bg-bg py-3"
              >
                <m.icon size={13} className="text-white" />
                <span className="text-[11px] font-bold text-ink">{m.value}</span>
                <span className="text-[9px] text-sub/60">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // API Keys: masked reveal on hover
  if (kind === "keys") {
    const [reveal, setReveal] = useState(false);
    return (
      <div
        className={wrapClass}
        onMouseEnter={() => setReveal(true)}
        onMouseLeave={() => setReveal(false)}
      >
        <div className="flex flex-col gap-3">
          {[
            { name: "OpenAI", key: "sk-proj-49gK...8f2b" },
            { name: "Anthropic", key: "sk-ant-v2-d9f2...a78c" },
            { name: "DeepSeek", key: "sk-ds-39a0...33bd" },
          ].map((k) => (
            <div
              key={k.name}
              className="flex items-center justify-between rounded-xl border border-ink/[0.05] bg-bg px-4 py-3 shadow-soft"
            >
              <div className="flex items-center gap-2.5">
                <KeyRound size={15} className="text-sub/70" />
                <span className="text-sm font-semibold text-ink">{k.name}</span>
              </div>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-mono text-sm tracking-wider text-sub/85"
              >
                {reveal ? k.key : "••••••••••••••••"}
              </motion.span>
            </div>
          ))}
        </div>
        <div className="text-center text-[11px] font-semibold text-sub/70 uppercase tracking-widest mt-2">
          {reveal ? "Encrypted locally" : "Hover to reveal keys"}
        </div>
      </div>
    );
  }

  // Markdown: complexity table
  if (kind === "markdown") {
    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-3 rounded-xl border border-ink/[0.05] bg-bg p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-ink/[0.05] pb-3">
            <span className="text-sm font-bold text-ink">Complexity Comparison</span>
            <span className="rounded bg-green-500/5 px-2.5 py-1 text-[10px] font-bold text-green-600 border border-green-500/10">Markdown</span>
          </div>
          <div className="grid grid-cols-3 gap-3 py-1 text-[13px] border-b border-ink/[0.03] font-semibold text-sub">
            <span>Data Structure</span>
            <span>Lookup</span>
            <span>Insertion</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[12px] font-medium text-ink">
            <span>HashMap</span>
            <span className="text-green-600 font-bold">O(1)</span>
            <span className="text-green-600 font-bold">O(1)</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[12px] font-medium text-ink">
            <span>ArrayList</span>
            <span className="text-amber-600">O(N)</span>
            <span className="text-green-600 font-bold">O(1)</span>
          </div>
        </div>
      </div>
    );
  }

  // History: scrolling list
  if (kind === "history") {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setOffset((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    const list = [
      "Sliding Window Maximum",
      "K-way Merge Algorithm",
      "Graph Cycle Detection",
      "Trie Autocomplete Search",
      "Red-Black Tree balance",
    ];

    return (
      <div className={wrapClass}>
        <div className="relative flex flex-col gap-2">
          {list.slice(offset, offset + 3).map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: i === 0 ? 0.9 : i === 1 ? 1 : 0.4 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="flex items-center gap-3 rounded-lg border border-ink/[0.04] bg-bg px-4 py-3 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
            >
              <History size={14} className="text-sub/70" />
              {item}
            </motion.div>
          ))}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
        </div>
      </div>
    );
  }

  // Privacy: shield + lock
  if (kind === "privacy") {
    const [locked, setLocked] = useState(true);
    useEffect(() => {
      const interval = setInterval(() => {
        setLocked((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-soft"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={locked ? "locked" : "unlocked"}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Lock size={26} className="text-white" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div>
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <CheckCircle2 size={15} className="text-green-500" />
              Direct Connection
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
              Your API keys and prompt history remain isolated in local sandbox storage.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Storage: gauge filling
  if (kind === "storage") {
    const [fill, setFill] = useState(0);
    useEffect(() => {
      const t = setTimeout(() => setFill(34), 800);
      return () => clearTimeout(t);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HardDrive size={16} className="text-sub/70" />
            <span className="text-[14px] font-semibold text-ink">data.db</span>
          </div>
          <span className="text-[12px] font-bold text-accent bg-white/5 px-2.5 py-1 rounded border border-white/10">SQLite</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-bg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fill}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <div className="flex items-center justify-between text-[12px] font-semibold text-sub/80">
          <span>128 sessions saved</span>
          <span>41 MB on disk</span>
        </div>
      </div>
    );
  }

  // Dynamic Island: floating compact bar
  if (kind === "island") {
    const [isExpanded, setIsExpanded] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "Explain sliding window pattern...";

    useEffect(() => {
      let charIdx = 0;
      let timeoutId;
      setIsTyping(true);
      const typeChar = () => {
        if (charIdx < fullText.length) {
          setTypedText(fullText.substring(0, charIdx + 1));
          charIdx++;
          timeoutId = setTimeout(typeChar, 40 + Math.random() * 20);
        } else {
          setIsTyping(false);
          timeoutId = setTimeout(() => setShowResponse(true), 800);
        }
      };
      timeoutId = setTimeout(typeChar, 400);
      return () => clearTimeout(timeoutId);
    }, []);

    // Cursor blink
    useEffect(() => {
      const interval = setInterval(() => setShowCursor((c) => !c), 530);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        {/* Subtle ambient glow behind the island */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(196,48,48,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="flex flex-col items-center gap-4">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            animate={{
              y: [0, -3, 0],
            }}
            whileHover={{ scale: 1.02, y: 0 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl border border-white/[0.12] overflow-hidden cursor-pointer"
            style={{
              width: 440,
              background: "linear-gradient(180deg, rgba(26,30,46,0.95) 0%, rgba(15,18,25,0.98) 100%)",
              boxShadow: isTyping
                ? "0 8px 32px rgba(196,48,48,0.15), 0 0 60px rgba(196,48,48,0.05)"
                : "0 8px 32px rgba(0,0,0,0.4)",
            }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Top glow line */}
            <motion.div
              animate={{
                opacity: isTyping ? [0.4, 0.8, 0.4] : 0.2,
                scaleX: isTyping ? [0.8, 1, 0.8] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            />

            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2 w-2 rounded-full bg-[#ff5f57]"
                />
                <motion.span
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="h-2 w-2 rounded-full bg-[#febc2e]"
                />
                <motion.span
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="h-2 w-2 rounded-full bg-[#28c840]"
                />
              </div>
              <div className="flex-1 text-[10px] text-white/50 truncate">
                {typedText}
                <span
                  className="inline-block w-[1.5px] h-[10px] bg-white/60 ml-0.5 align-middle transition-opacity duration-100"
                  style={{ opacity: showCursor ? 0.6 : 0 }}
                />
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-white/30 text-[10px]"
              >
                ▼
              </motion.div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/[0.06] px-3 py-2.5">
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-[9px] text-white/30 mb-1.5 flex items-center gap-1"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                      AI Response
                    </motion.div>
                    <div className="text-[10px] text-white/70 font-mono leading-relaxed">
                      {showResponse ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          The sliding window technique uses a deque to maintain indices of useful elements. Time complexity: O(N).
                        </motion.span>
                      ) : (
                        <motion.span
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-white/30"
                        >
                          Thinking...
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <LayoutDashboard size={15} className="text-white" />
              </motion.div>
              Dynamic Island
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
              Floating AI bar that hovers over any app. Share history with main window.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Stealth Mode: invisible overlay
  if (kind === "stealth") {
    const [phase, setPhase] = useState("answer"); // answer -> copying -> typing
    const [typedText, setTypedText] = useState("");
    const fullAnswer = "for (let i = 0; i < nums.length; i++) {";
    const [showCursor, setShowCursor] = useState(true);
    const [copyFlash, setCopyFlash] = useState(false);

    // Phase cycle: show answer -> copy -> type -> repeat
    useEffect(() => {
      const cycle = () => {
        setPhase("answer");
        setTypedText("");
        setTimeout(() => {
          setPhase("copying");
          setCopyFlash(true);
          setTimeout(() => setCopyFlash(false), 400);
          setTimeout(() => {
            setPhase("typing");
            let charIdx = 0;
            const typeChar = () => {
              if (charIdx < fullAnswer.length) {
                setTypedText(fullAnswer.substring(0, charIdx + 1));
                charIdx++;
                setTimeout(typeChar, 35 + Math.random() * 25);
              } else {
                setTimeout(cycle, 2500);
              }
            };
            typeChar();
          }, 600);
        }, 2000);
      };
      setTimeout(cycle, 500);
      return () => {};
    }, []);

    useEffect(() => {
      const blink = setInterval(() => setShowCursor(prev => !prev), 530);
      return () => clearInterval(blink);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-4">
          {/* Split view */}
          <div className="flex gap-3">
            {/* Left: Screen share (what others see) */}
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#120808] p-4 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="text-[10px] text-white/40 font-medium">SCREEN SHARE</span>
              </div>
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-3 min-h-[160px]">
                <div className="text-[11px] text-white/25 font-mono leading-relaxed">
                  <div className="text-green-400/40 mb-1">{"// No AI visible here"}</div>
                  <div>function solve(nums) {"{"}</div>
                  <div className="ml-2">const deque = [];</div>
                  <div className="ml-2">const result = [];</div>
                  <div className="ml-2 text-white/15">...waiting</div>
                  <div>{"}"}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] text-green-400/60">LIVE</span>
              </div>
            </div>

            {/* Right: What you see — answer window + typing */}
            <div className="flex-1 rounded-xl border border-white/20 bg-[#1a1a1a] p-4 overflow-hidden relative">
              <div className="flex items-center gap-1.5 mb-3">
                <EyeOff size={10} className="text-white/60" />
                <span className="text-[10px] text-white/60 font-medium">YOUR VIEW</span>
              </div>
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-3 min-h-[160px] relative">
                {/* Code editor */}
                <div className="text-[11px] text-white/25 font-mono leading-relaxed">
                  <div>function solve(nums) {"{"}</div>
                  <div className="ml-2">const deque = [];</div>
                  <div className="ml-2">const result = [];</div>
                  {/* Typing line */}
                  <div className="ml-2 flex items-center">
                    <span className="text-white/80">{typedText}</span>
                    {phase === "typing" && (
                      <span className={`inline-block w-[1.5px] h-[10px] bg-white ml-0.5 align-middle ${showCursor ? "opacity-100" : "opacity-0"}`} />
                    )}
                  </div>
                  <div>{"}"}</div>
                </div>

                {/* AI Answer popup — appears in answer & copying phases */}
                <AnimatePresence>
                  {(phase === "answer" || phase === "copying") && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute top-1 right-1 rounded-lg border px-2 py-1.5 shadow-xl max-w-[140px] ${
                        copyFlash 
                          ? "bg-white/20 border-white/50" 
                          : "bg-[#1a1a1a] border-white/30"
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Zap size={7} className="text-white" />
                        <span className="text-[6px] text-white font-bold">AI ANSWER</span>
                      </div>
                      <div className="text-[8px] text-white/90 font-mono leading-relaxed">
                        for (let i = 0; i &lt; nums.length; i++) {"{"}
                      </div>
                      {copyFlash && (
                        <div className="mt-1 text-[6px] text-white font-bold animate-pulse">
                          COPIED ✓
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <EyeOff size={8} className="text-white/60" />
                <span className="text-[7px] text-white/60">INVISIBLE TO OTHERS</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-[13px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <EyeOff size={13} className="text-white" />
              Stealth Overlay
            </div>
            <p className="mt-1 max-w-[210px] text-[11px] leading-relaxed text-sub">
              AI follows your cursor, invisible to screen sharing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Screenshot: capture and analyze
  if (kind === "screenshot") {
    const [captured, setCaptured] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setCaptured(true);
        setAnalyzing(true);
        setTimeout(() => setAnalyzing(false), 2000);
        setTimeout(() => setCaptured(false), 4000);
      }, 6000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-4">
          <div className="relative rounded-xl border border-white/[0.08] bg-[#120808] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Camera size={14} className="text-white" />
              <span className="text-[12px] font-semibold text-white/60">Screenshot Capture</span>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3 text-[12px] text-white/40 font-mono min-h-[140px]">
              <div className="text-green-400 mb-1">{"// LeetCode Problem #239"}</div>
              <div>Given an array nums and window size k,</div>
              <div>find the max in each sliding window.</div>
            </div>
            <AnimatePresence>
              {captured && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/10 border-2 border-white/30 rounded-lg flex items-center justify-center"
                >
                  {analyzing ? (
                    <div className="flex items-center gap-2 text-accent text-[13px] font-semibold">
                      <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    <div className="text-green-400 text-[13px] font-semibold">Solution ready</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <Camera size={15} className="text-white" />
              Screenshot AI
            </div>
            <p className="mt-1 max-w-[250px] text-[12px] leading-relaxed text-sub">
              Capture your screen, AI solves the problem instantly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // AutoType: simulated human typing
  if (kind === "autotype") {
    const [typed, setTyped] = useState("");
    const fullText = "function maxSlidingWindow(nums, k) {...}";

    useEffect(() => {
      let charIdx = 0;
      const typeChar = () => {
        if (charIdx < fullText.length) {
          setTyped(fullText.substring(0, charIdx + 1));
          charIdx++;
          setTimeout(typeChar, 30 + Math.random() * 80);
        } else {
          setTimeout(() => {
            charIdx = 0;
            setTyped("");
            setTimeout(typeChar, 1000);
          }, 3000);
        }
      };
      setTimeout(typeChar, 500);
      return () => {};
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#120808] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Keyboard size={14} className="text-white" />
              <span className="text-[12px] font-semibold text-white/60">AutoType Active</span>
              <span className="ml-auto text-[10px] text-green-400 animate-pulse">● TYPING</span>
            </div>
              <div className="font-mono text-[13px] text-[#d0d0d8]/80 min-h-[24px]">
              <span>{typed}</span>
              <span className="inline-block w-[2px] h-[14px] bg-[#61AFEF] animate-pulse ml-0.5 align-middle" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 text-[11px] text-sub">
            <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-ink/[0.06] border border-ink/[0.08] font-mono text-[10px]">F9</kbd> Start</span>
            <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-ink/[0.06] border border-ink/[0.08] font-mono text-[10px]">F10</kbd> Stop</span>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <Keyboard size={15} className="text-white" />
              AutoType
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Voice Recognition: microphone with waveform
  if (kind === "voice") {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [waveBars, setWaveBars] = useState(Array(12).fill(0.2));
    const fullTranscript = "Find the longest palindromic substring...";

    useEffect(() => {
      const startDelay = setTimeout(() => {
        setIsListening(true);
        let charIdx = 0;
        const typeChar = () => {
          if (charIdx < fullTranscript.length) {
            setTranscript(fullTranscript.substring(0, charIdx + 1));
            charIdx++;
            setTimeout(typeChar, 40 + Math.random() * 30);
          }
        };
        setTimeout(typeChar, 300);
      }, 800);

      return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
      if (!isListening) return;
      const interval = setInterval(() => {
        setWaveBars(prev => prev.map(() => 0.2 + Math.random() * 0.8));
      }, 120);
      return () => clearInterval(interval);
    }, [isListening]);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col gap-4">
          <div className="relative rounded-xl border border-white/[0.08] bg-[#120808] p-5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ 
                  scale: isListening ? [1, 1.15, 1] : 1,
                  boxShadow: isListening 
                    ? ["0 0 0 0 rgba(196,48,48,0.2)", "0 0 0 8px rgba(196,48,48,0)", "0 0 0 0 rgba(196,48,48,0.2)"]
                    : "0 0 0 0 rgba(196,48,48,0)"
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 border border-white/25"
              >
                <Mic size={20} className="text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold text-white/60">Whisper Voice Input</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-bold ${isListening ? "text-green-400" : "text-white/40"}`}>
                    {isListening ? "● LISTENING" : "○ STANDBY"}
                  </span>
                </div>
              </div>
            </div>

            {/* Waveform visualization */}
            <div className="flex items-end justify-center gap-[4px] h-10 mb-3">
              {waveBars.map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: isListening ? height : 0.15 }}
                  transition={{ duration: 0.1 }}
                  className="w-[4px] rounded-full bg-gradient-to-t from-white/40 to-accent"
                  style={{ height: "100%", transformOrigin: "bottom" }}
                />
              ))}
            </div>

            {/* Transcript */}
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3 min-h-[50px]">
            <div className="font-mono text-[12px] text-[#d0d0d8]/80">
                <span className="text-white/60">{transcript}</span>
                {isListening && transcript.length < fullTranscript.length && (
                  <span className="inline-block w-[2px] h-[12px] bg-accent animate-pulse ml-0.5 align-middle" />
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <Mic size={15} className="text-white" />
              Voice Recognition
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
              Speak questions with Whisper. Hands-free DSA solving.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Disguise Mode: fake Windows Update
  if (kind === "disguise") {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 200);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={wrapClass}>
        <div className="flex flex-col items-center gap-5">
          <div className="w-[420px] rounded-xl border border-white/[0.08] bg-[#0078d4] overflow-hidden shadow-2xl">
            <div className="bg-[#005a9e] px-4 py-2 flex items-center justify-between">
              <span className="text-[12px] text-white/80 font-medium">Windows Update</span>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/40" />
              </div>
            </div>
            <div className="p-10 text-center">
              <div className="text-white text-[16px] font-medium mb-6">We're checking for updates...</div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <div className="text-white/60 text-[11px] mt-3">{progress}% complete</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
              <Shield size={15} className="text-white" />
              Disguise Mode
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
              One hotkey transforms AI into a Windows Update screen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: shortcut keys animate
  return (
    <div className={wrapClass}>
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex gap-3">
          {["Alt", "Space"].map((key, i) => (
            <motion.div
              key={key}
              animate={{
                y: [0, 2, 0],
                boxShadow: [
                  "0 4px 0px rgba(196,48,48,0.15), 0 4px 8px rgba(0,0,0,0.4)",
                  "0 1px 0px rgba(196,48,48,0.15), 0 1px 2px rgba(0,0,0,0.4)",
                  "0 4px 0px rgba(196,48,48,0.15), 0 4px 8px rgba(0,0,0,0.4)"
                ]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              className="flex h-14 min-w-14 items-center justify-center rounded-xl border border-ink/[0.08] bg-bg px-4 font-mono text-sm font-bold text-ink"
            >
              {key}
            </motion.div>
          ))}
        </div>
        <div>
          <div className="text-[15px] font-bold text-ink flex items-center gap-1.5 justify-center">
            <Monitor size={15} className="text-white" />
            Global Hotkey
          </div>
          <p className="mt-1 max-w-[260px] text-[12px] leading-relaxed text-sub">
            Summon or hide the panel instantly over any editor or conference window.
          </p>
        </div>
      </div>
    </div>
  );
}
