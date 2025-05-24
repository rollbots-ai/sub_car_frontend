class ChatService {
  private baseURL: string;
  
  constructor(baseURL = 'http://localhost:3000/api/chat') {
    this.baseURL = baseURL;
  }

  async startChat() {
    const response = await fetch(`${this.baseURL}/start`, {
      method: 'POST',
    });
    const responseData = await response.json();
    if (!responseData.data?.threadId) {
      throw new Error('Failed to start chat');
    }
    return responseData.data.threadId;
  }

  async sendMessage(threadId: string, message: string): Promise<string> {
    if (!threadId) {
      throw new Error('Thread ID is required');
    }
    const response = await fetch(`${this.baseURL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, message }),
    });
    const responseData = await response.json();
    if (!responseData.data?.response) {
      throw new Error('Failed to send message');
    }
    return responseData.data.response;
  }

  async getChatHistory(threadId: string) {
    if (!threadId) {
      throw new Error('Thread ID is required');
    }
    const response = await fetch(`${this.baseURL}/history/${threadId}`);
    const responseData = await response.json();
    if (!responseData.data?.history) {
      throw new Error('Failed to get chat history');
    }
    return responseData.data.history;
  }
}

export default new ChatService();
