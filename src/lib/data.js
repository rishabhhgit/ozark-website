export const NAV_LINKS = [
  { label: "Features", href: "/" },
  { label: "Ozark", href: "/ozark" },
  { label: "Ozark Alpha", href: "/ozarkAlpha" },
];

export const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
];

export const PROVIDERS = [
  { name: "OpenAI", color: "#10A37F", requiresKey: true, models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"] },
  { name: "Claude", color: "#D97706", requiresKey: true, models: ["claude-opus-4-6", "claude-sonnet-4-6", "claude-haiku-4-5"] },
  { name: "Gemini", color: "#2563EB", requiresKey: true, models: ["gemini-3.8-flash", "gemini-3.7-flash","gemini-3.6-flash","gemini-3.5-flash","gemini-3.5-flash-lite"] },
  { name: "DeepSeek", color: "#0053E0", requiresKey: true, models: ["deepseek-coder", "deepseek-chat"] },
  { name: "Groq", color: "#F55036", requiresKey: true, models: ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"] },
  { name: "Mistral", color: "#EA580C", requiresKey: true, models: ["mistral-large-latest", "mistral-small-latest"] },
  { name: "Ollama", color: "#4B5563", requiresKey: false, models: ["llama3.2", "mistral", "phi3", "gemma2"] },
  { name: "OpenRouter", color: "#8B5CF6", requiresKey: true, models: ["any model on OpenRouter"] },
];

export const FEATURES = [
  {
    eyebrow: "DYNAMIC ISLAND",
    title: "Floating AI that stays out of your way",
    body: "A compact, always-on-top bar that hovers over any application. Type a question, get an answer, and never lose context. The Dynamic Island shares your full conversation history with the main window.",
    kind: "island",
    reverse: false,
    details: [
      "Provider/model selectors in compact bar",
      "Response panel slides down with smooth animation",
      "Shared history with main window",
      "Screenshot capture with Ctrl+Shift+Space",
      "Copy & AutoType on every response",
    ],
  },
  {
    eyebrow: "STEALTH OVERLAY",
    title: "Invisible to screen sharing",
    body: "A tiny, cursor-following text layer powered by Windows GDI that is completely hidden from screen-sharing software and proctoring tools. Ask questions without anyone knowing.",
    kind: "stealth",
    reverse: true,
    details: [
      "Follows mouse cursor as translucent overlay",
      "Hidden from screen sharing & recording",
      "Alt+I to focus input, type question",
      "Ctrl+Shift+H to hide in cursor overlay mode 👻",
    ],
  },
  {
    eyebrow: "SCREENSHOT ANALYSIS",
    title: "Capture, ask, solve",
    body: "Press Ctrl+Shift+Space to capture your screen. The AI sees exactly what you see — coding problems, diagrams, system designs. Ask it to solve, explain, or optimize anything in the screenshot.",
    kind: "screenshot",
    reverse: false,
    details: [
      "App hides during capture automatically",
      "Multiple screenshots supported",
      "Works in Normal Window & Dynamic Island",
      "Capture coding problems, diagrams, designs",
    ],
  },
  {
    eyebrow: "AUTOTYPE",
    title: "Let the AI type for you",
    body: "AutoType simulates human typing with random delays directly into any text field. Press F9 to start, F10 to stop. Perfect for coding challenges where you need to type fast without suspicion.",
    kind: "autotype",
    reverse: true,
    details: [
      "Human-like random delays between keystrokes",
      "Respects capital letters & special characters",
      "F9 to start, F10 to stop",
    ],
  },
  {
    eyebrow: "VOICE RECOGNITION",
    title: "Speak your questions, get instant answers",
    body: "Powered by Whisper, Ozark now supports voice input. Speak your coding questions instead of typing — your speech is transcribed in real-time and processed for a smoother, hands-free experience. Built with DSA problem-solving assistance.",
    kind: "voice",
    reverse: false,
    details: [
      "Whisper-based speech-to-text engine",
      "Real-time transcription with low latency",
      "Hands-free mode for online assessment and interview",
      "DSA problem-solving with voice commands",
      "Works in Dynamic Island",
    ],
  },
  {
    eyebrow: "CODE MODE",
    title: "Optimized for competitive programming",
    body: "Specialized prompts detect your coding platform, identify algorithmic patterns (DP, greedy, graph), state optimal complexity, and produce clean, well-commented code with self-checks for edge cases.",
    kind: "code",
    reverse: false,
    details: [
      "Detects LeetCode, HackerRank, Codeforces",
      "Identifies DP, greedy, graph patterns",
      "States time/space complexity first",
      "Clean code with correct function signatures",
      "Self-check: tracing, edge cases, overflow",
    ],
  },
  {
    eyebrow: "MULTI-MODEL INTELLIGENCE",
    title: "The best models, one shortcut away",
    body: "Switch instantly between OpenAI, Claude, Gemini, DeepSeek, Groq, Mistral, Ollama, or OpenRouter. Use the optimal model for algorithmic puzzles, system design, or behavioral strategies.",
    kind: "providers",
    reverse: true,
    details: [
      "8 built-in providers supported",
      "Custom OpenAI-compatible endpoints",
      "Local Ollama for offline use",
      "Server AI with managed providers",
    ],
  },
  {
    eyebrow: "SERVER AI",
    title: "Managed AI with zero setup",
    body: "Connect to a backend account and get instant access to managed Server AI providers. No API keys needed — just log in and start asking. Usage limits are tracked automatically, and providers disable when limits are reached.",
    kind: "serverai",
    reverse: false,
    details: [
      "Auto-disable when limits reached",
      "Seamless fallback to local providers",
      "Enterprise-grade reliability",
    ],
  },
  {
    eyebrow: "DISGUISE MODE",
    title: "Hide in plain sight",
    body: "Press Ctrl+Shift+U to instantly morph Ozark into a realistic Windows Update screen. One hotkey transforms your AI assistant into something nobody questions.",
    kind: "disguise",
    reverse: false,
    details: [
      "Title changes to 'Windows Update'",
      "Static progress bar with status text",
      "Window size fixed at 400x180",
      "Single hotkey toggle (Ctrl+Shift+U)",
      "Instant switch back to Ozark",
    ],
  },
  {
    eyebrow: "CUSTOM SYSTEM PROMPT",
    title: "Define your ideal assistant",
    body: "Permanently add your own instructions to every AI request. 'Always answer in bullet points', 'Use TypeScript', 'Explain like I'm 5' — saved automatically, persists after restart.",
    kind: "prompt",
    reverse: true,
    details: [
      "Edit via ✎ button in main window",
      "Toggle on/off with 📝 button",
      "Applied to both Window & Island",
      "Saved automatically to settings.json",
      "Persists across app restarts",
    ],
  },
  {
    eyebrow: "ZERO TELEMETRY",
    title: "Absolute privacy by design",
    body: "No accounts, no cloud sync, and no tracking. API keys are encrypted locally and communicate directly with providers. Your prep work stays strictly on your machine.",
    kind: "privacy",
    reverse: false,
    details: [
      "No accounts required",
      "No cloud sync",
      "No telemetry or tracking",
      "Direct provider communication",
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Download & Install",
    body: "Single executable, no installation wizard. Double-click to run. Works on Windows 10/11 with .NET 6+ runtime.",
    icon: "download",
    details: "self-contained single executable file (180 MB)",
  },
  {
    step: "02",
    title: "Add Your API Keys",
    body: "Enter keys for OpenAI, Anthropic, Gemini, or any supported provider. Keys are stored locally and never leave your machine.",
    icon: "key",
  },
  {
    step: "03",
    title: "Ask Anything",
    body: "Type questions, capture screenshots, or use the Dynamic Island. Ozark connects to the best model for your task.",
    icon: "chat",
    details: "Ctrl+Enter to send, or use AutoType with F9",
  },
  {
    step: "04",
    title: "Stay Invisible",
    body: "Enable Stealth Mode or Disguise Mode. The AI stays hidden from screen capture, screen sharing, and proctoring software.",
    icon: "shield",
  },
];

export const SHORTCUTS = [
  { keys: ["Ctrl", "Shift", "G"], action: "Show / hide the main window in Main Window" },
  { keys: ["Ctrl", "Shift", "Space"], action: "Capture screenshot & attach to AI" },
  { keys: ["Alt", "I"], action: "Focus AI input box (instantly start typing)" },
  { keys: ["Ctrl", "Shift", "Enter"], action: "Send message (in input box)" },
  { keys: ["Ctrl", "Shift", "S"], action: "Toggle Stealth / Cursor Mode" },
  { keys: ["Ctrl", "Shift", "H"], action: "Hide floating cursor overlay" },
  { keys: ["Ctrl", "Shift", "U"], action: "Disguise as Windows Update" },
  { keys: ["Ctrl", "Shift", "↑/↓"], action: "Scroll chat / response" },
  { keys: ["Ctrl", "↑"], action: "Show Island response panel" },
  { keys: ["Ctrl", "↓"], action: "Collapse Island response panel" },
  { keys: ["F9"], action: "Start AutoType (after preparing)" },
  { keys: ["F10"], action: "Stop AutoType" },
  { keys: ["Ctrl", "Alt", "S"], action: "Switch between Server AI models and Custom AI models" },
  { keys: ["Ctrl", "Alt", "Arrow Keys"], action: "Move the Main Window and Island Window in any direction" },
  { keys: ["Ctrl", "Shift", "Enter"], action: "Send a screenshot/request to the AI" },
  { keys: ["Ctrl", "Alt", "+"], action: "Increase font size" },
  { keys: ["Ctrl", "Alt", "-"], action: "Decrease font size" },
  { keys: ["Alt", "Arrow Keys"], action: "Switch between AI models/providers" },
];

export const SYSTEM_REQUIREMENTS = {
  os: "Windows 11 (64-bit)",
  runtime: ".NET 6, 7, or 8 Desktop Runtime (framework-dependent only)",
  ram: "4 GB minimum, 8 GB recommended",
  disk: {
    framework: "~15 MB",
    selfContained: "~180 MB",
  },
};

export const SETTINGS_CONFIG = [
  { key: "anthropic", label: "Anthropic Key", description: "Your Anthropic API key for Claude models" },
  { key: "openai", label: "OpenAI Key", description: "Your OpenAI API key for GPT models" },
  { key: "gemini", label: "Gemini Key", description: "Your Google Gemini API key" },
  { key: "groq", label: "Groq Key", description: "Your Groq API key for fast inference" },
  { key: "mistral", label: "Mistral Key", description: "Your Mistral API key" },
  { key: "openrouter", label: "OpenRouter Key", description: "Your OpenRouter API key for multi-model access" },
  { key: "ollama", label: "Ollama URL", description: "Base URL of your Ollama server (default: localhost:11434)" },
  { key: "prompt", label: "Custom System Prompt", description: "Extra instructions appended to every AI request" },
  { key: "stealth", label: "Stealth Mode", description: "Enable/disable stealth (cursor overlay) mode" },
  { key: "providers", label: "Custom Providers", description: "Add your own OpenAI-compatible endpoints" },
];

export const SECURITY_FEATURES = [
  {
    title: "SetWindowDisplayAffinity",
    description: "Windows API that makes the window completely invisible to screen-capture, screen-sharing, and proctoring tools.",
    code: "WDA_EXCLUDEFROMCAPTURE",
  },
  {
    title: "Disguise Mode",
    description: "Transforms the window into a realistic 'Windows Update' screen with a single hotkey.",
    hotkey: "Ctrl+Shift+U",
  },
  {
    title: "Topmost Enforcement",
    description: "A background timer ensures the window always stays above other applications.",
  },
];

export const MAIN_WINDOW_CONTROLS = {
  titleBar: [
    "Traffic-light buttons (Close, Minimize, Maximize)",
    "Application name: Ozark",
    "INVISIBLE badge (hidden from screen capture)",
    "Code Mode toggle",
    "Clear Screenshots button",
    "Island mode switch",
  ],
  provider: [
    "Provider dropdown (Anthropic, OpenAI, Mistral, etc.)",
    "Model dropdown (gpt-4o, claude-sonnet-4-6, etc.)",
    "Settings gear button",
  ],
  customPrompt: [
    "Prompt preview text",
    "Toggle on/off",
    "Edit button for custom instructions",
  ],
  chat: [
    "User messages (right, blue bubble)",
    "AI responses (left, grey bubble) with syntax highlighting",
    "Copy & AutoType buttons on each response",
    "+/- font size buttons",
  ],
  input: [
    "Multi-line text box",
    "Ctrl+Shift+Enter to send",
    "Screenshot button",
    "Clear conversation button",
  ],
};
