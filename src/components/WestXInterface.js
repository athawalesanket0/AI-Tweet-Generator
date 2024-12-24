import React, { useState, useEffect } from 'react';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, Home, Bookmark, ShoppingCart, Users, User, RefreshCw } from 'lucide-react';
import { generateMultipleTweets } from '../services/tweetService';
import user_img from "../assets/image1.png";

const WestXInterface = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTweets = async () => {
        setLoading(true);
        try {
            const newTweets = await generateMultipleTweets(5);
            setTweets(newTweets);
        } catch (error) {
            console.error('Error generating tweets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const whoToFollow = [
        {
            name: "user1",
            handle: "@user1"
        },
        {
            name: "user2",
            handle: "@user2"
        }
    ];

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-[280px] border-r border-gray-200 p-4 fixed h-full bg-white">
                <div className="mb-4">
                    <img src={user_img} alt="WestX Logo" className="rounded-full h-12 w-12" />
                </div>

                <nav className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <Home className="w-6 h-6" />
                        <span className="text-xl">Home</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <Bookmark className="w-6 h-6" />
                        <span className="text-xl">Bookmarks</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="text-xl">Premium</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <Users className="w-6 h-6" />
                        <span className="text-xl">Peoples</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <User className="w-6 h-6" />
                        <span className="text-xl">Profile</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                        <MoreHorizontal className="w-6 h-6" />
                        <span className="text-xl">More</span>
                    </div>
                </nav>
            </div>

            <div className="ml-[280px] mr-[320px] flex-1 min-h-screen">
                <div className="border-b border-gray-200 p-4 bg-white sticky top-0 z-10 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Home</h1>
                    <button
                        onClick={fetchTweets}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="divide-y">
                        {tweets.map(tweet => (
                            <div key={tweet.id} className="p-6 hover:bg-gray-50">
                                <div className="flex space-x-4">
                                    <img src={user_img} alt={tweet.author} className="rounded-full h-12 w-12" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-1 flex-wrap">
                                            <span className="font-bold">{tweet.author}</span>
                                            {tweet.verified && (
                                                <span className="text-blue-500">✓</span>
                                            )}
                                            <span className="text-gray-500">{tweet.handle}</span>
                                            <span className="text-gray-500">· {tweet.date}</span>
                                            <div className="ml-auto">
                                                <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                            </div>
                                        </div>
                                        <p className="mt-2 text-[15px] leading-normal break-words">{tweet.content}</p>
                                        {tweet.isAI && (
                                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mt-3">AI</span>
                                        )}
                                        <div className="flex justify-between mt-4 text-gray-500 max-w-md">
                                            <button className="flex items-center space-x-2 hover:text-blue-500 group">
                                                <MessageCircle className="w-5 h-5" />
                                                <span className="group-hover:text-blue-500">0</span>
                                            </button>
                                            <button className="flex items-center space-x-2 hover:text-green-500 group">
                                                <Repeat2 className="w-5 h-5" />
                                                <span className="group-hover:text-green-500">{tweet.retweets}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 hover:text-red-500 group">
                                                <Heart className="w-5 h-5" />
                                                <span className="group-hover:text-red-500">{tweet.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 hover:text-blue-500">
                                                <Share className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-[320px] p-4 border-l border-gray-200 fixed right-0 h-full bg-white overflow-y-auto">
                <div className="bg-gray-50 rounded-xl p-4">
                    <h2 className="text-xl font-bold mb-4">Who to follow</h2>
                    {whoToFollow.map((user, index) => (
                        <div key={index} className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3">
                                <img src={user_img} alt={user.name} className="rounded-full w-10 h-10" />
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-gray-500">{user.handle}</div>
                                </div>
                            </div>
                            <button className="bg-black text-white rounded-full px-4 py-1.5 hover:bg-gray-900">
                                Follow
                            </button>
                        </div>
                    ))}
                    <button className="text-blue-500 hover:text-blue-600 mt-3 font-medium">
                        Show more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WestXInterface;