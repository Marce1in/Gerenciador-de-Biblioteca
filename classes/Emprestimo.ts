import Livro from "./Livro"

export default class Emprestimo {
    private _dataEmprestimo: Date
    private _dataExpiracao: Date
    private _dataDevolucao: Date | null

    private _ISBNLivro: string
    private _matriculaMembro: string

    private _encerrado: boolean

    constructor(ISBNLivro: string, matriculaMembro: string){
        this._dataEmprestimo = new Date
        this._dataExpiracao = this.atrasarData(this._dataEmprestimo, 7)
        this._dataDevolucao = null

        this._ISBNLivro = ISBNLivro
        this._matriculaMembro = matriculaMembro

        this._encerrado = false
    }

    public devolver(livro: Livro){

    }
    public renovar(){

    }

    private atrasarData(data: Date, dias: number): Date{

        return new Date
    }
}
