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

  *Reservar* também marca o livro reservado como *reservado*.

- **Devolver** <br>
  Devolve o livro, registrando o dia que foi feita tal devolução.
  
  O dia da devolução é registrado no *Emprestimo* e o Livro deixa de ser reservado.

- **Renovar** <br>
  Renova um *Emprestimo*, adicionando +7 dias à data de expiração.
  
## Especificação de classes
Existem 4 classes: *Pessoa*, *Membro*, *Livro* e *Emprestimo*.


### Pessoa
Pessoa é uma classe abstrata (só pode ser extendida).

Ela representa o dados pessoais de uma pessoa.
#### Campos
Existem 3 campos dentro de uma pessoa: _nome, _endereco e _telefone.

 - ##### _nome: string
   Campo protegido. Indica o nome da pessoa.
 - ##### _endereco: string
   Campo protegido. Indica o endereço da pessoa.
 - ##### _telefone: string
   Campo protegido. Indica o Telefone da pessoa.
   
#### Construtor
Para criar um Membro é necessário passar os determinados parâmetros:
  - nome: string
  - endereco: string
  - telefone: string

#### Métodos
Essa classe não possuí métodos.


### Membro
Extende a classe *Pessoa*, representando um membro de uma biblioteca.

#### Campos
A classe *Membro* extende os campos da classe *Pessoa*, adquirindo seus campos.

A classe *Membro* também possuí um campo próprio:
  - ##### _matricula: string
    Campo privado. A matrícula é o identificador único de um membro, é gerado por meio do método ```gerarMatricula()```

#### Construtor
Para criar um Membro é necessário passar os determinados parâmetros:
  - nome: string
  - endereco: string
  - telefone: string

#### Métodos
  - ##### gerarMatrícula()
    Retorna um identificador único por meio da função ```crypto.randomUUID()```
    - ###### Parâmetros
      Nenhum
    - ###### Retorno
      Retorna uma string

          
