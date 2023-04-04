//import mongoose from "mongoose";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }    
  };

  //Adicionando metodo de controlador next para usarmos o middleware
  static listarAutorPorId = ( async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresPorIDResultado = await autores.findById(id);

      if (autoresPorIDResultado !== null) {
        res.status(200).send(autoresPorIDResultado);
      } else {
        //res.status(404).send({message: "Autor não encontrado"});
        //Substituindo pelo middleware para 404
        next(new NaoEncontrado("Id do Autor não encontrado"));
      }

    } catch (erro) {
      /*if(erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
      }
      res.status(500).send({message: "Erro interno de servidor"});
    } */
      //substituindo pelo middleware em app.js
      //Next encaminha o erro obtido no controlador e mandar para o middleware de tratamento de erros em app.js
      next(erro);
    }   
  });

  //Adicionando Middleware para as demais funções
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const cadastroAutoresResultado = await autor.save();

      res.status(201).send(cadastroAutoresResultado.toJSON());
    } catch (erro) {
      //res.status(500).send({message: `${erro.message} - falha ao cadastrar Autor.`});
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
      //res.status(500).send({message: `${erro.message}- falha ao atualizar`});
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
      //res.status(500).send({message: erro.message});
      next(erro);
    }
  };
    
}

export default AutorController;