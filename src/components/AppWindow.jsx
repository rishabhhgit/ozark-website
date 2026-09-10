import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Send,
  Minus,
  Plus,
  Check,
  Copy,
  FileCode2,
  Gauge,
  Cpu,
  Zap,
  Grid3X3,
  Keyboard,
} from "lucide-react";

const AI_RESPONSES = [
  {
    lang: "JavaScript",
    file: "solution.js",
    code: [
      "function maxSlidingWindow(nums, k) {",
      "  const deque = [];",
      "  const result = [];",
      "  for (let i = 0; i < nums.length; i++) {",
      "    while (deque.length && deque[deque.length - 1] <= nums[i]) deque.pop();",
      "    deque.push(i);",
      "    if (deque[0] === i - k) deque.shift();",
      "    if (i >= k - 1) result.push(nums[deque[0]]);",
      "  }",
      "  return result;",
      "}",
    ],
  },
  {
    lang: "Python",
    file: "solution.py",
    code: [
      "from collections import deque",
      "",
      "def max_sliding_window(nums, k):",
      "    dq = deque()",
      "    result = []",
      "    for i in range(len(nums)):",
      "        while dq and dq[-1] <= nums[i]:",
      "            dq.pop()",
      "        dq.append(i)",
      "        if dq[0] == i - k:",
      "            dq.popleft()",
      "        if i >= k - 1:",
      "            result.append(nums[dq[0]])",
      "    return result",
    ],
  },
];

const SHORTCUTS = [
  { keys: ["Alt", "Space"], action: "Toggle panel" },
  { keys: ["Ctrl", "Shift","Enter"], action: "Send message" },
  { keys: ["Ctrl", "Shift", "C"], action: "Copy code" },
  { keys: ["Esc"], action: "Hide panel" },
];

const MODELS = [
  { provider: "Anthropic", model: "claude-opus-4-6" },
  { provider: "OpenAI", model: "gpt-4o" },
  { provider: "Google", model: "gemini-3.8-flasj" },
  { provider: "DeepSeek", model: "deepseek-flash" },
];

