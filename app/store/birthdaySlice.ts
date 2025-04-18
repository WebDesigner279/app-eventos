'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a interface para o estado relacionado ao aniversário
interface BirthdayState {
  birthDate: string | null; // Armazena a data de nascimento ou null se não definida
}

// Estado inicial do slice
const initialState: BirthdayState = {
  birthDate: null,
};

// Criação do slice do Redux para manipular o estado do aniversário
const birthdaySlice = createSlice({
  name: "birthday", // Nome do slice
  initialState,     // Estado inicial definido acima
  reducers: {
    // Define o reducer que atualiza a data de nascimento no estado
    setBirthDate: (state, action: PayloadAction<string>) => {
      state.birthDate = action.payload; // Atualiza o estado com a nova data
    },
  },
});

// Exporta a action para uso nos componentes
export const { setBirthDate } = birthdaySlice.actions;

// Exporta o reducer para ser incluído na store principal do Redux
export default birthdaySlice.reducer;
