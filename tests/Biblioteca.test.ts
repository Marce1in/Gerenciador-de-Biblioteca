import Biblioteca from "../classes/Biblioteca";
import Emprestimo from "../classes/Emprestimo";
import Livro from "../classes/Livro";
import Membro from "../classes/Membro";

let biblioteca: Biblioteca;

beforeAll(() => {
    biblioteca = new Biblioteca(false)

    //jest.spyOn(Date.prototype, 'getMonth').mockImplementation(() => 14)

    class MockDate extends Date {
        constructor() {
            super("2004-10-14T04:19:03.554Z");
        }

        getMonth() {
            return 10;
        }
    }
    jest.spyOn(global, 'Date').mockImplementation(() => new MockDate())
})



describe("Testando os métodos de adicionar e listar", () => {
    it("biblioteca deve adicionar um livro a array e retornar uma lista com 1 item", () => {
        biblioteca.adicionarLivro("a", "b", "c", 1)

        expect(biblioteca.listarLivros().length).toBe(1)
        expect(biblioteca["_livros"].length).toBe(1)
        expect(biblioteca.listarLivros()).toMatchObject(biblioteca["_livros"])
    })
    it("biblioteca deve adicionar retornar o livro", () => {
        const livro: Livro = biblioteca.adicionarLivro("d", "f", "g", 2)
        const livro2: Livro = new Livro("d", "f", "g", 2)

        expect(livro).toMatchObject(livro2)
    })
    it("biblioteca deve adicionar um membro a array e retornar uma lista com 1 item", () => {
        biblioteca.adicionarMembro("a", "b", "c")

        expect(biblioteca.listarMembros().length).toBe(1)
        expect(biblioteca["_membros"].length).toBe(1)
        expect(biblioteca.listarMembros()).toMatchObject(biblioteca["_membros"])
    })
    it("biblioteca deve adicionar retornar o membro", () => {
        const membro: Membro = biblioteca.adicionarMembro("d", "f", "g")
        const membro2: Membro = new Membro("2", "d", "f", "g")

        expect(membro).toMatchObject(membro2)
    })
    it("biblioteca deve adicionar criar um empréstimo e retornar uma lista com 1 item", () => {
        biblioteca.reservarLivro("c", "1")

        expect(biblioteca.listarEmprestimos().length).toBe(1)
        expect(biblioteca["_emprestimos"].length).toBe(1)
        expect(biblioteca.listarEmprestimos()).toMatchObject(biblioteca["_emprestimos"])
    })
    it("biblioteca deve adicionar retornar um empréstimo", () => {
        const emprestimo: Emprestimo = biblioteca.reservarLivro("g", "2")
        const emprestimo2: Emprestimo = new Emprestimo("2", "g", new Date, new Date)

        expect(emprestimo).toMatchObject(emprestimo2)
    })
    it("biblioteca deve jogar um erro se o livro não for encontrado para reserva", () => {
        expect(() => biblioteca.reservarLivro("z", "2")).toThrow()
    })
    it("biblioteca deve jogar um erro se o membro não for encontrado para reserva", () => {
        expect(() => biblioteca.reservarLivro("g", "9")).toThrow()
    })
})

describe("testando os métodos de encontrar", () => {
    it("biblioteca deve encontrar um livro", () => {
        expect(biblioteca.encontrarLivro("c")).toBeTruthy()
    })
    it("biblioteca não deve encontrar um livro", () => {
        expect(biblioteca.encontrarLivro("z")).toBeFalsy()
    })
    it("biblioteca deve encontrar um membro", () => {
        expect(biblioteca.encontrarMembro("1")).toBeTruthy()
    })
    it("biblioteca não deve encontrar um membro", () => {
        expect(biblioteca.encontrarMembro("9")).toBeFalsy()
    })
    it("biblioteca deve encontrar um emprestimo", () => {
        expect(biblioteca.encontrarEmprestimo("c")).toBeTruthy()
    })
    it("biblioteca não deve encontrar um livro", () => {
        expect(biblioteca.encontrarEmprestimo("z")).toBeFalsy()
    })
})

describe("testando os métodos de devolver e renovar", () => {
    it("biblioteca de retornar um erro se não encontrar o emprestimo ou livro", () => {
        expect(() => biblioteca.devolverLivro("z")).toThrow()
    })
    it("biblioteca de devolver o livro", () => {
        biblioteca.devolverLivro("g")
        expect(biblioteca.encontrarLivro("g")?.reservado).toBe(false)
    })
    it("biblioteca de retornar um erro se não encontrar o emprestimo", () => {
        expect(() => biblioteca.renovarEmprestimo("z")).toThrow()
    })
    it("biblioteca deve renovar livro", () => {
        biblioteca.reservarLivro("g", "1")
        biblioteca.renovarEmprestimo("g")

        const emprestimo = biblioteca.encontrarEmprestimo("g")

        expect(emprestimo?.dataExpiracao).toBeTruthy()
    })
})
