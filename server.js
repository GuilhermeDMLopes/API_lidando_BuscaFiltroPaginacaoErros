import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

/*
Adicionando Middlewares do express para fazermos tratamento de erros

Em apps.js fizemos as alterações para o app utilizar o middleware.
Criamos a pasta de middlewares com o arquivo e sua respectiva função.

Middlewares  são funções que interceptam alguma ação/requisição que é feita na nossa API
Para registrar um middleware que é executado em todas as requisições para a API, 
independente da rota ou do método HTTP, utilizamos o método app.use.

Isso porque a ordem em que os middlewares são registrados na aplicação é importante. Como o middleware 
acima foi registrado antes dos métodos dos controladores, seu código será executado primeiro para qualquer requisição. 
E se um middleware enviar uma resposta para o cliente (nesse caso, com o método send), o fluxo da requisição encerra nessa resposta, 
e quaisquer middlewares registrados depois desse não serão executados. Afinal, apenas uma resposta pode ser enviada para cada requisição.

Então, como fazer os próximos middlewares registrados serem executados? Para isso, podemos receber a função next como terceiro parâmetro (“next” significa “próximo”, do inglês)

Agora, faremos a refatoração do código, criando um pacote chamado erros que trata cada erro em específico.
*/
