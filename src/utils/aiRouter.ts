import { TaskAnalysisResult, TaskCategory, UserType, BudgetPreference, ModelScore } from '../types';

/**
 * Checks if a task is basic arithmetic or simple utility work where AI is not needed
 */
export function checkAiNotNeeded(prompt: string): { isNotNeeded: boolean; directAnswer?: string; toolName?: string; toolDesc?: string } {
  const trimmed = prompt.trim();

  // Arithmetic matching: e.g. "25 x 40", "25*40", "150 + 45", "500 / 25", "what is 25 * 40?"
  const mathRegex = /^(?:what is\s+)?(\d+(?:\.\d+)?)\s*([\+\-\*\/x×÷])\s*(\d+(?:\.\d+)?)\??$/i;
  const mathMatch = trimmed.match(mathRegex);

  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const operator = mathMatch[2].toLowerCase();
    const num2 = parseFloat(mathMatch[3]);
    let result = 0;

    if (operator === '+' || operator === 'plus') result = num1 + num2;
    else if (operator === '-' || operator === 'minus') result = num1 - num2;
    else if (operator === '*' || operator === 'x' || operator === '×') result = num1 * num2;
    else if (operator === '/' || operator === '÷') result = num2 !== 0 ? num1 / num2 : NaN;

    if (!isNaN(result)) {
      return {
        isNotNeeded: true,
        directAnswer: String(result),
        toolName: 'Calculator',
        toolDesc: 'Fast • Free • Accurate'
      };
    }
  }

  // Word count or length check: "length of hello world", "character count of ..."
  if (/^(?:character count of|length of|count letters in)\s+(.+)$/i.test(trimmed)) {
    const text = trimmed.replace(/^(?:character count of|length of|count letters in)\s+/i, '');
    return {
      isNotNeeded: true,
      directAnswer: `${text.length} characters`,
      toolName: 'Character Counter',
      toolDesc: 'Instant • Offline • Zero Token Cost'
    };
  }

  // Unit conversion: "100 km to miles", "5 kg to lbs"
  const unitMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(km|miles|kg|lbs|celsius|fahrenheit)\s+to\s+(km|miles|kg|lbs|celsius|fahrenheit)$/i);
  if (unitMatch) {
    const val = parseFloat(unitMatch[1]);
    const fromUnit = unitMatch[2].toLowerCase();
    const toUnit = unitMatch[3].toLowerCase();
    let converted: number | null = null;

    if (fromUnit === 'km' && toUnit === 'miles') converted = +(val * 0.621371).toFixed(2);
    else if (fromUnit === 'miles' && toUnit === 'km') converted = +(val * 1.60934).toFixed(2);
    else if (fromUnit === 'kg' && toUnit === 'lbs') converted = +(val * 2.20462).toFixed(2);
    else if (fromUnit === 'lbs' && toUnit === 'kg') converted = +(val / 2.20462).toFixed(2);

    if (converted !== null) {
      return {
        isNotNeeded: true,
        directAnswer: `${converted} ${toUnit}`,
        toolName: 'Unit Converter',
        toolDesc: 'Deterministic • Free • Instant'
      };
    }
  }

  return { isNotNeeded: false };
}

/**
 * Categorizes a user prompt based on intent keywords
 */
export function detectCategory(prompt: string, explicitCategory?: TaskCategory): TaskCategory {
  if (explicitCategory && explicitCategory !== 'Others') {
    return explicitCategory;
  }

  const p = prompt.toLowerCase();

  // Coding indicators
  if (/python|code|debug|javascript|typescript|react|function|dsa|algorithm|array|sql|bug|syntax|git|compiler|api|endpoint/.test(p)) {
    return 'Coding';
  }

  // Research indicators
  if (/research|paper|compare|literature|renewable|study|findings|history|market analysis|cite|sources/.test(p)) {
    return 'Research';
  }

  // Writing indicators
  if (/essay|write|draft|email|article|blog|story|letter|summary|paraphrase|proofread/.test(p)) {
    return 'Writing';
  }

  // Image Generation indicators
  if (/image|illustration|draw|render|photo|midjourney|visual|graphic|artwork|logo/.test(p)) {
    return 'Image Generation';
  }

  // Math indicators
  if (/math|calc|integral|equation|formula|multiply|matrix|derivative|statistic/.test(p)) {
    return 'Math/Calculation';
  }

  return 'Others';
}

/**
 * Generates recommended models with quality, speed, cost, and privacy ratings
 */
