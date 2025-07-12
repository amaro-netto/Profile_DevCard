import React from 'react';
import { getLogoPath } from '../utils/utils';
import { initialCardData } from '../initialCardData'; // Importe initialCardData para fallback

const MiniLanguageCard = ({ languageKey, percentage, isMostUsed, cardData }) => {
  const card = cardData[languageKey] || initialCardData['HTML']; // Fallback para HTML
  const logoPath = getLogoPath(card.name);

  return (
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
