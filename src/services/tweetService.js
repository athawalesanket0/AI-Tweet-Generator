import openai from './openaiConfig';

const personalities = [
  {
    name: "Elon Musk",
    handle: "@elonmusk",
    interests: "technology, space exploration, sustainability, AI"
  },
  {
    name: "Morgan Freeman",
    handle: "@morgan_freeman",
    interests: "education, philosophy, storytelling, human nature"
  },
  {
    name: "Neil deGrasse Tyson",
    handle: "@neiltyson",
    interests: "science, astronomy, education, critical thinking"
  },
  {
    name: "Michelle Obama",
    handle: "@michelleobama",
    interests: "education, health, community empowerment, social justice"
  },
  {
    name: "Bill Gates",
    handle: "@billgates",
    interests: "technology, global health, climate change, philanthropy"
  }
];

// For development without OpenAI API
const generateMockTweet = () => {
  const personality = personalities[Math.floor(Math.random() * personalities.length)];
  const topics = [
    "The future of AI is not about replacing humans, but augmenting our capabilities. We need to focus on collaborative innovation.",
    "Climate change requires immediate action. Let's invest in sustainable technologies and renewable energy solutions.",
    "Education is the key to unlocking human potential. We must make quality learning accessible to everyone.",
    "Space exploration pushes the boundaries of human achievement. Each discovery brings us closer to understanding our place in the cosmos.",
    "Community building in the digital age requires authentic connection and meaningful dialogue.",
    "Innovation comes from diverse perspectives working together. Let's break down barriers and foster inclusive collaboration.",
    "The power of storytelling can bridge divides and create understanding across cultures and communities.",
    "Scientific literacy is crucial in today's world. We must encourage critical thinking and evidence-based decision making."
  ];

  return {
    id: Date.now(),
    author: personality.name,
    handle: personality.handle,
    verified: true,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    content: topics[Math.floor(Math.random() * topics.length)],
    retweets: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 2000),
    isAI: true
  };
};

export const generateMultipleTweets = async (count = 5) => {
  const tweets = [];
  for (let i = 0; i < count; i++) {
    tweets.push(generateMockTweet());
  }
  return tweets;
};