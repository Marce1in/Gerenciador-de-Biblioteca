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
        this._livros = this._carregar(Livro, "Livros.csv")
        this._emprestimos = this._carregar(Emprestimo, "Emprestimos.csv")
    }
    private _carregar(classe: any, nomeDatabase: string): [] {
        console.log(classe)
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
        const livro = this._livros.find(l => l.ISBN === ISBN);
        const membro = this._membros.find(m => m.matricula === matriculaMembro);
        if (!livro || !membro) {
            throw new Error('Livro ou Membro não encontrado');
        }
        const emprestimo = livro.reservar(membro);
        this._emprestimos.push(emprestimo);
        return emprestimo;
    }
   


    devolverLivro(ISBN: string): void {
        const emprestimo = this._emprestimos.find(e => e.ISBNLivro === ISBN && !e.encerrado);
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        emprestimo.devolver();
    }

    renovarEmprestimo(ISBN: string): void {
        const emprestimo = this._emprestimos.find(e => e.ISBNLivro === ISBN && !e.encerrado);
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
