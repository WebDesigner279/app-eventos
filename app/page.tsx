'use client';

// Importa o formulário onde o usuário insere a data de nascimento
import BirthdayForm from "./components/BirthdayForm";

// Importa o componente responsável por calcular e exibir a contagem regressiva
import CountdownTimer from "./components/CountdownTimer";

// Componente principal da página inicial
export default function Home() {
  return (
    // Estrutura principal da página com classe para estilização
    <main className="container">
      {/* Título da aplicação */}
      <h1>Contagem para seu próximo Aniversário</h1>

      {/* Formulário para o usuário inserir sua data de nascimento */}
      <BirthdayForm />

      {/* Contador que exibe o tempo restante até o próximo aniversário */}
      <CountdownTimer />
    </main>
  );
}
