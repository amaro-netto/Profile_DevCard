// --- Função para gerar dados de um novo card de linguagem usando a API Gemini ---
export const generateLanguageCardData = async (languageName) => {
  // A chave da API é lida de uma variável de ambiente.
  // No Netlify, configure REACT_APP_GEMINI_API_KEY.
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Chave da API do Gemini não configurada. Por favor, defina a variável de ambiente REACT_APP_GEMINI_API_KEY.");
    return null; // Retorna null ou lança um erro se a chave não estiver presente
  }

  const prompt = `Gere um objeto JSON para um 'DevCard' para a linguagem de programação/tecnologia '${languageName}'. O objeto deve seguir o formato abaixo, incluindo um 'prompt' para geração de imagem no estilo Pokémon de 1ª geração, com as cores e características da linguagem. Certifique-se de que o 'prompt' da imagem especifica um 'aspect ratio' levemente vertical retangular, próximo de 1:1 ou 4:5, e que o sujeito principal esteja bem enquadrado sem espaço vazio significativo.

  Exemplo de formato:
  {
    "name": "HTML",
    "type": "Foundation",
    "description": "O mestre da estrutura, capaz de erguer a base de qualquer mundo digital. Sua essência reside na organização e na capacidade de dar forma ao conteúdo.",
    "stats": { "PWR": 60, "VEL": 85, "FLX": 90, "COM": 95, "CRV": 80 },
    "color": "#f97316",
    "gradient": "linear-gradient(to right, #f97316, #fb923c)",
    "cardHeaderBorderColor": "#ea580c",
    "typeBgColor": "#fcd34d",
    "typeTextColor": "#8b5f00",
    "statsBgColor": "#ffedd5",
    "statsBorderColor": "#fed7aa",
    "statsLabelColor": "#334155",
    "statsValueColor": "#c2410c",
    "prompt": "a cartoony anime style illustration, 1st generation Pokemon style, featuring a skilled craftsman or architect animal (e.g., a beaver or badger) diligently constructing a digital landscape or a magnificent web page structure. The creature should be surrounded by floating, glowing HTML elements like <div>, <p>, <img>, emphasizing its role in building foundational web structures. The background should evoke a sense of an organized, foundational digital world, possibly with a blueprint overlay or a grid. The main subject should be clearly visible and well-framed within a **slightly vertical rectangular aspect ratio, close to 1:1 or 4:5**, ensuring it fills the frame without significant empty space at the top or bottom, and no parts are cut off at the edges. The overall aesthetic should be industrious, organized, and suitable for a fantasy card game, with warm, inviting colors and a sense of creation. High detail, sharp lines, epic feel."
  }
  `;

  let chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });
  const payload = {
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          "name": { "type": "STRING" },
          "type": { "type": "STRING" },
          "description": { "type": "STRING" },
          "stats": {
            "type": "OBJECT",
            "properties": {
              "PWR": { "type": "NUMBER" },
              "VEL": { "type": "NUMBER" },
              "FLX": { "type": "NUMBER" },
              "COM": { "type": "NUMBER" },
              "CRV": { "type": "NUMBER" }
            },
            "required": ["PWR", "VEL", "FLX", "COM", "CRV"]
          },
          "color": { "type": "STRING" },
          "gradient": { "type": "STRING" },
          "cardHeaderBorderColor": { "type": "STRING" },
          "typeBgColor": { "type": "STRING" },
          "typeTextColor": { "type": "STRING" },
          "statsBgColor": { "type": "STRING" },
          "statsBorderColor": { "type": "STRING" },
          "statsLabelColor": { "type": "STRING" },
          "statsValueColor": { "type": "STRING" },
          "prompt": { "type": "STRING" }
        },
        "required": [
          "name", "type", "description", "stats", "color", "gradient",
          "cardHeaderBorderColor", "typeBgColor", "typeTextColor",
          "statsBgColor", "statsBorderColor", "statsLabelColor",
          "statsValueColor", "prompt"
        ]
      }
    }
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro na resposta da API Gemini para gerar card: ${response.status} - ${errorText}`);
        return null;
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const jsonString = result.candidates[0].content.parts[0].text;
      const parsedJson = JSON.parse(jsonString);
      return parsedJson;
    } else {
      console.error('Erro ao gerar dados do card: Estrutura de resposta inesperada ou conteúdo ausente.', result);
      return null;
    }
  } catch (error) {
    console.error('Erro na chamada da API Gemini para gerar card:', error);
    return null;
  }
};
