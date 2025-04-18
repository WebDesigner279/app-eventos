"use client";

import { useDispatch } from "react-redux";
import { setBirthDate } from "../store/birthdaySlice";
import { useState } from "react";
import "../styles/globals.scss"; // Importa os estilos globais SCSS

export default function BirthdayForm() {
  // Estado local para armazenar a data inserida pelo usuário
  const [date, setDate] = useState("");

  // Estado que indica se a contagem já foi iniciada
  const [hasStarted, setHasStarted] = useState(false);

  // Hook do Redux para disparar ações
  const dispatch = useDispatch();

  // Função de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Se a contagem já estiver iniciada, limpa a data e redefine o estado
    if (hasStarted) {
      setDate(""); // Limpa o campo de data
      dispatch(setBirthDate("")); // Limpa o estado global do Redux
      setHasStarted(false); // Reinicia o controle da contagem
      return;
    }

    // Se o usuário forneceu uma data válida, inicia a contagem
    if (date) {
      dispatch(setBirthDate(date)); // Armazena a data no Redux
      setHasStarted(true); // Atualiza o estado para indicar início
    }
  };

  return (
    <form onSubmit={handleSubmit} className="birthday-form">
      {/* Campo para o usuário digitar sua data de nascimento */}
      <label>Digite sua data de nascimento:</label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={hasStarted} // Desabilita o input após iniciar a contagem
      />

      <br />

      {/* Botão dinâmico que muda de texto conforme o estado da contagem */}
      <button type="submit">
        {hasStarted ? "Iniciar nova contagem" : "Iniciar contagem"}
      </button>

      {/* Mensagem de feedback que aparece quando a contagem é iniciada */}
      <div className={`feedback ${hasStarted ? "show" : ""}`}>
        🎉 Contagem iniciada!
      </div>
    </form>
  );
}
