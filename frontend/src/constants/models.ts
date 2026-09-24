// NOTE: do not change values, bcz its model of gemini api not random value


export const MODELS = [
  { label: "GPT-OSS 20B",           value: "openai/gpt-oss-20b",            rpm: 30, rpd: 14400 },
  { label: "GPT-OSS 120B",          value: "openai/gpt-oss-120b",           rpm: 30, rpd: 14400 },
  { label: "Qwen 3.8 27B",          value: "qwen/qwen3.8-27b",              rpm: 30, rpd: 14400 },
  { label: "GPT-OSS Safeguard 20B", value: "openai/gpt-oss-safeguard-20b",  rpm: 30, rpd: 14400 },
];

export const defaultModel = "openai/gpt-oss-120b";
