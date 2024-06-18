export default class Livro {
    private _titulo: string
    private _autor: string
    private _ISBN: string
    private _anoPublicacao: string
    private _reservado: boolean

    constructor(titulo: string, autor: string, ISBN: string, anoPublicacao: string) {
        this._titulo = titulo
        this._autor = autor
        this._ISBN = ISBN
        this._anoPublicacao = anoPublicacao
        this._reservado = false
    }

    public reservar(){

    }
}


