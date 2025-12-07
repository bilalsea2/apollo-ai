"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ChatMessage, ChatService } from './ChatService';

interface ChatContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleOpen: () => void;
    messages: ChatMessage[];
    isTyping: boolean;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome-msg',
            role: 'assistant',
            content: "Hi! I'm the Apollo AI Assistant. Ask me anything about the project!",
            timestamp: Date.now(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        // 1. Add User Message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            // 2. Get Response from "Brain"
            const responseText = await ChatService.getResponse(content);

            // 3. Add AI Message
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseText,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error processing your request.",
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([{
            id: 'welcome-msg',
            role: 'assistant',
            content: "Hi! I'm the Apollo AI Assistant. Ask me anything about the project!",
            timestamp: Date.now(),
        }]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                setIsOpen,
                toggleOpen,
                messages,
                isTyping,
                sendMessage,
                clearMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
