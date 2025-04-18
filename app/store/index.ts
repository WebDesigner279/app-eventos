"use client";

// Importa a função para configurar a store do Redux
import { configureStore } from "@reduxjs/toolkit";
// Importa o reducer responsável por lidar com o estado de data de aniversário
import birthdayReducer from "./birthdaySlice";

// Criação da store Redux com o reducer 'birthday'
export const store = configureStore({
  reducer: {
    birthday: birthdayReducer, // Estado gerenciado pelo slice 'birthday'
  },
});

// Tipo que representa toda a estrutura do estado da store Redux
export type RootState = ReturnType<typeof store.getState>;

// Tipo utilizado para tipar corretamente o dispatch do Redux
export type AppDispatch = typeof store.dispatch;
