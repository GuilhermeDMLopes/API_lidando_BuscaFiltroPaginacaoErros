//Middleware para realizar paginação nas requisições da API
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    //Realizando paginação
    //Qual o limite de livros que eu quero mostrar em uma pagina/requisição.
    //Passamos um campo para ser ordenado e se será crescente ou decrescente
    //campoOrdenacao = "_id" e ordem = -1, podem ser substituidos por ordenacao = "_id:-1"
    let { limite = 5, pagina = 1, ordenacao = "_id:-1"} = req.query;
    
    //Usando ordenação em uma variavel apenas
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    
    //Tratando erros de limite, pagina e ordem. Tem que ser inteiros.
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    //Pegando o resultado da busca de livrosController - listarLivros
    const resultado = req.resultado;
    
    if(limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
        //Ordenando por id de forma decrescente (os mais recentes)
        //.sort( {_id: -1} )
        //Ordenando por titulo
        //.sort( { titulo: 1 })
        .sort({ [campoOrdenacao]: ordem })
        //Se a pessoa solicitou a pagina 1, não vai pular nenhum livro. Se ela solicitou a pagina 2, vai pular 5 livros...
        .skip((pagina - 1) * limite)
        //limite de livros mostrados
        .limit(limite)
        //Removemos o .populate para paginar o modelo autor pois não existe campo autor.
        //.populate("autor")
        .exec();
      
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }        
  } catch (erro) {
    next(erro);
  }  
}

export default paginar;