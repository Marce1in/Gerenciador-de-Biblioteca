export class Pessoa {
    private _nome: string;
    private _endereco: string;
    private _telefone: string;

    constructor (nome: string, endereco: string, telefone: string){
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }
    get nome(): string {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(endereco: string) {
        this._endereco = endereco;
    }

    get telefone(): string {
        return this._telefone;
    }

    set telefone(telefone: string) {
        this._telefone = telefone;
    }
}