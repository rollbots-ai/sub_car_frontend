import { useState, useEffect } from 'react';
import chatService from '../services/chatService';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Button,
} from '@chatscope/chat-ui-kit-react';

interface ChatMessage {
  message: string;
  sender: 'user' | 'system';
  direction: 'incoming' | 'outgoing';
}

interface HistoryMessage {
  content: string;
  role: 'user' | 'system';
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !threadId) {
      chatService.startChat()
        .then(id => {
          setThreadId(id);
          return chatService.getChatHistory(id);
        })
        .then(history => {
          if (history.length === 0) {
            // Set welcome message if no history exists
            setMessages([{
              message: "Hello! How can I help you today?",
              sender: "system",
              direction: "incoming",
            }]);
          } else {
            // Transform history to ChatMessage format
            const formattedHistory = history.map((msg: HistoryMessage) => ({
              message: msg.content,
              sender: msg.role,
              direction: msg.role === 'user' ? 'outgoing' : 'incoming',
            }));
            setMessages(formattedHistory);
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  const handleSend = async (message: string) => {
    if (!threadId || isLoading) return;
    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      message,
      sender: 'user',
      direction: 'outgoing',
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await chatService.sendMessage(threadId, message);
      
      setMessages(prev => [...prev, {
        message: response,
        sender: 'system',
        direction: 'incoming',
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        message: 'Sorry, there was an error processing your request.',
        sender: 'system',
        direction: 'incoming',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl">
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Content>
                  <div className="flex justify-between items-center w-full">
                    <div className="text-lg font-semibold">Chat Support</div>
                    <Button
                      onClick={() => setIsOpen(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px',
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                </ConversationHeader.Content>
              </ConversationHeader>
              <MessageList>
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    model={{
                      message: msg.message,
                      sender: msg.sender,
                      direction: msg.direction,
                      position: "single",
                    }}
                  />
                ))}
              </MessageList>
              <MessageInput
                placeholder={isLoading ? "Please wait..." : "Type message here..."}
                value={inputMessage}
                onChange={val => setInputMessage(val)}
                onSend={() => {
                  if (!isLoading && inputMessage.trim()) {
                    handleSend(inputMessage);
                    setInputMessage("");
                  }
                }}
                attachButton={false}
                disabled={isLoading}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </div>
  );
};
