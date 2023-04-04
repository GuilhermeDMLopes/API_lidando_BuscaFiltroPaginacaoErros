import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

/*
Colocando arquivo .env e ESLint

.env é um arquivo para colocarmos dados sensíveis e que não devem ser compartilhados
npm install dotenv

ESlint ferramenta de auxilio que ajuda a manter um padrão de formatação e identificar bugs no JS
npm init @eslint/config

utlizamos setas para cima e para baixo para selecionar as configurações do eslint e também a tecla
espaço para selecionar e desmarcar as opções.
NO JSON do ESLint, alteramos o objeto rules, indent, de 4 para 2. É a quantidade de espaços para nossa
identação.

usamos o comando:
npx eslint ./src --fix
que executa nossas configurações na pasta ./src corrigindo o que não estiver no padrão do arquivo ESLint.

Instalando a extensão do ESLint no VSCODE, ele ira apresentar em tempo real, toda linha de código que não está no padrão do
arquivo ESLint.

Para que o ESLint seja executado toda vez que salvamos um arquivo. Vamos em:
ctrl + shift + p
escrevemos 'settings'.
Default User Settings (JSON).
adicionamos no final
  "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
  }
*/
