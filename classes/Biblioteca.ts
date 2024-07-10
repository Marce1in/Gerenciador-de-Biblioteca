import Membro from './Membro';
import Livro from './Livro';
import Emprestimo from './Emprestimo';
import ObjetoCsv from './ObjetoCsv';

export default class Biblioteca {
    private _membros: Membro[]
    private _livros: Livro[]
    private _emprestimos: Emprestimo[]

    constructor(carregarDados = true){
        this._membros = carregarDados ?
            ObjetoCsv.csvParaObjetos<Membro>(Membro, "../database", "Membro.csv") : []

        this._livros = carregarDados ?
            ObjetoCsv.csvParaObjetos<Livro>(Livro, "../database", "Livro.csv") : []

        this._emprestimos = carregarDados ?
            ObjetoCsv.csvParaObjetos<Emprestimo>( Emprestimo, "../database", "Emprestimo.csv") : []
    }

    public salvar(): void {
        ObjetoCsv.objetosParaCsv(this._livros, "../database", "Livro.csv")
        ObjetoCsv.objetosParaCsv(this._membros, "../database", "Membro.csv")
        ObjetoCsv.objetosParaCsv(this._emprestimos, "../database", "Emprestimo.csv")
    }


    public encontrarMembro(matriculaMembro: string): Membro | undefined{
        return this._membros.find(
            membro => membro.matricula == matriculaMembro)
    }
    public encontrarLivro(ISBNLivro: string): Livro | undefined{
        return this._livros.find(
            livro => livro.ISBN == ISBNLivro)
    }
    public encontrarEmprestimo(ISBNLivro: string): Emprestimo | undefined{
        return this._emprestimos.find(
            emprestimo => emprestimo.ISBNLivro == ISBNLivro)
    }


    public listarMembros(): Membro[] {
        return this._membros;
    }

    public listarLivros(): Livro[] {
        return this._livros;
    }

    public listarEmprestimos(): Emprestimo[] {
        return this._emprestimos;
    }


    public adicionarMembro(nome: string, endereco: string, telefone: string): Membro {
        const matricula = `${this._membros.length + 1}`;
        const membro = new Membro(matricula, nome, endereco, telefone);
        this._membros.push(membro);
        return membro;
    }

    public adicionarLivro(titulo: string, autor: string, ISBN: string, anoPublicacao: number): Livro {
        const livro = new Livro(titulo, autor, ISBN, anoPublicacao);
        this._livros.push(livro);
        return livro;
    }

    public reservarLivro(ISBN: string, matriculaMembro: string): Emprestimo {
        const livro = this.encontrarLivro(ISBN)
        const membro = this.encontrarMembro(matriculaMembro)
        if (!livro || !membro) {
            throw new Error('Livro ou Membro não encontrado');
        }
        const emprestimo = livro.reservar(membro.matricula);
        this._emprestimos.push(emprestimo);
        return emprestimo;
    }

    public devolverLivro(ISBN: string): void {
        const emprestimo = this.encontrarEmprestimo(ISBN)
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        const livro = this.encontrarLivro(ISBN)
        if (!livro) {
            throw new Error('Livro não encontrado');
        }
        emprestimo.devolver(livro);
    }

    public renovarEmprestimo(ISBN: string): void {
        const emprestimo = this.encontrarEmprestimo(ISBN)

        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        emprestimo.renovar();
    }

    public sair(): void {
        console.log('Até mais!');
    }
}
