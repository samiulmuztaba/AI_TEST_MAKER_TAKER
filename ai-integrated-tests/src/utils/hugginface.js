import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);
async function messageAI(text){
  const chatCompletion = await client.chatCompletion({
      model: "google/gemma-3-27b-it",
      messages: [
          {
              role: "user",
              content: [
                  {
                      type: "text",
                      text: text,
                  },
              ],
          },
      ],
    }
  );
  return chatCompletion.choices[0].message

}

export default messageAI
console.log(chatCompletion.choices[0].message);