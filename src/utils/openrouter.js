// src/utils/openrouter.js
import { OpenRouter } from "@openrouter/sdk";

// Initialize OpenRouter client
const openrouter = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY // Or hardcode for testing: "your_api_key_here"
});

/**
 * Generate exam questions using OpenRouter SDK
 * @param {Object} params - Parameters for question generation
 * @param {string[]} params.chapters - Selected chapters
 * @param {string[]} params.types - Selected question types
 * @param {string} params.subject - Subject name (e.g., 'Bengali 1st')
 * @param {Function} params.onProgress - Optional callback for streaming progress
 * @returns {Promise<Object>} - Generated questions
 */
export async function generateQuestions({ chapters, types, subject, onProgress }) {
  try {
    const prompt = `Generate exam questions for ${subject} based on the following:
Chapters: ${chapters.join(', ')}
Question Types: ${types.join(', ')}

Please create a comprehensive set of questions covering these topics in Bengali language where applicable.`;

    // Using streaming
    if (onProgress) {
      const stream = await openrouter.chat.send({
        model: "deepseek/deepseek-r1-0528", // You can change to other models
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        stream: true,
        max_tokens: 5000 // Reduced to fit within free tier limits
      });

      let fullContent = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullContent += content;
          onProgress(content, fullContent); // Send both chunk and accumulated content
        }
      }

      return {
        success: true,
        content: fullContent
      };
    } 
    // Non-streaming version
    else {
      const completion = await openrouter.chat.send({
        model: "deepseek/deepseek-r1-0528",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false,
        max_tokens: 5000 // Reduced to fit within free tier limits
      });

      return {
        success: true,
        content: completion.choices[0]?.message?.content || "",
        usage: completion.usage
      };
    }

  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Alternative models you can use:
 * - "anthropic/claude-3.5-sonnet" - Best for quality
 * - "openai/gpt-4-turbo" - Good balance
 * - "google/gemini-pro" - Fast and cheap
 * - "deepseek/deepseek-r1-0528" - Very affordable
 * - "meta-llama/llama-3.1-70b-instruct" - Open source option
 */