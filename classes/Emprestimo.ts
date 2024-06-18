export default class Emprestimo {
    private _dataEmprestimo: string
    private _dataDevolucao: string
    private _dataDevolvido: string

    private _ISBNLivro: string
    private _matriculaMembro: string

    constructor(dataDevolucao: string, ISBNLivro: string, matriculaMembro: string){
        this._dataEmprestimo = Date() 
        this._dataDevolucao = dataDevolucao
        this._dataDevolvido = ""

        this._ISBNLivro = ISBNLivro
        this._matriculaMembro = matriculaMembro
    }

    public devolver(){

    }
    public renovar(){

    }
}
