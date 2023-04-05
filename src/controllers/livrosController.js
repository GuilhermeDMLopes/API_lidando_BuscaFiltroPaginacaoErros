import NaoEncontrado from "../erros/NaoEncontrado.js";
//import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {
 
  static listarLivros = async (req, res, next) => {
    try {
      /*SUBSTITUINDO POR MIDDLEWARE
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

      if(limite > 0 && pagina > 0) {
        const livrosResultado = await livros.find()
          //Ordenando por id de forma decrescente (os mais recentes)
          //.sort( {_id: -1} )
          //Ordenando por titulo
          //.sort( { titulo: 1 })
          .sort({ [campoOrdenacao]: ordem })
          //Se a pessoa solicitou a pagina 1, não vai pular nenhum livro. Se ela solicitou a pagina 2, vai pular 5 livros...
          .skip((pagina - 1) * limite)
          //limite de livros mostrados
          .limit(limite)
          .populate("autor")
          .exec();
  
        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta());
      }*/

      const buscaLivros = livros.find();

      //Passando o resultado da busca para o middleware
      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      //Alteração feita depois de colocar o autopopulate
      const livroResultados = await livros
        .findById(id, {}, {autopopulate: false})
        .populate("autor", "nome")
        .exec();

      if(livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});
    
      if(livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {      
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        //refatorando para implementar paginação (remover await)
        const livrosResultado = livros
          .find(busca);
          //Depois de fazer o autopopulate em Livro.js podemos remover
          //.populate("autor");

        //resultado do middleware de paginação
        req.resultado = livrosResultado;

        //Executando middleware de paginação
        next();
  
        //res.status(200).send(livrosResultado);        
      } else {
        res.status(200).send([]);
      }      
    } catch (erro) {
      next(erro);
    }
    
    async function processaBusca (parametros) {
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
      
      let busca = {};

      if(editora) busca.editora = editora;

      if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

      if(minPaginas) busca.numeroPaginas = { $gte: minPaginas };
      if(maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

      if(nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor});

        if(autor !== null) {
          const autorId = autor._id;
  
          busca.autor = autorId;
        } else {
          busca = null;
        }
      }

      return busca;
    }
  };
    
}

export default LivroController;