export default class Pessoa {
    protected readonly _nome: string;
    protected readonly _endereco: string;
    protected readonly _telefone: string;

    constructor (nome: string, endereco: string, telefone: string){
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }
    get nome(): string {
        return this._nome;
    }

    get endereco(): string {
        return this._endereco;
    }

    get telefone(): string {
        return this._telefone;
    }
}
