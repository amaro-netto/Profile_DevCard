import React, { useState } from 'react';

// O index.css será o arquivo principal de estilos agora
// import './App.css'; // REMOVA OU COMENTE esta linha se ela existir

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Por favor, digite um nome de usuário do GitHub.');
      return;
    }
    setError('');
    // TODO: Adicione a chamada da API aqui
  };

  return (
    // Adicionamos uma classe 'app-container' para estilização geral
    <div className="app-container">
      <h1>GitHub Profile Analyzer</h1> {/* Adicionado um título para o app */}
      <div className="input-section"> {/* Novo div para organizar input e botão */}
        <input
          type="text" // Boa prática especificar o tipo
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite o usuário do GitHub" // Ajuda o usuário
        />
        <button onClick={handleSubmit}>Buscar</button>
      </div>
      {/* Classe 'error-message' customizada no lugar das classes Tailwind */}
      {error && <p className="error-message">{error}</p>}
      {/* Aqui é onde seus outros componentes seriam renderizados após a busca */}
      {/* Exemplo: <GitHubChart data={someData} /> */}
      {/* Exemplo: <MiniLanguageCard languageKey="Python" percentage={15.2} isMostUsed={false} cardData={initialCardData} /> */}
    </div>
  );
}

export default App;