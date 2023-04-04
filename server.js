import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

/*
validando dados de forma personalizada em Livro.js

Faremos a validação global (nenhuma string vazia por ex:).
Para isso, criaremos um arquivo index.js e validadorGlobal.js em Models para fazer a validação global
*/