export default function AppWindow({ detailed = false }) {
  const [modelIdx, setModelIdx] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [codeLines, setCodeLines] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const windowRef = useRef(null);
  const timerRefs = useRef([]);
  const responseIdxRef = useRef(0);

  const currentModel = MODELS[modelIdx];

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    setTypedPrompt("");
    setCodeLines([]);
    setShowCode(false);
    setIsThinking(false);
    setModelIdx(0);

    const TARGET = "Sliding window maximum in O(N) time";
    let charIdx = 0;
    const currentResponse = AI_RESPONSES[responseIdxRef.current];

    const typeChar = () => {
      if (charIdx < TARGET.length) {
        setTypedPrompt(TARGET.substring(0, charIdx + 1));
        charIdx++;
        const ch = TARGET.charAt(charIdx - 1);
        const delay = ch === " " ? 140 : Math.random() * 40 + 25;
        timerRefs.current.push(setTimeout(typeChar, delay));
      } else {
        timerRefs.current.push(setTimeout(() => setModelIdx(1), 600));
        timerRefs.current.push(setTimeout(() => setIsThinking(true), 1200));
        timerRefs.current.push(setTimeout(() => {
          setIsThinking(false);
          setShowCode(true);
          let lineIdx = 0;
          const lines = currentResponse.code;
          const streamLine = () => {
            if (lineIdx < lines.length) {
              setCodeLines((prev) => [...prev, lines[lineIdx]]);
              lineIdx++;
              timerRefs.current.push(setTimeout(streamLine, lines[lineIdx - 1] === "" ? 60 : Math.random() * 40 + 30));
            } else {
              timerRefs.current.push(setTimeout(() => {
                responseIdxRef.current = (responseIdxRef.current + 1) % AI_RESPONSES.length;
                setTypedPrompt("");
                setCodeLines([]);
                setShowCode(false);
                setIsThinking(false);
                setModelIdx(0);
                charIdx = 0;
                timerRefs.current.push(setTimeout(typeChar, 1000));
              }, 5000));
            }
          };
          streamLine();
        }, 2000));
      }
    };

    timerRefs.current.push(setTimeout(typeChar, 800));

    return () => clearTimers();
  }, [clearTimers]);

  const currentResponse = AI_RESPONSES[responseIdxRef.current];

  const isDetailed = detailed;
  const shellHeight = isDetailed ? "700px" : "480px";

  return (
    <div ref={windowRef} className="w-full relative" style={{ height: shellHeight, overflow: "hidden" }}>
      {isDetailed && (
        <div
          className="mb-4 rounded-xl border border-white/[0.06] bg-[#121216]/80 backdrop-blur-sm overflow-hidden"
          style={{ height: "260px" }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.05] bg-white/[0.03] px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] opacity-60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] opacity-60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] opacity-60" />
              </div>
              <span className="text-[10px] text-white/30 font-mono">main.py</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-[#8a3030]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#b0b0b0] border border-[#8a3030]/20">
                Python
              </span>
            </div>
          </div>
          <div className="p-4 font-mono text-[11px] leading-relaxed text-[#d0d0d8]/60">
            <div><span className="text-[#c678dd]">def</span> <span className="text-[#61afef]">solve</span>(nums, k):</div>
            <div className="pl-4"><span className="text-[#5c6370]"># Sliding window with deque</span></div>
            <div className="pl-4"><span className="text-[#c678dd]">from</span> <span className="text-[#e5c07b]">collections</span> <span className="text-[#c678dd]">import</span> deque</div>
            <div className="pl-4">dq = deque()</div>
            <div className="pl-4">result = []</div>
            <div className="pl-4"><span className="text-[#c678dd]">for</span> i <span className="text-[#c678dd]">in</span> <span className="text-[#61afef]">range</span>(<span className="text-[#d19a66]">len</span>(nums)):</div>
            <div className="pl-8"><span className="text-[#c678dd]">while</span> dq <span className="text-[#56b6c2]">and</span> dq[<span className="text-[#d19a66]">-1</span>] {"<= nums[i]:"}</div>
            <div className="pl-12">dq.pop()</div>
            <div className="pl-8">dq.append(i)</div>
            <div className="pl-8"><span className="text-[#c678dd]">if</span> dq[<span className="text-[#d19a66]">0</span>] == i - k:</div>
            <div className="pl-12">dq.popleft()</div>
            <div className="pl-8"><span className="text-[#c678dd]">if</span> i {">= k - "}<span className="text-[#d19a66]">1</span>:</div>
            <div className="pl-12">result.append(nums[dq[<span className="text-[#d19a66]">0</span>]])</div>
            <div className="pl-4"><span className="text-[#c678dd]">return</span> result</div>
          </div>
        </div>
      )}

      <div
        className="relative rounded-2xl border border-white/[0.1] overflow-hidden flex flex-col"
        style={{
          height: isDetailed ? "410px" : "480px",
          background: "linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(10,10,14,0.98) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,48,48,0.05) inset",
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          background: "linear-gradient(135deg, transparent 30%, rgba(196,48,48,0.03) 50%, transparent 70%)",
          animation: "island-shimmer 4s ease-in-out infinite",
        }} />

        <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 flex-shrink-0">
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-1">
              <div className="h-1.5 w-1.5 rounded-full border border-white/20" />
              <span className="text-[9px] text-white/40 hidden sm:inline">Server</span>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-[#8a3030]/30 bg-[#8a3030]/10 px-1.5 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#8a3030] shadow-[0_0_6px_rgba(196,48,48,0.3)]" />
              <span className="text-[9px] text-[#b0b0b0] font-medium hidden sm:inline">Custom</span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white/90">
              {currentModel.provider}
              <ChevronDown size={8} className="text-white/30" />
            </button>
            <button className="hidden md:flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white/90">
              {currentModel.model}
              <ChevronDown size={8} className="text-white/30" />
            </button>
          </div>
          <div className="min-w-0 flex-1 max-w-[260px] overflow-hidden">
            <div className="relative h-7 sm:h-8 rounded-md border border-white/[0.08] bg-white/[0.04] flex items-center px-2.5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06]">
              {typedPrompt && (
                <span className="text-[10px] sm:text-[11px] text-white/70 truncate">
                  {typedPrompt}
                  {!showCode && (
                    <span className="ml-0.5 inline-block w-[1.5px] h-[10px] bg-[#8a3030] animate-pulse align-middle" />
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
            <button className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.08] text-white/30 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/60">
              <Minus size={9} />
            </button>
            <button className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.08] text-white/30 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/60">
              <Plus size={9} />
            </button>
          </div>
          <button className="hidden sm:flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.08] text-white/30 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/60 flex-shrink-0">
            <ChevronDown size={10} />
          </button>
          <div className="hidden md:flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-1 flex-shrink-0">
            <Grid3X3 size={8} className="text-[#8a3030]" />
            <span className="text-[9px] font-medium text-white/60">Normal</span>
          </div>
          <button
            className="flex items-center gap-1 rounded-md bg-[#8a3030] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold text-white transition-all duration-200 hover:bg-[#b0b0b0] shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex-shrink-0"
          >
            Send
            <Send size={10} />
          </button>
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.08] text-white/30 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/60 flex-shrink-0"
          >
            <Keyboard size={10} />
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-hidden">
          {showShortcuts && (
            <div className="border-t border-white/[0.06] px-4 py-3 flex items-center gap-4 flex-wrap">
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/20">Shortcuts</span>
              {SHORTCUTS.map((s, i) => (
                <div key={s.action} className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {s.keys.map((k, ki) => (
                      <span key={ki}>
                        <kbd className="rounded border border-white/[0.1] bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono text-white/50 shadow-[0_1px_0_rgba(196,48,48,0.05)]">
                          {k}
                        </kbd>
                        {ki < s.keys.length - 1 && <span className="text-[8px] text-white/15 mx-0.5">+</span>}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] text-white/30">{s.action}</span>
                </div>
              ))}
            </div>
          )}

          {(isThinking || showCode) && (
            <div className="border-t border-white/[0.06] h-full overflow-hidden">
              <div className="p-4">
                {isThinking && !showCode && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8a3030] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8a3030] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8a3030] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[10px] text-white/40">Analyzing...</span>
                  </div>
                )}

                {showCode && (
                  <>
                    <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-[#121216]">
                      <div className="flex items-center justify-between border-b border-white/[0.05] bg-white/[0.03] px-3 py-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/40">
                          <FileCode2 size={10} className="text-[#8a3030]" />
                          {currentResponse.file}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-[#8a3030]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#b0b0b0] border border-[#8a3030]/20">
                            {currentResponse.lang}
                          </span>
                          <button
                            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}
                            className="flex items-center gap-1 text-[9px] text-white/30 hover:text-white/60 transition-colors"
                          >
                            {copied ? <Check size={9} className="text-green-400" /> : <Copy size={9} />}
                            {copied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-relaxed text-[#d0d0d8]/80 custom-scrollbar max-h-[260px]">
                        <code>{codeLines.join("\n")}</code>
                      </pre>
                    </div>

                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[9px] font-semibold text-green-400 border border-green-500/20">
                        <Gauge size={8} strokeWidth={2.5} />
                        O(N)
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-[#8a3030]/10 px-2 py-0.5 text-[9px] font-semibold text-[#b0b0b0] border border-[#8a3030]/20">
                        <Cpu size={8} strokeWidth={2.5} />
                        0.24s
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold text-amber-400 border border-amber-500/20">
                        <Zap size={8} strokeWidth={2.5} />
                        Streaming
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] bg-white/[0.015] px-3 py-1 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[9px] text-white/25 font-mono">Ready</span>
          </div>
          <span className="text-[8px] text-white/15">AI can make mistakes</span>
        </div>
      </div>
    </div>
  );
}
