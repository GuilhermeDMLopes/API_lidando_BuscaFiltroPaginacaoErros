//Arquivo contendo as validações globais
import mongoose from "mongoose";

//Definindo uma propriedades para todos os campos do tipo string dos modelos
mongoose.Schema.Types.String.set("validate", {
  //Faz a validação se string é vazia, se for verdadeira, enviar mensagem de erro
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco`
});