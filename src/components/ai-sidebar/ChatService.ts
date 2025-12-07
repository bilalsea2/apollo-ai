
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

interface KnowledgeEntry {
    triggers: string[];
    answer: string;
}

// Simple rule-based knowledge base
const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    {
        triggers: ['what', 'project', 'do', 'about', 'function', 'mission'],
        answer: "Apollo AI helps users solve crop stress detection issues. It provides advanced vegetation indices analysis using deep learning, automates the monitoring process, and helps in precision agriculture decision-making."
    },
    {
        triggers: ['who', 'audience', 'intended', 'user', 'for'],
        answer: "This product is intended for farmers, agronomists, and agricultural organizations facing crop health monitoring challenges. For example, an organization dealing with large-scale field monitoring can achieve early stress detection and better yield planning through our application."
    },
    {
        triggers: ['market', 'cap', 'value', 'economic', 'money', 'worth'],
        answer: "The global crop monitoring market is rapidly growing. Currently, there is a $220B economic impact from crop losses worldwide that we aim to mitigate. The precision agriculture market itself is projected to reach over $15B by 2030."
    },
    {
        triggers: ['stat', 'number', 'loss', 'impact', 'percentage'],
        answer: "Did you know that 40% of global crops are lost to pests and disease annually? Apollo AI aims to reduce this. Traditional manual detection has a typical delay of 72 hours, which we reduce to near real-time."
    },
    {
        triggers: ['tech', 'stack', 'technology', 'how', 'work', 'model'],
        answer: "We use a combination of drone imagery, CNN models for stress classification, and vegetation indices like VARI, GLI, and ExG. Our tech stack involves Next.js, Python/Django for ML processing, and Three.js for visualization."
    },
    {
        triggers: ['hello', 'hi', 'hey', 'greetings'],
        answer: "Hello! I am your Apollo AI assistant. How can I help you today? You can ask me about our mission, the technology we use, or market impact."
    }
];

const DEFAULT_ANSWER = "I'm not sure about that yet. I'm currently a lightweight assistant designed to answer basic questions about the Apollo AI project. Try asking 'What does this project do?'";

export class ChatService {
    /**
     * Simulates an async API call to get a response
     */
    static async getResponse(userMessage: string): Promise<string> {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        const normalizedInput = userMessage.toLowerCase();

        // 1. Exact/Fuzzy Keyword Matching
        for (const entry of KNOWLEDGE_BASE) {
            // Check if critical keywords are present
            // For now, we require at least one match, but we could make this stricter
            const match = entry.triggers.some(trigger => normalizedInput.includes(trigger));
            if (match) {
                return entry.answer;
            }
        }

        // 2. Return Fallback
        return DEFAULT_ANSWER;
    }
}
