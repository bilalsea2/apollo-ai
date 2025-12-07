"use client";

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Bot, User, MessageSquare, Sparkles } from 'lucide-react';
import { useChat } from './ChatContext';
import { cn } from '@/lib/utils'; // Assuming standard shadcn/utils exist, otherwise will use clsx/tailwind-merge inline

export function ChatSidebar() {
    const { isOpen, toggleOpen, messages, isTyping, sendMessage } = useChat();
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const text = inputValue;
        setInputValue("");
        await sendMessage(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleOpen}
                        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 transition-shadow hover:shadow-green-500/50"
                    >
                        <MessageSquare className="h-6 w-6 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleOpen}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 z-50 h-full w-full max-w-[400px] border-l border-white/20 glass-card shadow-2xl sm:w-[400px] flex flex-col"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} // Light mode base fallback
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gray-200/50 p-4 backdrop-blur-md bg-white/50">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-800">Apollo Assistant</h2>
                                        <p className="text-xs text-gray-500">Powered by AI</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleOpen}
                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200">
                                <div className="flex flex-col gap-4">
                                    {messages.map((msg) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={msg.id}
                                            className={cn(
                                                "flex w-max max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm shadow-sm",
                                                msg.role === 'user'
                                                    ? "self-end bg-green-600 text-white"
                                                    : "self-start bg-white border border-gray-100 text-gray-700"
                                            )}
                                        >
                                            {msg.role === 'assistant' && (
                                                <div className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-600 font-medium">
                                                    <Sparkles className="h-3 w-3" /> AI
                                                </div>
                                            )}
                                            {msg.content}
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="self-start rounded-2xl bg-white px-4 py-3 border border-gray-100 shadow-sm"
                                        >
                                            <div className="flex gap-1">
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-green-500"></span>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="border-t border-gray-200/50 bg-white/50 p-4 backdrop-blur-md">
                                <div className="relative flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about crops, pests..."
                                        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-sm transition-all"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white transition-all hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
