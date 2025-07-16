import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      setError('Por favor, digite um nome de usuário do GitHub.');
      return;
    }
    setError('');
    // chamada da API
  };

  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleSubmit}>Buscar</button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}

export default App;