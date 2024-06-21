# Gerenciador-de-Biblioteca
> O gerenciador de  bliblioteca é um sistema CLI feito em typescript utilizando-se da metodologia de programação orientada a objetos.

Nele um administrador pode *registrar um membro*, *registrar um livro* ou *reservar um livro* para um membro.

## Funcionalidades
- **Registrar Membro** <br>
  Registra um membro ao sistema. Um membro precisa providênciar:
  - Nome
  - Endereço
  - Telefone

  Uma matrícula é gerada automaticamente para o membro.

- **Registrar Livro** <br>
  Registra um livro no sistema. Um livro necessita dê:
  - Titulo
  - Autor
  - ISBN (Código do livro)
  - Ano de Publicação

- **Reservar** <br>
  Reserva um determinado livro. Isso gera um *Emprestimo* com os campos:
  - Data do Emprestimo (O dia que o empréstimo foi feito)
  - Data da Expiração (O dia limite onde a devolução precisa ser feita, 7 dias após a reserva)
  - Data da Devolução (Registra o dia que o livro foi devolvido (se ele já foi devolvido) )
  - ISBN do livro (identifica qual livro foi reservado)
  - Matricula do membro (registrar qual membro reservou o livro)

  *Reservar* também marca o livro reservado como *reservado*

- **Devolver** <br>
  Devolve o livro, registrando o dia que foi feita tal devolução.
  
  O dia da devolução é registrado no *Emprestimo* e o Livro deixa de ser reservado.

- **Renovar** <br>
  Renova um *Emprestimo*, adicionando +7 dias à data de expiração.
  
