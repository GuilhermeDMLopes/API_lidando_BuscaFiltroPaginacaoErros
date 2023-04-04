import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de Node"});
  });

  //Neste arquivo também estamos utilizando middlewares
  app.use(
    //Middleware que transforma dados da requisição em JSON
    express.json(),
    livros,
    autores
  );
};

export default routes;