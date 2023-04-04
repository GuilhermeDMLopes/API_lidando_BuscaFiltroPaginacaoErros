// eslint-disable-next-line no-unused-vars
//Comentario acima adicionado após apertarmos "ctrl + ." e selecionar essa opção para não ter linha vermelha embaixo de variaveis nao usadas
import mongoose from "mongoose";

//Middleware de erro tem 4 parametros. Intercepta qualquer erro identificado por nossa aplicação para não haver repetição nos controladores
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if(erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
  } else if (erro instanceof mongoose.Error.ValidationError) {
    //ELse if faz o tratamento das validações dos dados. Caso um campo obrigatório não seja preenchida, etc
    
    //Mostra os campos com erros
    //console.log(erro.errors);
    
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    

    res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagensErro}` });
  } else {
    res.status(500).send({message: "Erro interno de servidor"});    
  }  
}

export default manipuladorDeErros;