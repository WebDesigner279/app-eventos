"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

// Função que retorna o próximo aniversário a partir de uma data no formato "YYYY-MM-DD"
function getNextBirthday(birthDate: string): Date {
  const today = new Date(); // Data atual
  const [_, month, day] = birthDate.split("-").map(Number); // Extrai mês e dia da string

  // Cria um objeto Date para o próximo aniversário
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  nextBirthday.setHours(0, 0, 0, 0); // Zera hora, minuto, segundo e milissegundo

  // Se a data já passou este ano, define para o ano seguinte
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  return nextBirthday;
}

export default function CountdownTimer() {
  // Obtém a data de aniversário armazenada no Redux
  const birthDate = useSelector((state: RootState) => state.birthday.birthDate);

  // Estado local para armazenar o tempo restante formatado
  const [timeLeft, setTimeLeft] = useState("");

  // useEffect será executado sempre que a `birthDate` mudar
  useEffect(() => {
    if (!birthDate) return; // Se não tiver data, não faz nada

    const targetDate = getNextBirthday(birthDate); // Próxima data de aniversário

    // Função para atualizar o contador a cada segundo
    const updateTimer = () => {
      const now = new Date(); // Data atual

      // Data de hoje à meia-noite (usada para calcular os "dias restantes")
      const todayZero = new Date(now);
      todayZero.setHours(0, 0, 0, 0);

      const fullDistance = targetDate.getTime() - now.getTime(); // Tempo total restante (ms)
      const dayDistance = targetDate.getTime() - todayZero.getTime(); // Diferença em dias (ms)

      const totalDays = Math.floor(dayDistance / (1000 * 60 * 60 * 24)); // Dias restantes

      // Se o tempo acabou, mostra a mensagem de aniversário
      if (fullDistance <= 0) {
        setTimeLeft("Feliz Aniversário!");
        return true; // Retorna true para indicar que deve parar o setInterval
      }

      // Cálculos do tempo restante
      const hours = Math.floor((fullDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((fullDistance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((fullDistance % (1000 * 60)) / 1000);

      // Atualiza o estado com a string formatada
      setTimeLeft(
        `${totalDays}d ${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );

      return false; // Continua o setInterval
    };

    const isExpired = updateTimer(); // Executa a função imediatamente uma vez

    // Se ainda tiver tempo, inicia o intervalo a cada segundo
    const interval = !isExpired
      ? setInterval(() => {
          const shouldClear = updateTimer();
          if (shouldClear) clearInterval(interval); // Limpa o intervalo se o tempo acabar
        }, 1000)
      : null;

    // Cleanup: remove o intervalo quando o componente for desmontado
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [birthDate]);

  // Se a data ainda não foi definida, não renderiza nada
  if (!birthDate) return null;

  // Renderiza o contador
  return <div className="timer">Tempo restante: {timeLeft}</div>;
}
