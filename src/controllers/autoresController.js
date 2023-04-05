import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
//Adicionando next para paginação
  static listarAutores = async (req, res, next) => {
    try {
      //refatorando para utilizar middleware de paginação. Igual em LivrosController
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
      //res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }    
  };

  static listarAutorPorId = ( async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresPorIDResultado = await autores.findById(id);

      if (autoresPorIDResultado !== null) {
        res.status(200).send(autoresPorIDResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não encontrado"));
      }

    } catch (erro) { 
      next(erro);
    }   
  });

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const cadastroAutoresResultado = await autor.save();

      res.status(201).send(cadastroAutoresResultado.toJSON());
    } catch (erro) {
      next(erro);
    }    
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }    
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if(autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };
    
}

export default AutorController;