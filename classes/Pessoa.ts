export default abstract class Pessoa{
    protected _nome: string
    protected _endereco: string
    protected _telefone: string

    constructor(nome: string, endereco: string, telefone: string = ""){
        this._nome = nome
        this._endereco = endereco
        this._telefone = telefone
    }
}
