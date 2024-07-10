import Pessoa from "./Pessoa";

export default class Membro extends Pessoa {
    private readonly _matricula: string;

    constructor(matricula: string, nome: string, endereco: string, telefone: string) {
        super(nome, endereco, telefone)
        this._matricula = matricula;
    }

    get matricula(): string {
        return this._matricula;
    }

}
