import ErroBase from "./ErroBase.js";
//Classe para tratar os erros de Requisição incorreta/invalida
class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;