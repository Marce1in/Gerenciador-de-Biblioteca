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
  Devolve o livro, registrando o dia que foi feita tal devolução e marcando o *Emprestimo* como encerrado.
  
  O dia da devolução é registrado no *Emprestimo* e o Livro deixa de ser reservado.

- **Renovar** <br>
  Renova um *Emprestimo*, adicionando +7 dias à data de expiração.
  
## Especificação de classes
Existem 4 classes: `Pessoa`, `Membro`, `Livro` e `Emprestimo`.


### Pessoa
`Pessoa` é uma classe abstrata (só pode ser extendida).

Ela representa o dados pessoais de uma pessoa.
#### Campos
Existem 3 campos dentro de uma `Pessoa`: _nome, _endereco e _telefone.

 - ##### _nome: string
   Campo protegido: Indica o nome da pessoa.
 - ##### _endereco: string
   Campo protegido: Indica o endereço da pessoa.
 - ##### _telefone: string
   Campo protegido: Indica o Telefone da pessoa.
   
#### Construtor
Para criar uma `Pessoa` é necessário passar os determinados parâmetros:
  - nome: string
  - endereco: string
  - telefone: string

#### Métodos
Esta classe não possuí métodos.


### Membro
Extende a classe `Pessoa`, representando um membro de uma biblioteca.

#### Campos
A classe `Membro` extende os campos da classe *Pessoa*, adquirindo seus campos.

A classe `Membro` também possuí um campo próprio:
  - ##### _matricula: string
    Campo privado: A matrícula é o identificador único de um membro, é gerado por meio do método ```gerarMatricula()```

#### Construtor
Para criar um `Membro` é necessário passar os determinados parâmetros:
  - nome: string
  - endereco: string
  - telefone: string

#### Métodos
  - ##### gerarMatrícula()
    Método privado: Retorna um identificador único por meio da função ```crypto.randomUUID()```.
    - ###### Parâmetros
      Nenhum.
    - ###### Retorno
      Retorna uma string uuid.

### Livro
Representa um livro dentro de uma biblioteca.

#### Campos
Existem 5 campos dentro de um `Livro`: _titulo, _autor, _ISBN, _anoPublicacao e _reservado
  - ##### _titulo: string
    Campo privado: O nome do livro.
  - ##### _autor: string
    Campo privado: O nome do autor do livro.
  - ##### _ISBN: string
    Campo privado: O código usado para identificar o livro.
  - ##### _anoPublicacao: string
    Campo privado: O ano que o livro foi publicado.
  - ##### _reservado: boolean
    Campo privado: Indica se o livro foi reservado ou não, é sempre iniciado como `false`.

#### Construtor
Para criar um `Livro` é preciso passar os determinados parâmetros:
  - titulo: string
  - autor: string
  - ISBN: string
  - anoPublicacao: string

#### Métodos
  - ##### reservar()
    Método público: Gera um `Emprestimo` e marca o livro como reservado.
    - ###### Parâmetros
      - matriculaMembro: string = A matrícula de um `Membro`
    - ###### Retorno
      Retorna o `Emprestimo` gerado.

### Emprestimo 
Representa um empréstimo feito entre um membro da biblioteca e um livro.

#### Campos
Existem 6 campos dentro de um `Emprestimo`: _dataEmprestimo, _dataExpiracao, _dataDevolucao, _ISBNLivro, _matriculaMembro, _encerrado
  - ##### _dataEmprestimo: Date
    Campo privado: Indica a data que o empréstimo foi feito, é sempre a data atual do sistema no dia que `Emprestimo` foi criado.
  - ##### _dataExpiracao: Date
    Campo privado: Indica a data máxima que o empréstimo pode ser encerrado, inicia-se como `_dataEmprestimo` + 7 dias.
  - ##### _dataDevolucao: Date
    Campo privado: Indica a data que o livro foi devolvido, inicia-se como `null`.
  - ##### _ISBNLivro: string
    Campo privado: O ISBN do `Livro` que foi reservado.
  - ##### _matriculaMembro: string
    Campo privado: A matrículo do `Membro`.
  - ##### _encerrado: string
    Campo privado: indica se o `Emprestimo` foi encerrado ou não, ou seja, se o `Livro` foi devolvido. Inicia-se como `false`
    
#### Construtor
Para criar um `Emprestimo` é preciso passar os determinados parâmetros:
  - ISBNLivro: string
  - matriculaMembro: string

#### Métodos
  - ##### atrasarData()
    Método privado: Atrasa uma data em *n* dias. Esse método recebe uma data e um número, o número representa quantos dias a data vai ser atrasada, não podendo ser            negativo e nem zero.
    - ###### Parâmetros
      - data: date = A data que vai ser atrasada
      - dias: number = Quantos dias vão ser adicionados a `data`
    - ###### Retorno
      - Retorna o valor da `data` + `dias
        
  - ##### devolver()
    Método público: Devolve um livro e encerra o empréstimo. Esse método recebe um `Livro` e verifica se o `ISBN` do tal é o mesmo que o seu, se for, desmarca o livro         como reservado, declara a data de devolução e marca o empréstimo como encerrado.
    - ###### Parâmetros
      - livro: Livro = O livro que gerou o empréstimo
    - ###### Retorno
      Nada.
  - ##### renovar()
    Método público: Renova o empréstimo para +7 dias. Atualiza a `_dataExpiracao` 
      - ###### Parâmetros
        Nenhum.
      - ###### Retorno
        Nada.

## Interface do Sistema
O sistema é gerenciado por uma interface puramente CLI
### Tela Principal
```
=========================
Gerenciador de biblioteca
-------------------------
1. Livros
2. Membros
3. Listar Empréstimos
4. Reservar
5. Devolver
6. Renovar
7. Salvar
8. Sair
=========================
```
### 1. Livros
Tela Inicial:
```
=========================
Gerenciador de biblioteca
-------------------------
1. Adicionar Livro
2. Listar Livros
=========================
```
1. Adicionar Livro
```
================================
Digite o Titulo: Dom casmurro
Digite o Autor: Machado de Assis
Digite o Ano de Publicação: 1899
================================
```

```
===========================
Livro criado com sucesso :)
===========================
```
2. Listar Livros
```
"{Reservado}! {ISBN} {Titulo}: {Autor}, {Ano de Publicação}"
====================================================================================
1. Disponível! 978-3-16-148410-0 Dom casmurro: Machado de Assis, 1899
2. Reservado! 756-7-61-988211-0 O Vendedor de Sonhos: O Chamado: Augusto Curry, 2008
3. Reservado! 821-4-18-142459-0 O Alquimista: Paulo Coelho, 1988
====================================================================================
```
### 2. Membros
Tela Inicial:
```
=========================
Gerenciador de biblioteca
-------------------------
1. Cadastrar Membro
2. Listar Membros
=========================
```
1. Cadastrar Membro
```
============================
1. Nome: Yudi Tamashiro
2. Endereço: Alphaville 1410
3. Telefone: 4002-8922
============================
```
2. Listar Membros

```
"{Matricula}: {Nome}, {Endereço}, {Número}"
=========================================================
1. 1420459697: Yudi Tamashiro, Alphaville 1410, 4002-8922
=========================================================
```

### 3. Listar Empréstimos
```
"{status}! Feito em: {Data do Empréstimo}. {status} em: {Data da Devolução ou Data da Expiração}. Feito por: {Nome de quem reservou}. Livro {Nome do livro}"
============================================================================================================================================================
1. Aberto! Feito em: 14/10/2024. Expira em: 21/10/2024. Feito por: Yudi Tamashiro. Livro: O Vendedor de Sonhos: O Chamado.
2. Atrasado! Feito em: 12/10/2024. Expirou em: 19/10/2024. Feito por: Yudi Tamashiro. Livro: O Alquimista.
3. Fechado! Feito em: 10/09/2024. Devolvido em: 11/09/2024. Feito por: Yudi Tamashiro. Livro: Dom Casmurro
============================================================================================================================================================
```
