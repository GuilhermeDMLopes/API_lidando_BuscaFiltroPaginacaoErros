import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";
//Adicionando middleware de tratamento de erros conforme autoresController.js

class LivroController {
 
  static listarLivros = async (req, res, next) => {
    try {
      //Forçando um erro para testar ErroBase.js em manipuladorDeErros
      //throw new Error();
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      //res.status(500).json({ message: "Erro interno no servidor" });
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
      //res.status(400).send({message: `${erro.message} - Id do livro não localizado.`});
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      //res.status(500).send({message: `${erro.message} - falha ao cadastrar livro.`});
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
      //res.status(500).send({message: erro.message});
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
      //res.status(500).send({message: erro.message});
      next(erro);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      
      const livrosResultado = await livros.find({"editora": editora});

      res.status(200).send(livrosResultado);
    } catch (erro) {
      //res.status(500).json({ message: "Erro interno no servidor" });
      next(erro);
    }  
  };
    
}

export default LivroController;