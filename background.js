chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translate") {
    handleTranslation(request).then(sendResponse);
    return true;
  }
});

async function handleTranslation(request) {
  const data = await chrome.storage.local.get([
    "apiKey_openrouter",
    "apiKey_openai",
    "apiKey_claude",
    "apiKey_gemini",
    "apiKey_deepseek",
    "openrouter_model",
    "chosen_backend"
  ]);

  const backend = data.chosen_backend || "openrouter";
  const text = request.text;
  const targetLang = request.targetLang;
  
  try {
    let result = "";
    
    if (backend === "openrouter") {
      result = await callOpenRouter(data.apiKey_openrouter, data.openrouter_model, text, targetLang);
    } else if (backend === "openai") {
      result = await callOpenAI(data.apiKey_openai, "gpt-3.5-turbo", text, targetLang);
    } else if (backend === "claude") {
      result = await callClaude(data.apiKey_claude, "claude-3-haiku-20240307", text, targetLang);
    } else if (backend === "gemini") {
      result = await callGemini(data.apiKey_gemini, "gemini-pro", text, targetLang);
    } else if (backend === "deepseek") {
      result = await callDeepSeek(data.apiKey_deepseek, "deepseek-chat", text, targetLang);
    } else {
      return { error: "No backend selected" };
    }
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function callOpenRouter(key, model, text, lang) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model || "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: `Translate to ${lang}: ${text}` }],
      temperature: 0.0,
      max_tokens: 512
    })
  });
  const json = await response.json();
  return json.choices[0].message.content;
}

async function callOpenAI(key, model, text, lang) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: `Translate to ${lang}: ${text}` }],
      temperature: 0.0,
      max_tokens: 512
    })
  });
  const json = await response.json();
  return json.choices[0].message.content;
}

async function callClaude(key, model, text, lang) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: `Translate to ${lang}: ${text}` }],
      temperature: 0.0,
      max_tokens: 512
    })
  });
  const json = await response.json();
  return json.content[0].text;
}

async function callGemini(key, model, text, lang) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `Translate to ${lang}: ${text}` }] }],
      generationConfig: {
        temperature: 0.0,
        maxOutputTokens: 512
      }
    })
  });
  const json = await response.json();
  return json.candidates[0].content.parts[0].text;
}

async function callDeepSeek(key, model, text, lang) {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: `Translate to ${lang}: ${text}` }],
      temperature: 0.0,
      max_tokens: 512
    })
  });
  const json = await response.json();
  return json.choices[0].message.content;
}
