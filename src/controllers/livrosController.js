import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
 
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
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

  //Alterando para buscar por filtros
  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      /*TODO ESSE TRECHO FOI PASSADO PARA FUNÇÃO processaBusca
      //Fazer busca tanto por editora, titulo, minPaginas e maxPaginas
      //const { editora, titulo, minPaginas, maxPaginas } = req.query;
      
      //Pegando regex do parametro
      //const regex = new RegExp(titulo, "i");

      //Deixando a busca mais dinamica, podendo ser filtrado por um ou outro
      //const busca = await processaBusca(req.query);

      //Se houver editora, ele busca pela editora passada no parametro
      //if(editora) busca.editora = editora;

      //Se houver titulo, busca pelo titulo passado como parametro
      //if(titulo) busca.titulo = titulo;
      //Utilizando REGEX (pega todos que contiverem node no nome). o 'i' é para buscar por maiusculo ou minusculo
      //if(titulo) busca.titulo = /node/i;
      //Utilizando regex que vem por parametro
      //if(titulo) busca.titulo = regex;
      //Outra forma de utilizar regex é por operadores do MongoDB
      //if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

      //if(minPaginas) busca.numeroPaginas = { $gte: minPaginas };
      //if(maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };*/
      /*//Busca de forma estatica, obrigatoriamente tem que ter os 2
      const livrosResultado = await livros.find({
        //Busca no campo editora e titulo um valor de editora e titulo
        editora: editora,
        titulo: titulo
      });*/
      
      //Utilizando a função processaBusca
      const busca = await processaBusca(req.query);

      //Tratamento de erro na busca
      if(busca !== null) {
        //Busca de forma dinamica abaixo
        //O .populate mostra os dados do autor ao invés de apenas o ID dele
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");
  
        res.status(200).send(livrosResultado);        
      } else {
        //Retorna uma lista vazia pois ele não encontrou nenhum dado
        res.status(200).send([]);
      }      
    } catch (erro) {
      next(erro);
    }
    
    async function processaBusca (parametros) {
      //Fazer busca tanto por editora, titulo, minPaginas, maxPaginas e nomeAutor
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
      
      let busca = {};

      if(editora) busca.editora = editora;

      if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

      if(minPaginas) busca.numeroPaginas = { $gte: minPaginas };
      if(maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

      if(nomeAutor) {
        //Buscar pelo autor na coleção de autores pelo nome dele
        const autor = await autores.findOne({ nome: nomeAutor});

        //Fazendo tratamento de erro para busca pelo nome do autor
        if(autor !== null) {
          //Pegar o ID do autor que filtramos por parametro
          const autorId = autor._id;
  
          //passa o ID do autor
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