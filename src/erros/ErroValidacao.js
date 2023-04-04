import RequisicaoIncorreta from "./RequisicaoIncorreta.js";
//Classe para tratar os erros de validação de campoos obrigatórios.
//EStamos extendendo de RequisiçãoINcorreta pois ambos tem o mesmo status (400)
class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErroValidacao;