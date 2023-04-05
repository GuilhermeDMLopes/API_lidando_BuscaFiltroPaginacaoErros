import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

/*
Iremos refatorar o codigo implementando função para filtrar e buscar em livrosController.

Faremos um filtro pelo nome do altor na função processaBusca.
Como em Livro.js, a chave "autor" recebe um ID como valor, precisaremos fazer um trecho mais robusto.
*/
