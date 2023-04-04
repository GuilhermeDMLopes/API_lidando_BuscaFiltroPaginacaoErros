//Classe que vai ter uma mensagem e status para padronizar as mensagens de erro para o Front-End
class ErroBase extends Error {
  //Toda vez que for instanciado, cria com uma mensagem de erro geral  
  constructor(mensagem = "Erro interno do servidor", status = 500) {
    super();
    this.message = mensagem;
    this.status = status;
  }

  //Metodo para enviar a resposta de erro
  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status
    });
  }
}

export default ErroBase;