export function getRecommendedModels(
  category: TaskCategory,
  userType: UserType = 'Student',
  budgetPreference: BudgetPreference = 'Low (prefer free tools)'
): ModelScore[] {
  const isBudgetLow = budgetPreference.includes('Low') || userType === 'Student';

  if (category === 'Coding') {
    return [
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        provider: 'OpenAI (GPT-4o)',
        icon: 'chatgpt',
        color: '#10a37f',
        badge: 'Best Overall Choice',
        isBestChoice: true,
        qualityRating: 5,
        speedRating: 4,
        costLabel: isBudgetLow ? 'Free' : 'Free tier / ₹',
        privacyRating: 4,
        description: 'Great for code debugging, explanations and support.',
        pros: ['Exceptional code debugging', 'Step-by-step logic explanations', 'Generous free daily quota'],
        estimatedCostInINR: isBudgetLow ? 0 : 2.5
      },
      {
        id: 'claude',
        name: 'Claude',
        provider: 'Anthropic (Claude 3.5 Sonnet)',
        icon: 'claude',
        color: '#d97706',
        badge: 'Best for Complex Logic',
        qualityRating: 5,
        speedRating: 4,
        costLabel: '₹ ₹',
        privacyRating: 4,
        description: 'Good for long explanations and complex logic.',
        pros: ['Massive 200k context window', 'Refined architecture design', 'High coding accuracy'],
        estimatedCostInINR: 3.5
      },
      {
        id: 'copilot',
        name: 'GitHub Copilot',
        provider: 'GitHub / Microsoft',
        icon: 'copilot',
        color: '#4f46e5',
        badge: 'Best for IDE Autocomplete',
        qualityRating: 4,
        speedRating: 5,
        costLabel: 'Free for Students',
        privacyRating: 4,
        description: 'Fastest in-editor inline completions and PR reviews.',
        pros: ['Free via GitHub Student Developer Pack', 'Seamless VS Code integration'],
        estimatedCostInINR: 0
      },
      {
        id: 'gemini',
        name: 'Gemini',
        provider: 'Google (Gemini 2.5 Flash)',
        icon: 'gemini',
        color: '#2563eb',
        badge: 'Fastest Latency',
        qualityRating: 4,
        speedRating: 5,
        costLabel: 'Free',
        privacyRating: 4,
        description: 'Ultra-fast responses with massive context window and web grounding.',
        pros: ['1M+ context window', 'Google Search grounding', 'Generous free rate limits'],
        estimatedCostInINR: 0
      }
    ];
  }

  if (category === 'Research') {
    return [
      {
        id: 'gemini',
        name: 'Gemini',
        provider: 'Google (Gemini 2.5 Flash)',
        icon: 'gemini',
        color: '#2563eb',
        badge: 'Best for Research',
        isBestChoice: true,
        qualityRating: 5,
        speedRating: 5,
        costLabel: 'Free',
        privacyRating: 4,
        description: 'Live Google Search grounding with up-to-date sources and citations.',
        pros: ['Real-time web search integration', 'Direct source citation', 'Fast multi-document synthesis'],
        estimatedCostInINR: 0
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        provider: 'OpenAI (SearchGPT)',
        icon: 'chatgpt',
        color: '#10a37f',
        badge: 'Best for General Tasks',
        qualityRating: 4,
        speedRating: 4,
        costLabel: 'Free',
        privacyRating: 4,
        description: 'Solid knowledge base with broad topic synthesis.',
        pros: ['Clear conversational summaries', 'Good exploratory answers'],
        estimatedCostInINR: 0
      },
      {
        id: 'claude',
        name: 'Claude',
        provider: 'Anthropic (Claude 3.5 Sonnet)',
        icon: 'claude',
        color: '#d97706',
        badge: 'Best for Long Context',
        qualityRating: 5,
        speedRating: 4,
        costLabel: '₹ ₹',
        privacyRating: 5,
        description: 'Exemplary reading comprehension of large PDFs and academic whitepapers.',
        pros: ['Analyzes 100+ page papers in seconds', 'Nuanced nuance detection'],
        estimatedCostInINR: 3.2
      }
    ];
  }

  if (category === 'Writing') {
    return [
      {
        id: 'claude',
        name: 'Claude',
        provider: 'Anthropic',
        icon: 'claude',
        color: '#d97706',
        badge: 'Best for Natural Voice',
        isBestChoice: true,
        qualityRating: 5,
        speedRating: 4,
        costLabel: isBudgetLow ? 'Free tier' : '₹ ₹',
        privacyRating: 5,
        description: 'Unmatched human-like prose, essay structuring, and tone control.',
        pros: ['Least robotic sounding output', 'Nuanced vocabulary', 'Strong stylistic adherence'],
        estimatedCostInINR: isBudgetLow ? 0 : 2.8
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        provider: 'OpenAI',
        icon: 'chatgpt',
        color: '#10a37f',
        badge: 'Fast Drafts',
        qualityRating: 4,
        speedRating: 5,
        costLabel: 'Free',
        privacyRating: 4,
        description: 'Great for rapid outlining, grammar fixes, and brainstorming.',
        pros: ['Instant speed', 'Flexible tone switching'],
        estimatedCostInINR: 0
      },
      {
        id: 'gemini',
        name: 'Gemini',
        provider: 'Google',
        icon: 'gemini',
        color: '#2563eb',
        badge: 'Creative Brainstorming',
        qualityRating: 4,
        speedRating: 5,
        costLabel: 'Free',
        privacyRating: 4,
        description: 'Fast idea expansion and multi-lingual copywriting.',
        pros: ['Google Docs export ready', 'Fast iterations'],
        estimatedCostInINR: 0
      }
    ];
  }

  if (category === 'Image Generation') {
    return [
      {
        id: 'midjourney',
        name: 'Midjourney',
        provider: 'Midjourney v6.1',
        icon: 'midjourney',
        color: '#9333ea',
        badge: 'Highest Visual Fidelity',
        isBestChoice: true,
        qualityRating: 5,
        speedRating: 4,
        costLabel: '₹ ₹ ₹',
        privacyRating: 3,
        description: 'Industry-standard photorealism and artistic quality.',
        pros: ['Photorealistic textures', 'Cinematic composition'],
        estimatedCostInINR: 8.0
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT (DALL-E 3)',
        provider: 'OpenAI',
        icon: 'chatgpt',
        color: '#10a37f',
        badge: 'Best Prompt Adherence',
        qualityRating: 4,
        speedRating: 4,
        costLabel: 'Free tier / ₹',
        privacyRating: 4,
        description: 'Understands complex verbal instructions and text rendering inside images.',
        pros: ['Text rendering in images', 'Included in ChatGPT Plus/Free tiers'],
        estimatedCostInINR: 3.0
      }
    ];
  }

  // Default / Math / Others
  return [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      provider: 'OpenAI',
      icon: 'chatgpt',
      color: '#10a37f',
      badge: 'Best Overall Choice',
      isBestChoice: true,
      qualityRating: 5,
      speedRating: 4,
      costLabel: 'Free',
      privacyRating: 4,
      description: 'Versatile model with solid general problem solving.',
      pros: ['Balanced capabilities', 'Wide community support'],
      estimatedCostInINR: 0
    },
    {
      id: 'gemini',
      name: 'Gemini',
      provider: 'Google',
      icon: 'gemini',
      color: '#2563eb',
      badge: 'Fast & Free',
      qualityRating: 4,
      speedRating: 5,
      costLabel: 'Free',
      privacyRating: 4,
      description: 'Ultra fast responses with real-time web knowledge.',
      pros: ['Zero cost', 'Instant latency'],
      estimatedCostInINR: 0
    }
  ];
}

