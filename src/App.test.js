import { render, screen } from '@testing-library/react';
import App from './App';

test('exibe mensagem para digitar nome de usuário', () => {
  render(<App />);
  const message = screen.getByText(/Digite um nome de usuário do GitHub/i);
  expect(message).toBeInTheDocument();
});