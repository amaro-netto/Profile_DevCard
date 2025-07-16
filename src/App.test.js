import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('exibe mensagem de erro quando campo está vazio e botão é clicado', () => {
  render(<App />);
  const button = screen.getByText(/buscar/i);
  fireEvent.click(button);
  const message = screen.getByText(/Por favor, digite um nome de usuário do GitHub/i);
  expect(message).toBeInTheDocument();
});