import { RecentActivityItem, SpendingByModel, CategoryShare, LearningSession, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Sanjana',
  role: 'Student',
  avatarInitial: 'S',
  email: 'sanjana.student@university.edu',
  monthlyBudgetINR: 500,
  currency: '₹',
  savingsTargetINR: 100
};

export const INITIAL_METRICS = {
  aiRequests: 72,
  aiRequestsTrend: '+12% from last month',
  totalCostINR: 145,
  budgetINR: 500,
  potentialSavingsINR: 92,
  mostUsedCategory: 'Coding AI',
  mostUsedCount: 32,
  sparklinePoints: [18, 22, 28, 24, 35, 42, 48, 55, 62, 58, 68, 72]
};

export const USAGE_BY_CATEGORY: CategoryShare[] = [
  { name: 'Coding', percentage: 32, requests: 23, color: '#2563eb' },
  { name: 'Research', percentage: 21, requests: 15, color: '#06b6d4' },
  { name: 'Writing', percentage: 17, requests: 12, color: '#f97316' },
  { name: 'Image Generation', percentage: 12, requests: 9, color: '#d946ef' },
  { name: 'Others', percentage: 18, requests: 13, color: '#f43f5e' }
];

export const TOP_RECOMMENDED_MODELS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    requests: 28,
    share: '39%',
    badge: 'Best for general tasks',
    iconColor: '#10a37f'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    requests: 16,
    share: '22%',
    badge: 'Best for research',
    iconColor: '#2563eb'
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    requests: 12,
    share: '17%',
    badge: 'Best for long context',
    iconColor: '#d97706'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    provider: 'GitHub / Microsoft',
    requests: 8,
    share: '11%',
    badge: 'Best for coding',
    iconColor: '#4f46e5'
  }
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'Debug Python code',
    model: 'ChatGPT',
    timeAgo: '2 hours ago',
    category: 'Coding',
    status: 'Recommended',
    costINR: 0
  },
  {
    id: 'act-2',
    title: 'Research on renewable energy',
    model: 'Perplexity',
    timeAgo: '4 hours ago',
    category: 'Research',
    status: 'Recommended',
    costINR: 0
  },
  {
    id: 'act-3',
    title: 'Write a college essay',
    model: 'Claude',
    timeAgo: '1 day ago',
    category: 'Writing',
    status: 'Recommended',
    costINR: 3.5
  },
  {
    id: 'act-4',
    title: 'Generate image for presentation',
    model: 'Midjourney',
    timeAgo: '1 day ago',
    category: 'Image Generation',
    status: 'Recommended',
    costINR: 8
  }
];

export const SPENDING_BY_MODEL: SpendingByModel[] = [
  { model: 'ChatGPT', spentINR: 68, requests: 28, color: '#3b82f6' },
  { model: 'Gemini', spentINR: 32, requests: 16, color: '#60a5fa' },
  { model: 'Claude', spentINR: 21, requests: 12, color: '#818cf8' },
  { model: 'Copilot', spentINR: 12, requests: 8, color: '#a78bfa' },
  { model: 'Midjourney', spentINR: 8, requests: 4, color: '#c084fc' }
];

export const DEFAULT_LEARNING_SESSION: LearningSession = {
  problemTitle: 'Help me solve this DSA problem: Find the sum of two numbers in a sorted array.',
  currentStepIndex: 1,
  steps: [
    {
      stepNumber: 1,
      title: 'Understand the problem',
      guidance: 'You need to find two numbers in a sorted array that add up to a target value (e.g., target = 9 in [2, 7, 11, 15]). Because the array is already sorted in non-decreasing order, notice what happens when you inspect elements at both opposite ends!',
      hint: 'Notice that smaller values are always on the left, and larger values are always on the right.'
    },
    {
      stepNumber: 2,
      title: 'Think about the approach',
      guidance: 'Can you think of a way to do this efficiently without checking every single pair? A brute force nested loop takes O(n²) time. Can we do it in linear O(n) time with O(1) space?',
      hint: 'What happens if you maintain one pointer at the start and another pointer at the end of the array?'
    },
    {
      stepNumber: 3,
      title: 'Formulate the two-pointer decision rule',
      guidance: 'Calculate current_sum = numbers[left] + numbers[right]. If current_sum == target, you found the indices! If current_sum < target, we need a larger sum, so move left pointer rightward (left++). If current_sum > target, move right pointer leftward (right--).',
      hint: 'Why does moving left pointer make the sum larger? Because the array is sorted!'
    },
    {
      stepNumber: 4,
      title: 'Analyze complexity',
      guidance: 'In each step, either the left pointer increases or the right pointer decreases. They can meet at most in N iterations. Hence, Time Complexity is O(n) and Space Complexity is O(1) auxiliary memory.',
      hint: 'Notice no extra hash map or storage is needed.'
    }
  ],
  solutionCode: `def twoSum(numbers: list[int], target: int) -> list[int]:
    left = 0
    right = len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1] # 1-indexed return
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []`,
  solutionExplanation: 'The two-pointer technique exploits the sorted property of the array to achieve O(n) time complexity and O(1) space complexity without allocating extra memory.',
  userResponses: [
    {
      role: 'user',
      text: 'Help me solve this DSA problem: Find the sum of two numbers in a sorted array.',
      timestamp: 'Just now'
    },
    {
      role: 'assistant',
      text: "Great! Let's solve this step by step.\n\nStep 1: Understand the problem\nYou need to find two numbers in a sorted array that add up to a target value.\n\nStep 2: Think about the approach\nCan you think of a way to do this efficiently?",
      timestamp: 'Just now'
    }
  ]
};
