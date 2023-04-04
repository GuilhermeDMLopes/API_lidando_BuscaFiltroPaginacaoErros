import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  /*static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });    
  };*/

  //Refatorando a função listarAutores utilizando async e await e tratamento de erros
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }    
  };

  static listarAutorPorId = ( async (req, res) => {
    try {
      const id = req.params.id;

      const autoresPorIDResultado = await autores.findById(id);

      //Caso o ID não seja de um usuario valido, a variavel autoresPorIDResultado, virá nula. Precisamos tratar este erro
      if (autoresPorIDResultado !== null) {
        res.status(200).send(autoresPorIDResultado);
      } else {
        res.status(404).send({message: "Autor não encontrado"});
      }

    } catch (erro) {
      //Se o ID não estiver no padrão correto
      if(erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
      }
      res.status(500).send({message: "Erro interno de servidor"});
    }    
  });

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);

      const cadastroAutoresResultado = await autor.save();

      res.status(201).send(cadastroAutoresResultado.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar Autor.`});
    }    
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: `${erro.message}- falha ao atualizar`});
    }    
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);

      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
    
}

export default AutorController;