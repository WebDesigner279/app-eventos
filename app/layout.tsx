'use client';

import "./styles/globals.scss"; // Importa o arquivo global de estilos SCSS
import { Provider } from "react-redux"; // Importa o Provider do Redux
import { store } from "./store"; // Importa a store configurada do Redux

// Componente RootLayout que recebe os componentes filhos como prop
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR"> {/* Define o idioma do HTML para português do Brasil */}
      <body>
        {/* Provider do Redux encapsula todos os componentes filhos */}
        <Provider store={store}>
          <div className="main-wrapper"> {/* Container principal da aplicação */}

            {/* Cabeçalho da página com título e subtítulo centralizados */}
            <div className="page-title">
              <h1>Seu Aniversário</h1>
              <h2>É mais que especial!</h2>
            </div>

            {/* Renderiza os componentes filhos abaixo do cabeçalho */}
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
