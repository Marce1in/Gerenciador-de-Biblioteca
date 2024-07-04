import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
    private _dataEmprestimo: Date;
    private _dataDevolucao?: Date;
    private _dataExpiracao: Date;
    private _encerrado: boolean;
    private _atrasado: boolean;
    private _ISBNLivro: string;
    private _matriculaMembro: string;

    constructor(matriculaMembro: string, ISBNLivro: string, dataEmprestimo: Date, dataExpiracao: Date) {
        this._dataEmprestimo = dataEmprestimo;
        this._dataExpiracao = dataExpiracao;
        this._encerrado = false;
        this._atrasado = false;
        this._ISBNLivro = ISBNLivro
        this._matriculaMembro = matriculaMembro
    }

    devolver(livro: Livro): void {
        this._dataDevolucao = new Date();
        this._encerrado = true;
        livro.devolver();
    }

    renovar(): void {
        this._dataExpiracao.setMonth(this._dataExpiracao.getMonth() + 1);
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
    get matriculaMembro(){
        return this._matriculaMembro
    }
}