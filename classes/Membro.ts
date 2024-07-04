import { Pessoa } from "./Pessoa";
import { randomUUID } from "crypto";

export class Membro extends Pessoa {
    private _matricula: string;

    constructor(matricula: string, nome: string, endereco: string, telefone: string) {
        super(nome, endereco, telefone)
        this._matricula = matricula;
    }

    get matricula(): string {
        return this._matricula;
    }

}
