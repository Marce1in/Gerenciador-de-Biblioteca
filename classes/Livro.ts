import { Emprestimo } from "./Emprestimo";
import { Membro } from "./Membro";
export class Livro {
    private _titulo: string;
    private _autor: string;
    private _ISBN: string;
    private _anoPublicacao: number;
    private _reservado: boolean;

    constructor(titulo: string, autor: string, ISBN: string, anoPublicacao: number) {
        this._ISBN = ISBN;
        this._titulo = titulo;
        this._autor = autor;
        this._anoPublicacao = anoPublicacao;
        this._reservado = false;
    }

    reservar(membro: Membro): Emprestimo {
        if (this._reservado) {
            throw new Error('Livro já está reservado');
        }
        this._reservado = true;
        const dataEmprestimo = new Date();
        const dataExpiracao = new Date();
        dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
        return new Emprestimo(membro, this, dataEmprestimo, dataExpiracao);
    }

    devolver(): void {
        this._reservado = false;
    }

    get titulo(){
        return this._titulo
    }
    get autor(){
        return this._autor
    }
    get ISBN(){
        return this._ISBN
    }
    get anoPublicacao(){
        return this._anoPublicacao
    }
    get reservado(){
        return this._reservado
    }
}