import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
    private _membro: Membro;
    private _livro: Livro
    private _dataEmprestimo: Date;
    private _dataDevolucao?: Date;
    private _dataExpiracao: Date;
    private _encerrado: boolean;
    private _atrasado: boolean;
    private _ISBNLivro: string;

    constructor(membro: Membro, livro: Livro, dataEmprestimo: Date, dataExpiracao: Date) {
        this._membro = membro;
        this._livro = livro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataExpiracao = dataExpiracao;
        this._encerrado = false;
        this._atrasado = false;
        this._ISBNLivro = livro.ISBN;
    }

    devolver(): void {
        this._dataDevolucao = new Date();
        this._encerrado = true;
        this._livro.devolver();
    }

    renovar(): void {
        this._dataExpiracao.setMonth(this._dataExpiracao.getMonth() + 1);
    }

    get membro(){
        return this._membro
    }
    get livro(){
        return this._livro
    }
    get dataEmprestimo(){
        return this._dataEmprestimo
    }
    get dataDevolucao(){
        return this._dataDevolucao
    }
    get dataExpiracao(){
        return this._dataExpiracao
    }
    get encerrado(){
        return this._encerrado
    }
    get atrasado(){
        return this._atrasado
    }
    get ISBNLivro(){
        return this._ISBNLivro
    }
}