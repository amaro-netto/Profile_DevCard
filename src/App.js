import React, { useState, useEffect } from 'react';
import LanguageCard from './components/LanguageCard';
import MiniLanguageCard from './components/MiniLanguageCard';
import StatsBarChart from './components/StatsBarChart';
import GitHubChart from './components/GitHubChart';
import { generateLanguageCardData } from './api/api';
import { initialCardData } from './initialCardData';

// --- Main App Component ---
function App() {
  const [cardData, setCardData] = useState(initialCardData);
  const [username, setUsername] = useState('');
  const [topLanguage, setTopLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [showChart, setShowChart] = useState(false);
  const [top5Languages, setTop5Languages] = useState([]);
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [topLanguageStats, setTopLanguageStats] = useState(null);
  const [generatingNewCard, setGeneratingNewCard] = useState(false);

  // Função para buscar dados do GitHub e determinar a linguagem principal
  const getGitHubLanguages = async () => {
    setError('');
    setLoading(true);
    setTopLanguage(null);
    setShowCard(false);
    setChartData({ labels: [], data: [] });
    setShowChart(false);
    setTop5Languages([]);
    setOtherLanguages([]);
    setTopLanguageStats(null);
    setGeneratingNewCard(false);

    if (!username.trim()) {
      setError('Por favor, digite um nome de usuário do GitHub.');
      setLoading(false);
      return;
    }

    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100`);

      if (!reposResponse.ok) {
        if (reposResponse.status === 404) {
          throw new Error('Usuário não encontrado. Verifique o nome de usuário.');
        }
        if (reposResponse.status === 403 && reposResponse.headers.get('X-RateLimit-Remaining') === '0') {
          throw new Error('Limite de requisições da API do GitHub excedido. Tente novamente mais tarde.');
        }
        throw new Error(`Erro ao buscar repositórios: ${reposResponse.statusText}`);
      }

      const repos = await reposResponse.json();

      const languageCounts = {};
      let totalReposWithLanguage = 0;

      repos.forEach(repo => {
        const lang = repo.language;
        if (lang) {
          languageCounts[lang] = (languageCounts[lang] || 0) + 1;
          totalReposWithLanguage++;
        }
      });

      const languagePercentages = {};
      for (const lang in languageCounts) {
          if (languageCounts.hasOwnProperty(lang) && totalReposWithLanguage > 0) {
              languagePercentages[lang] = (languageCounts[lang] / totalReposWithLanguage) * 100;
          }
      }

      const sortedLanguages = Object.entries(languagePercentages)
          .sort(([,a], [,b]) => b - a);

      const MAX_RADAR_POINTS = 5;
      let finalLabels = [];
      let finalData = [];
      let calculatedTop5Languages = [];
      let calculatedOtherLanguages = [];
      let currentTopLanguage = null;
      let currentTopLanguageStats = null;

      if (sortedLanguages.length === 0) {
          setError('Nenhum repositório público com linguagem principal encontrada para este usuário. Exibindo card padrão (HTML) e gráfico com dados genéricos.');
          currentTopLanguage = 'HTML';
          currentTopLanguageStats = initialCardData['HTML'].stats;
          for (let i = 0; i < MAX_RADAR_POINTS; i++) {
              finalLabels.push(`Linguagem ${i + 1}`);
              finalData.push(0);
              calculatedTop5Languages.push({ name: `Placeholder-${i}`, percentage: 0 });
          }
      } else {
          const mostUsedLanguageName = sortedLanguages[0][0];
          let mappedLanguage = mostUsedLanguageName;

          if (!cardData[mappedLanguage]) {
            setGeneratingNewCard(true);
            console.log(`Linguagem '${mappedLanguage}' não encontrada. Gerando dados com Gemini...`);
            const newCardInfo = await generateLanguageCardData(mappedLanguage);

            if (newCardInfo) {
              setCardData(prevData => ({
                ...prevData,
                [mappedLanguage]: newCardInfo
              }));
              console.log(`Dados para '${mappedLanguage}' gerados e adicionados.`);
              currentTopLanguage = mappedLanguage;
              currentTopLanguageStats = newCardInfo.stats;
            } else {
              console.error(`Falha ao gerar dados para '${mappedLanguage}'. Usando HTML como fallback.`);
              setError(`Linguagem "${mappedLanguage}" encontrada, mas falha ao gerar card. Exibindo card padrão (HTML).`);
              currentTopLanguage = 'HTML';
              currentTopLanguageStats = initialCardData['HTML'].stats;
            }
            setGeneratingNewCard(false);
          } else {
            currentTopLanguage = mappedLanguage;
            currentTopLanguageStats = cardData[mappedLanguage].stats;
          }

          for (let i = 0; i < sortedLanguages.length && i < MAX_RADAR_POINTS; i++) {
              finalLabels.push(sortedLanguages[i][0]);
              finalData.push(sortedLanguages[i][1]);
              calculatedTop5Languages.push({ name: sortedLanguages[i][0], percentage: sortedLanguages[i][1] });
          }
          for (let i = MAX_RADAR_POINTS; i < sortedLanguages.length; i++) {
            calculatedOtherLanguages.push(sortedLanguages[i][0]);
          }
      }

      setTopLanguage(currentTopLanguage);
      setTopLanguageStats(currentTopLanguageStats);
      setChartData({ labels: finalLabels, data: finalData });
      setTop5Languages(calculatedTop5Languages);
      setOtherLanguages(calculatedOtherLanguages);
      setShowCard(true);
      setShowChart(true);

    } catch (err) {
      setError(`Erro: ${err.message}. Tente novamente.`);
      setTopLanguage(null);
      setShowCard(false);
      setChartData({ labels: [], data: [] });
      setShowChart(false);
      setTop5Languages([]);
      setOtherLanguages([]);
      setTopLanguageStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 font-inter">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Descobridor de Linguagens DevCard</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-md">
        <input
          type="text"
          id="github-username"
          className="p-3 border border-gray-300 rounded-lg w-full md:flex-1 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Digite seu nome de usuário do GitHub"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getGitHubLanguages();
            }
          }}
        />
        <button
          onClick={getGitHubLanguages}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          disabled={loading || generatingNewCard}
        >
          {loading ? 'Buscando...' : generatingNewCard ? 'Gerando Card...' : 'Gerar DevCard'}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center mb-4 p-3 bg-red-100 rounded-lg max-w-md w-full">
          {error}
        </p>
      )}

      <div className="content-display-area flex flex-col md:flex-row items-start justify-center w-full max-w-6xl">
        {/* Coluna 1: Language Card + Stats Bar Chart */}
        {(showCard && topLanguage) && (
          <div className="card-and-stats-column">
            <div className="card-column flex justify-center">
              <LanguageCard languageKey={topLanguage} cardData={cardData} />
            </div>
            {topLanguageStats && (
              <div className="bar-chart-column flex justify-center">
                <StatsBarChart stats={topLanguageStats} languageName={cardData[topLanguage]?.name || 'HTML'} />
              </div>
            )}
          </div>
        )}

        {/* Coluna 2: GitHub Radar Chart + Mini Cards */}
        {(showChart && chartData.labels.length > 0) && (
          <div className="charts-and-mini-cards-column">
            <div className="chart-column flex justify-center">
              <GitHubChart labels={chartData.labels} data={chartData.data} username={username} otherLanguages={otherLanguages} />
            </div>
            {top5Languages.length > 0 && (
              <div className="mini-cards-column flex justify-center flex-wrap">
                <div className="mini-cards-container flex justify-center flex-wrap">
                  {top5Languages.map((langData, index) => (
                    <MiniLanguageCard
                      key={langData.name}
                      languageKey={langData.name}
                      percentage={langData.percentage}
                      isMostUsed={index === 0}
                      cardData={cardData}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!showCard && !loading && !error && !generatingNewCard && (
        <p className="text-gray-600 text-center text-lg mt-4">
          Digite um nome de usuário do GitHub acima para gerar seu DevCard!
        </p>
      )}
       {generatingNewCard && (
        <p className="text-blue-600 text-center text-lg mt-4 animate-pulse">
          Gerando dados para uma nova linguagem com a Amaro AI...
        </p>
      )}
    </div>
  );
}

export default App;
