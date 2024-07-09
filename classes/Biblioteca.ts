import { Membro } from './Membro';
import { Livro } from './Livro';
import { Emprestimo } from './Emprestimo';
import fs from "fs"

export class Biblioteca {
    private _membros: Membro[]
    private _livros: Livro[]
    private _emprestimos: Emprestimo[]

    constructor(){
        this._membros = this._carregar(Membro, "Membros.csv")
        this._livros = []
        this._emprestimos = []
    }
    private _carregar(classe: any, nomeDatabase: string): [] {
        const databaseFD = fs.openSync(`../database/${nomeDatabase}`, "r")

        const buffer= new Buffer("")
        fs.readSync(databaseFD, buffer)
        console.log(buffer)

        return []
    }

    adicionarMembro(nome: string, endereco: string, telefone: string): Membro {
        const matricula = `${this._membros.length + 1}`;
        const membro = new Membro(matricula, nome, endereco, telefone);
        this._membros.push(membro);
        return membro;
    }

    listarMembros(): Membro[] {
        return this._membros;
    }

    encontrarMembro(matriculaMembro: string): Membro | undefined{
        return this._membros.find(
            membro => membro.matricula == matriculaMembro)
    }
    encontrarLivro(ISBNLivro: string): Livro | undefined{
        return this._livros.find(
            livro => livro.ISBN == ISBNLivro)
    }
    encontrarEmprestimo(ISBNLivro: string): Emprestimo | undefined{
        return this._emprestimos.find(
            emprestimo => emprestimo.ISBNLivro == ISBNLivro)
    }

    adicionarLivro(titulo: string, autor: string, ISBN: string, anoPublicacao: number): Livro {
        const livro = new Livro(titulo, autor, ISBN, anoPublicacao);
        this._livros.push(livro);
        return livro;
    }

    listarLivros(): Livro[] {
        return this._livros;
    }

    listarEmprestimos(): Emprestimo[] {
        return this._emprestimos;
    }

    reservarLivro(ISBN: string, matriculaMembro: string): Emprestimo {
        const livro = this.encontrarLivro(ISBN)
        const membro = this.encontrarMembro(matriculaMembro)
        if (!livro || !membro) {
            throw new Error('Livro ou Membro não encontrado');
        }
        const emprestimo = livro.reservar(membro.matricula);
        this._emprestimos.push(emprestimo);
        return emprestimo;
    }

    devolverLivro(ISBN: string): void {
        const emprestimo = this.encontrarEmprestimo(ISBN)
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        const livro = this.encontrarLivro(ISBN)
        if (!livro) {
            throw new Error('Livro não encontrado');
        }
        emprestimo.devolver(livro);
    }

    renovarEmprestimo(ISBN: string): void {
        const emprestimo = this.encontrarEmprestimo(ISBN)

        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        emprestimo.renovar();
    }

    salvar(): void {

    }


    sair(): void {
        console.log('Até mais!');
    }
}
