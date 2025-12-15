'use client';

import { useState, useRef, useEffect } from 'react';
import Avatar from './components/Avatar';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || data.error
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }
    
    setIsLoading(false);
  };

  const quickPrompts = [
    "Tell me about your AI projects",
    "What certifications do you have?",
    "What technologies do you work with?",
    "What role are you looking for?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
              M
            </div>
            <div>
              <h1 className="text-xl font-semibold">Miguel</h1>
              <p className="text-xs text-gray-400">AI-Powered Resume Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              ● Online
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Avatar Section - Left Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                  <Avatar isSpeaking={isLoading} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">Computer Science Graduate</h2>
                  <p className="text-sm text-gray-400">BS Computer Science, AI Specialization</p>
                  <p className="text-sm text-gray-400">Mapúa University</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                      Python
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                      AI/ML
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs border border-pink-500/30">
                      RAG Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col h-[calc(100vh-12rem)]">
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center text-3xl animate-pulse">
                      👋
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Hi! I'm Miguel</h3>
                    <p className="text-gray-400 mb-8">Ask me anything about my skills, projects, or experience</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {quickPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(prompt)}
                          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-left group"
                        >
                          <p className="text-sm group-hover:text-purple-300 transition-colors">{prompt}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          M
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 ml-auto'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm flex-shrink-0">
                          👤
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                      M
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Ask about my skills, projects, or experience..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 rounded-2xl font-semibold transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                  >
                    {isLoading ? '...' : 'Send'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Powered by AI • Built with Next.js & Ready Player Me
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
