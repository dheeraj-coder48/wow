const { ChatGPTAPI } = require('chatgapi');

// Initialize with your API key (set as environment variable)
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // Define plant-related instructions for the AI
    const plantInstructions = `
      You are a plant expert assistant. You ONLY answer questions related to:
      - Plants and flowers
      - Gardening techniques
      - Plant care and maintenance
      - Soil types and fertilizers
      - Plant diseases and treatments
      - Indoor and outdoor gardening
      - Plant identification
      - Gardening tools and equipment
      
      If a question is not related to plants or gardening, politely decline to answer 
      and explain that you only provide plant-related advice.
      
      Keep responses informative but concise. Be friendly and helpful.
    `;
    
    // Send the message to ChatGPT with our instructions
    const response = await api.sendMessage(
      `${plantInstructions}\n\nUser question: ${message}`
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.text })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process message' })
    };
  }
};