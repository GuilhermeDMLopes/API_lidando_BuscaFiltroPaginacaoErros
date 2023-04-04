import NaoEncontrado from "../erros/NaoEncontrado.js";

//Middleware para tratar o erro 404.
function manipulador404(req, res, next) {
  //Testando se o middleware ta funcionando
  //res.status(404).send({mensagem: "Pagina não encontrada"});

  const erro404 = new NaoEncontrado();
  //enviando Erro para manipuladorDeErros. Enviamos a responsabilidade para aquele
  next(erro404);
}

export default manipulador404;