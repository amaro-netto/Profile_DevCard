import React, { useEffect, useState } from 'react';

function LanguageCard({ prompt }) {
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    if (!prompt) {
      setCardImage('/img/placeholder.png');
      return;
    }

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('REACT_APP_GEMINI_API_KEY não está definida');
      return;
    }

    // chamada da API
  }, [prompt]);

  return <img src={cardImage} alt="Imagem gerada" />;
}

export default LanguageCard;