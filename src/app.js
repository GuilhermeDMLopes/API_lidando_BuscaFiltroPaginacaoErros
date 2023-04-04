import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

routes(app);

//Criando middleware para tratar o erro 404
app.use(manipulador404);

//adicionando middleware. Sera executada em toda (ou algumas) requisição que é feita pela API
//Middleware de erro tem 4 parametros. Intercepta qualquer erro identificado por nossa aplicação para não haver repetição nos controladores
app.use(manipuladorDeErros);

export default app;