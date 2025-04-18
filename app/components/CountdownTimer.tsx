"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

// Função para calcular a próxima data de aniversário com base em uma data no formato "YYYY-MM-DD"
function getNextBirthday(birthDate: string): Date {
  const today = new Date();
  const [_, month, day] = birthDate.split("-").map(Number);

  // Cria uma data para o próximo aniversário
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  nextBirthday.setHours(0, 0, 0, 0); // Define como início do dia

  // Se a data já passou este ano, avança para o próximo ano
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  return nextBirthday;
}

export default function CountdownTimer() {
  // Obtém a data de aniversário do estado global
  const birthDate = useSelector((state: RootState) => state.birthday.birthDate);

  // Estado local para armazenar o tempo restante formatado
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Se não houver data de nascimento definida, sai do efeito
    if (!birthDate) return;

    // Calcula a próxima data de aniversário
    const targetDate = getNextBirthday(birthDate);

    // Função que calcula e atualiza o tempo restante
    const updateTimer = () => {
      const now = new Date();

      // Data de hoje à meia-noite
      const todayZero = new Date(now);
      todayZero.setHours(0, 0, 0, 0);

      // Diferença total em milissegundos até o próximo aniversário
      const fullDistance = targetDate.getTime() - now.getTime();

      // Diferença de dias completos
      const dayDistance = targetDate.getTime() - todayZero.getTime();
      const totalDays = Math.floor(dayDistance / (1000 * 60 * 60 * 24)) + 1;

      // Se o aniversário chegou ou passou, exibe mensagem
      if (fullDistance <= 0) {
        setTimeLeft("Feliz Aniversário!");
        return true; // Sinaliza que deve parar o intervalo
      }

      // Cálculo de horas, minutos e segundos restantes
      const hours = Math.floor((fullDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((fullDistance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((fullDistance % 1000 * 60) / 1000);

      // Atualiza o estado com o tempo formatado
      setTimeLeft(`${totalDays}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
      return false;
    };

    // Executa uma vez ao montar o componente
    const isExpired = updateTimer();
    
    // Inicia o intervalo apenas se ainda houver tempo restante
    const interval = !isExpired ? setInterval(() => {
      const shouldClear = updateTimer();
      if (shouldClear) {
        clearInterval(interval);
      }
    }, 1000) : null;

    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [birthDate]);

  // Se a data de aniversário ainda não foi definida, não renderiza nada
  if (!birthDate) return null;

  // Exibe o tempo restante
  return <div className="timer">Tempo restante: {timeLeft}</div>;
}
