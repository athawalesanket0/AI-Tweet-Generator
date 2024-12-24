import React, { useEffect, useState } from 'react';
import { generateMultipleTweets } from '../services/tweetService';

const TweetGenerator = ({ onTweetsGenerated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateTweets = async () => {
      setLoading(true);
      const newTweets = await generateMultipleTweets(5);
      onTweetsGenerated(newTweets);
      setLoading(false);
    };

    generateTweets();
  }, [onTweetsGenerated]);

  return loading ? (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  ) : null;
};

export default TweetGenerator;