import Pessoa from "./Pessoa";

export default class Membro extends Pessoa{
    private _matricula: string 

    constructor(nome: string, endereco: string, telefone: string = ""){
        super(nome, endereco, telefone);
        this._matricula = this.gerarMatricula()
    }

    private gerarMatricula(): string{
        return "" 
    }
}
