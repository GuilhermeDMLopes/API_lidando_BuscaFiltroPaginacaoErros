import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

/*
Quando o Front-End faz uma requisição pedindo todos os livros. A medida que a quantidade dos mesmos forem aumentando,
esse processo se torna inviavel e custoso.
Podemos realizar essa amostragem por partes (de 10 em 10 por exemplo) para facilitar a visualização e o Front-End.
Esse processo chama-se Paginação (a cada 10 livros, seria uma página, por exemplo)

Agora faremos a ordenação dos resultados

Finalizando com o reaproveitamento de paginação em outras rotas.
Vamos criar um middleware para paginação
*/
