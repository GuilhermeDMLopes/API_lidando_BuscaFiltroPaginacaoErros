import ErroBase from "./ErroBase.js";

//Classe para tratar o erro 404
class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Pagina não encontrada") {
    super(mensagem, 404);
  }
}

export default NaoEncontrado;