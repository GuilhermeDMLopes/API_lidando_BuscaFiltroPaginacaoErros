# API_lidando_BuscaFiltroPaginacaoErros

## Continuação e aprimoramento do Projeto no repositório "apiREST_Express_Node_Mongo"

## Branches:

- apiResiliente: adicionando arquivo .env para conexão com o banco. Utilizamos o ESlint ferramenta de auxilio que ajuda a manter um padrão de formatação e identificar bugs no JS. Fizemos também um tratamento de erros nas requisições e demais comentarios e comandos em server.js

- avancandoTratamentosErros: Criação de Middlewares e refatoração de código para tratar os erros de requisição da API, validação, etc. Criamos o pacote erros que trata os erros de forma separada, facilitando para o front-end.

- validandoDados: Refatoração dos arquivos em Models para validarmos de forma personalizada e global.

- avancandoBuscasFiltros: Implementação de buscas e filtros por editora, titulo, numero de paginas, filtros por minim e máximo de paginas e busca por nome do autor.

- implementandoPaginacao: Arquivos contendo paginação nos filtros e a criação de um novo middleware de paginação para rotas específicas