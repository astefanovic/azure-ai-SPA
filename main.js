const { AzureOpenAI } = require("openai");


//const endpoint = "<endpoint>";
//const apiKey = "<api key>";
const apiVersion = "2023-03-15-preview";
const deployment = "gpt-4o";

async function sendToOpenAi(prompts) {
    console.log("== Get completions Sample ==");
    const messages = buildMessages(prompts);

    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
    const result = await client.chat.completions.create({
        messages,
        model: "",
      });
    
      let resultString = "";
      for (const choice of result.choices) {
        resultString += choice.message.content;
        console.log(choice.message);
      }
      return resultString;
}

function buildMessages(prompts) {
    const messages = [
        { role: "system", content: "You are a helpful doctors assistant. You are tasked with thinking of diagnoses for patients given a list of symptoms and history of conditions and tests." }
    ];
    for (const prompt of prompts) {
        messages.push({ role: 'user', content: prompt });
    }
    messages.push({ role: "user", content: "Please give the top 5 most likely diagnoses for this presenting problem." });
    messages.push({ role: "user", content: "The text of your response should use html tags for formatting." });
    return messages;
}

window.sendToOpenAi = (prompts) => sendToOpenAi(prompts);


