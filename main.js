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
        { role: "system", content: "You are a helpful doctors assistant. You are tasked with thinking of diagnoses for patients given a list of symptoms and history of conditions and tests." },
        { role: "system", content: "The text of your response should use html tags for formatting, as it will be embedded directly into a page." }
    ];

    messages.push({ role: 'user', content: "A patient has visited the doctor, with the following information for the current visit:" });
    if (prompts[0]) messages.push({ role: 'user', content: "Main reason for visit: " + prompts[0] });
    if (prompts[1]) messages.push({ role: 'user', content: "Description of symptoms: " + prompts[1] });
    if (prompts[2]) messages.push({ role: 'user', content: "Duration of symptoms: " + prompts[2] });
    if (prompts[3]) messages.push({ role: 'user', content: "Current treatments: " + prompts[3] });
    if (prompts[4]) messages.push({ role: 'user', content: "The following information is a history of conditions and tests: " + prompts[4] });
    /*
    for (const prompt of prompts) {
        messages.push({ role: 'user', content: prompt });
    }*/
    messages.push({ role: "user", content: "Given this information, please give the top 5 most likely diagnoses for the presenting problem this visit. When listing out the most likely causes, give the rationale for each. Also, list any recommendations for further investigation and analysis." });
    return messages;
}

window.sendToOpenAi = (prompts) => sendToOpenAi(prompts);


