import React, { useState, useEffect } from 'react';
import { getLogoPath } from '../utils/utils';
import { initialCardData } from '../initialCardData'; // Importe initialCardData para fallback

const LanguageCard = ({ languageKey, cardData }) => {
  const card = cardData[languageKey] || initialCardData['HTML']; // Fallback para HTML
  const [cardImage, setCardImage] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const generateImage = async (prompt) => {
      setLoadingImage(true);
      setImageError(false);
      try {
        const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
        const apiKey = ""; // API Key will be provided by Canvas runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Erro na resposta da API de imagem: ${response.status} - ${errorText}`);
          setImageError(true);
          setLoadingImage(false);
          return;
        }

        const result = await response.json();

        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
          setCardImage(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
        } else {
          console.error("Estrutura de resposta inesperada ou conteúdo de imagem ausente.");
          setImageError(true);
        }
      } catch (error) {
        console.error("Erro ao gerar imagem:", error);
        setImageError(true);
      } finally {
        setLoadingImage(false);
      }
    };

    if (card.prompt) {
      generateImage(card.prompt);
    } else {
      setCardImage('');
      setLoadingImage(false);
    }
  }, [languageKey, card.prompt]);

  return (
    <div className="card-container" style={{
        '--card-color': card.color,
        '--card-gradient': card.gradient,
        '--card-header-border-color': card.cardHeaderBorderColor,
        '--card-type-bg-color': card.typeBgColor,
        '--card-type-text-color': card.typeTextColor,
        '--card-stats-bg-color': card.statsBgColor,
        '--card-stats-border-color': card.statsBorderColor,
        '--card-stats-label-color': card.statsLabelColor,
        '--card-stats-value-color': card.statsValueColor,
    }}>
      <div className="card-header">
        <div className="flex items-center gap-x-1.5">
          <img className="language-logo-img" src={getLogoPath(card.name)} alt={`${card.name} Logo`} />
          <div className="card-name">{card.name}</div>
        </div>
        <div className="card-type">
          {card.type}
        </div>
      </div>
      <div className="card-image-wrapper">
        {loadingImage ? (
          <div className="text-gray-500 text-center">Carregando imagem...</div>
        ) : imageError ? (
          <div className="text-red-500 text-center">Erro ao carregar imagem.</div>
        ) : (
          <img className="card-image" src={cardImage} alt={`Ilustração da Linguagem ${card.name}`} />
        )}
      </div>
      <div className="card-description">
        {card.description}
      </div>
      <div className="card-stats">
        {Object.entries(card.stats).map(([label, value], index) => (
          <div key={label} className="stat-item">
            <span className="stat-label">{index > 0 ? '| ' : ''}{label}/</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="card-footer">
        Ilustração: Amaro AI
      </div>
    </div>
  );
};

export default LanguageCard;
