import React from 'react';
import { getLogoPath } from '../utils/utils';
import { initialCardData } from '../initialCardData';

const MiniLanguageCard = ({ languageKey, percentage, isMostUsed, cardData }) => {
  // Garante que cardData seja sempre um objeto, com fallback para initialCardData
  const currentCardData = cardData || initialCardData;
  const card = currentCardData[languageKey] || initialCardData['HTML']; // Fallback para HTML se a chave não existir
  const logoPath = getLogoPath(card.name);

  return (
    // A classe `mini-card-container` e `most-used-highlight` já são suas.
    // Garantimos que o CSS em index.css as defina.
    <div className={`mini-card-container ${isMostUsed ? 'most-used-highlight' : ''}`} style={{
      '--mini-card-color': card.color,
      '--mini-card-gradient': card.gradient,
      '--mini-card-header-border-color': card.cardHeaderBorderColor,
    }}>
      <div className="mini-card-header">
        <img className="mini-language-logo-img" src={logoPath} alt={`${card.name} Logo`} />
      </div>
      <div className="mini-card-name">{percentage.toFixed(2)} %</div>
    </div>
  );
};

export default MiniLanguageCard;