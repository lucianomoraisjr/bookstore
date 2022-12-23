DESAFIO TÉCNICO - BACKEND
# Cumprimento requisitos funcionais
 - Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
  - Rota: Post baseUr/api/add
  - Parametros :  { sbn: string, name: string, description: string, author: string, stock: number }  Json
 - Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
  -  Rota: Get baseUr/list/:page
 - Como usuário gostaria de ver todos os detalhes de um livro específico;
  -  Rota: Get baseUr/serch/:name
 - Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
  -  Rota: Put baseUr/update
  - Parametros : { sbn: string(que será alterado) , name?: string, description?: string, author?: string, stock?: number } Json
 - Como usuário gostaria de excluir um livro;
   -  Rota: Delete baseUr/delete
   - Parametros: {sbn: string} Json