/**
 * Full task routing analysis
 */
export function analyzeTask(
  prompt: string,
  userType: UserType = 'Student',
  taskTypeOverride?: TaskCategory,
  budgetPreference: BudgetPreference = 'Low (prefer free tools)'
): TaskAnalysisResult {
  const notNeededCheck = checkAiNotNeeded(prompt);

  if (notNeededCheck.isNotNeeded) {
    return {
      task: prompt,
      category: 'Math/Calculation',
      userType,
      aiRequired: false,
      notNeededReason: 'This is a simple calculation. You can use a calculator instead.',
      directAnswer: notNeededCheck.directAnswer,
      recommendedTool: {
        name: notNeededCheck.toolName || 'Calculator',
        description: notNeededCheck.toolDesc || 'Fast • Free • Accurate',
        icon: 'calculator',
        badge: 'Zero Token Cost'
      },
      recommendedModels: [],
      summaryNote: 'Using AI for this task is unnecessary. You can save tokens, time and cost!'
    };
  }

  const detectedCat = detectCategory(prompt, taskTypeOverride);
  const models = getRecommendedModels(detectedCat, userType, budgetPreference);

  return {
    task: prompt,
    category: detectedCat,
    userType,
    aiRequired: true,
    recommendedModels: models,
    summaryNote: `Recommended ${models[0]?.name || 'ChatGPT'} as the optimal choice for your ${userType} profile and budget.`
  };
}

/**
 * Budget and savings calculation
 */
export function calculateBudgetMetrics(spentINR: number, budgetLimitINR: number = 500, averageSavingsINR: number = 92) {
  const safeBudget = budgetLimitINR > 0 ? budgetLimitINR : 500;
  const percentageUsed = Math.min(100, Math.round((spentINR / safeBudget) * 100));
  const remainingBudget = Math.max(0, safeBudget - spentINR);

  return {
    spentINR,
    budgetLimitINR: safeBudget,
    percentageUsed,
    remainingBudget,
    potentialSavingsINR: averageSavingsINR,
    isNearLimit: percentageUsed >= 80,
    isExceeded: spentINR > safeBudget
  };
}
